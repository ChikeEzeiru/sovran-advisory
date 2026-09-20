import { NextResponse } from "next/server";
import { confirmNewsletterSubscription } from "@/lib/email";
import { verifyNewsletterToken } from "@/lib/newsletter-token";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const payload = verifyNewsletterToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/newsletter/confirmed?status=invalid", url));
  }

  try {
    await confirmNewsletterSubscription(payload.email);
    return NextResponse.redirect(new URL("/newsletter/confirmed?status=success", url));
  } catch (error) {
    console.error("Newsletter subscription confirmation failed", error);
    return NextResponse.redirect(new URL("/newsletter/confirmed?status=error", url));
  }
}
