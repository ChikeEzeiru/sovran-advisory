import type {Metadata} from "next";
import {Navbar} from "@/components/sections/Navbar";
import {SiteFooter} from "@/components/sections/SiteFooter";
import {Button} from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Newsletter subscription",
  robots: {index: false, follow: false, nocache: true},
};

const content = {
  success: {
    label: "Subscription confirmed",
    title: "You’re on the list.",
    body: "Your email has been confirmed. You will now receive Sovran’s perspectives and occasional updates.",
  },
  invalid: {
    label: "Link unavailable",
    title: "This confirmation link has expired.",
    body: "Submit your email again through the newsletter form to receive a new confirmation link.",
  },
  error: {
    label: "Confirmation interrupted",
    title: "We couldn’t confirm your subscription.",
    body: "Please try the link again shortly. If the problem continues, submit your email again through the newsletter form.",
  },
} as const;

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{status?: string}>;
}) {
  const {status} = await searchParams;
  const state = status === "success" || status === "invalid" ? status : "error";
  const message = content[state];

  return (
    <>
      <Navbar theme="light" />
      <main className="flex min-h-[70svh] items-center bg-bg-secondary-alt-2 px-12 py-40 max-md:px-4 max-md:py-28">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-start">
          <p className="text-sm max-md:text-xs max-md:leading-4 font-semibold text-text-brand-tertiary">{message.label}</p>
          <h1 className="mt-4 text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-15 tracking-tight text-text-primary ">
            {message.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
            {message.body}
          </p>
          <Button href="/perspectives" variant="primary-alt" size="lg" className="mt-8">
            Explore perspectives
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
