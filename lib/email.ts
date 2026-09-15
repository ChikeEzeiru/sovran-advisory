import { Resend } from 'resend'
import RegistrationConfirmationEmail from '@/emails/RegistrationConfirmationEmail'

export async function sendRegistrationConfirmation(params: {
  to: string
  name: string
  eventTitle: string
  eventStartDate: string
  eventLocation?: string
  amountPaid?: number
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: params.to,
    subject: `You're registered: ${params.eventTitle}`,
    react: RegistrationConfirmationEmail({
      name: params.name,
      eventTitle: params.eventTitle,
      eventStartDate: params.eventStartDate,
      eventLocation: params.eventLocation,
      amountPaid: params.amountPaid,
    }),
  })

  if (error) {
    throw new Error(`Resend failed to send confirmation email: ${error.message}`)
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
  const recipient = process.env.CONTACT_ENQUIRY_TO
  const apiKey = process.env.RESEND_API_KEY

  if (!recipient || !apiKey) {
    throw new Error('Contact enquiry delivery is not configured')
  }

  const resend = new Resend(apiKey)
  const fromAddress = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
  const lines = [
    `Name: ${params.name}`,
    `Organisation: ${params.organisation}`,
    `Work email: ${params.email}`,
    `Market(s): ${params.markets}`,
    `Timeframe: ${params.timeframe || 'Not specified'}`,
    `Preferred contact method: ${params.contactMethod}`,
    `Phone: ${params.phone || 'Not provided'}`,
    '',
    'Enquiry:',
    params.message,
  ]

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: recipient,
    replyTo: params.email,
    subject: `New enquiry from ${params.organisation}`,
    text: lines.join('\n'),
  })

  if (error) {
    throw new Error(`Resend failed to send contact enquiry: ${error.message}`)
  }
}
