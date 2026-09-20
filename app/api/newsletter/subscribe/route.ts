import { NextResponse } from "next/server";
import { sendNewsletterConfirmation } from "@/lib/email";
import { isValidEmail, normalizeEmail } from "@/lib/email-address";
import { createNewsletterToken } from "@/lib/newsletter-token";

type NewsletterRequest = {
  email?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let body: NewsletterRequest;

  try {
    body = (await request.json()) as NewsletterRequest;
  } catch {
    return NextResponse.json({error: "Invalid request."}, {status: 400});
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ok: true});
  }

  const email = normalizeEmail(typeof body.email === "string" ? body.email : "");
  if (!isValidEmail(email)) {
    return NextResponse.json(
      {error: "Enter a valid email address."},
      {status: 400},
    );
  }

  try {
    const token = createNewsletterToken(email);
    await sendNewsletterConfirmation({email, token});
    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("Newsletter confirmation failed", error);
    return NextResponse.json(
      {error: "We could not start your subscription. Please try again shortly."},
      {status: 503},
    );
  }
}
