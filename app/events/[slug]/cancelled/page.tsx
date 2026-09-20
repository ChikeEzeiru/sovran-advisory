import type {Metadata} from 'next'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

export const metadata: Metadata = {
  title: 'Registration cancelled',
  robots: {index: false, follow: false, nocache: true},
}

export default async function RegistrationCancelledPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="mb-4 text-3xl font-semibold max-md:text-2xl max-md:leading-8">Payment cancelled</h1>
      <p className="mb-6 text-text-tertiary">
        Your registration was not completed. You can try again whenever you&apos;re ready.
      </p>
      <AnimatedLink href={`/events/${slug}`}>Back to event</AnimatedLink>
    </main>
  )
}
