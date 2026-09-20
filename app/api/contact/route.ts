import { NextResponse } from "next/server";
import { sendContactEnquiry } from "@/lib/email";
import { isValidEmail, normalizeEmail } from "@/lib/email-address";
import { parseApprovedMarkets } from "@/lib/markets";

type ContactRequest = {
  name?: unknown;
  organisation?: unknown;
  email?: unknown;
  markets?: unknown;
  message?: unknown;
  timeframe?: unknown;
  contactMethod?: unknown;
  phone?: unknown;
  website?: unknown;
};

function textValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (textValue(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const approvedMarkets = parseApprovedMarkets(textValue(body.markets, 500));
  const enquiry = {
    name: textValue(body.name, 100),
    organisation: textValue(body.organisation, 160),
    email: normalizeEmail(textValue(body.email, 254)),
    markets: approvedMarkets?.join(", ") ?? "",
    message: textValue(body.message, 3000),
    timeframe: textValue(body.timeframe, 80),
    contactMethod: textValue(body.contactMethod, 20) || "email",
    phone: textValue(body.phone, 40),
  };

  if (
    !enquiry.name ||
    !enquiry.organisation ||
    !isValidEmail(enquiry.email) ||
    !enquiry.markets ||
    enquiry.message.length < 20 ||
    (enquiry.contactMethod === "phone" && !enquiry.phone)
  ) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  try {
    await sendContactEnquiry(enquiry);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact enquiry failed", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again shortly." },
      { status: 503 },
    );
  }
}
