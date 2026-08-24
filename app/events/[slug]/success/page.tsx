import { AnimatedLink } from '@/components/ui/AnimatedLink'

export default function RegistrationSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">Payment successful</h1>
      <p className="mb-6 text-text-tertiary">
        Your registration is confirmed. A confirmation email is on its way.
      </p>
      <AnimatedLink href="/events">Back to events</AnimatedLink>
    </main>
  )
}
