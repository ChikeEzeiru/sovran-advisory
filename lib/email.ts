import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import ContactAcknowledgementEmail from "@/emails/ContactAcknowledgementEmail";
import InternalContactEnquiryEmail from "@/emails/InternalContactEnquiryEmail";
import InternalNewsletterSubscriptionEmail from "@/emails/InternalNewsletterSubscriptionEmail";
import NewsletterConfirmationEmail from "@/emails/NewsletterConfirmationEmail";
import RegistrationConfirmationEmail from "@/emails/RegistrationConfirmationEmail";
import { absoluteUrl } from "@/lib/seo";

function getEmailClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Email delivery is not configured");
  return new Resend(apiKey);
}

function getFromAddress() {
  return process.env.EMAIL_FROM ?? "Sovran Advisory <onboarding@resend.dev>";
}

function getAuditBcc() {
  return process.env.EMAIL_AUDIT_BCC?.trim() || undefined;
}

function getInternalRecipient() {
  return (
    process.env.CONTACT_ENQUIRY_TO?.trim() ||
    process.env.NEWSLETTER_NOTIFICATION_TO?.trim() ||
    getAuditBcc()
  );
}

function formatEmailTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  }).format(date);
}

export async function sendRegistrationConfirmation(params: {
  to: string
  name: string
  eventTitle: string
  eventStartDate: string
  eventLocation?: string
  amountPaid?: number
}) {
  const resend = getEmailClient();

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: params.to,
    bcc: getAuditBcc(),
    subject: `You're registered: ${params.eventTitle}`,
    react: RegistrationConfirmationEmail({
      name: params.name,
      eventTitle: params.eventTitle,
      eventStartDate: params.eventStartDate,
      eventLocation: params.eventLocation,
      amountPaid: params.amountPaid,
    }),
  });

  if (error) {
    throw new Error(`Resend failed to send confirmation email: ${error.message}`);
  }
}

export async function sendContactEnquiry(params: {
  name: string
  organisation: string
  email: string
  markets: string
  message: string
  timeframe?: string
  contactMethod: string
  phone?: string
}) {
  const recipient = getInternalRecipient();

  if (!recipient) {
    throw new Error("Contact enquiry delivery is not configured");
  }

  const resend = getEmailClient();
  const fromAddress = getFromAddress();
  const submittedAt = formatEmailTimestamp(new Date());
  const reference = `SVR-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const lines = [
    `Name: ${params.name}`,
    `Organisation: ${params.organisation}`,
    `Work email: ${params.email}`,
    `Market(s): ${params.markets}`,
    `Timeframe: ${params.timeframe || 'Not specified'}`,
    `Preferred contact method: ${params.contactMethod}`,
    `Phone: ${params.phone || 'Not provided'}`,
    `Submitted: ${submittedAt}`,
    `Reference: ${reference}`,
    '',
    'Enquiry:',
    params.message,
  ]

  const firstName = params.name.trim().split(/\s+/)[0] || params.name;
  const { error } = await resend.batch.send(
    [
      {
        from: fromAddress,
        to: recipient,
        replyTo: params.email,
        subject: `New enquiry — ${params.organisation} — ${params.markets.split(",")[0]}`,
        react: InternalContactEnquiryEmail({
          name: params.name,
          firstName,
          organisation: params.organisation,
          email: params.email,
          contactMethod: params.contactMethod,
          phone: params.phone,
          markets: params.markets,
          timeframe: params.timeframe,
          message: params.message,
          submittedAt,
          reference,
        }),
        text: lines.join("\n"),
      },
      {
        from: fromAddress,
        to: params.email,
        bcc: getAuditBcc(),
        replyTo: recipient,
        subject: "We received your enquiry | Sovran Advisory",
        react: ContactAcknowledgementEmail({
          firstName,
          organisation: params.organisation,
          markets: params.markets,
          timeframe: params.timeframe,
          message: params.message,
          reference,
        }),
      },
    ],
    {idempotencyKey: `contact-${reference}`},
  );

  if (error) {
    throw new Error(`Resend failed to send contact enquiry: ${error.message}`);
  }
}

export async function sendNewsletterConfirmation(params: {
  email: string;
  token: string;
}) {
  const resend = getEmailClient();
  const confirmationUrl = absoluteUrl(
    `/api/newsletter/confirm?token=${encodeURIComponent(params.token)}`,
  );
  const {error} = await resend.emails.send({
    from: getFromAddress(),
    to: params.email,
    bcc: getAuditBcc(),
    subject: "Confirm your Sovran subscription",
    react: NewsletterConfirmationEmail({
      email: params.email,
      confirmationUrl,
    }),
  });

  if (error) {
    throw new Error(`Resend failed to send newsletter confirmation: ${error.message}`);
  }
}

export async function confirmNewsletterSubscription(email: string) {
  const segmentId = process.env.NEWSLETTER_SEGMENT_ID;
  const recipient = process.env.NEWSLETTER_NOTIFICATION_TO ?? process.env.CONTACT_ENQUIRY_TO;
  if (!segmentId || !recipient) {
    throw new Error("Newsletter subscription delivery is not configured");
  }

  const resend = getEmailClient();
  const existing = await resend.contacts.get({email});
  let isNewSubscription = Boolean(existing.error);

  if (existing.error) {
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{id: segmentId}],
      properties: {source: "Website footer"},
    });
    if (created.error) throw new Error(created.error.message);
  } else {
    const segments = await resend.contacts.segments.list({email});
    if (segments.error) throw new Error(segments.error.message);
    isNewSubscription = !segments.data?.data.some((segment) => segment.id === segmentId);

    const updated = await resend.contacts.update({email, unsubscribed: false});
    if (updated.error) throw new Error(updated.error.message);

    if (isNewSubscription) {
      const added = await resend.contacts.segments.add({email, segmentId});
      if (added.error) throw new Error(added.error.message);
    }
  }

  if (isNewSubscription) {
    const subscribedAt = formatEmailTimestamp(new Date());
    const consentVersion = "2026-09";
    const {error} = await resend.emails.send({
      from: getFromAddress(),
      to: recipient,
      subject: `New confirmed newsletter subscriber — ${email}`,
      react: InternalNewsletterSubscriptionEmail({
        email,
        subscribedAt,
        consentVersion,
      }),
      text: [
        "Newsletter subscription confirmed",
        "",
        `Email: ${email}`,
        `Subscribed: ${subscribedAt}`,
        "Source: Website footer",
        "Status: Confirmed",
        `Consent version: ${consentVersion}`,
        "",
        "No action is required.",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  }

  return {isNewSubscription};
}
