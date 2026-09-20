import type {Metadata} from 'next'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

export const metadata: Metadata = {
  title: 'Registration confirmed',
  robots: {index: false, follow: false, nocache: true},
}

export default function RegistrationSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="mb-4 text-3xl font-semibold max-md:text-2xl max-md:leading-8">Payment successful</h1>
      <p className="mb-6 text-text-tertiary">
        Your registration is confirmed. A confirmation email is on its way.
      </p>
      <AnimatedLink href="/events">Back to events</AnimatedLink>
    </main>
  )
}
