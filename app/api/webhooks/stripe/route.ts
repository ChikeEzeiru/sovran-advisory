import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { client } from '@/sanity/lib/client'
import { sendRegistrationConfirmation } from '@/lib/email'

const EVENT_QUERY = `*[_type == "event" && _id == $eventId][0] {
  title,
  startDate,
  location
}`

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const registrationId = session.metadata?.registrationId

    if (registrationId) {
      const payment = await prisma.payment.update({
        where: { stripeSessionId: session.id },
        data: {
          status: 'succeeded',
          stripePaymentIntentId:
            typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
        },
      })

      const registration = await prisma.registration.update({
        where: { id: registrationId },
        data: { status: 'confirmed', amountPaid: payment.amount },
      })

      const sanityEvent = await client.fetch(EVENT_QUERY, { eventId: registration.eventId })

      if (sanityEvent) {
        await sendRegistrationConfirmation({
          to: registration.email,
          name: registration.name,
          eventTitle: sanityEvent.title,
          eventStartDate: new Date(sanityEvent.startDate).toLocaleString(),
          eventLocation: sanityEvent.location,
          amountPaid: payment.amount,
        })
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const registrationId = session.metadata?.registrationId

    if (registrationId) {
      await prisma.payment.update({
        where: { stripeSessionId: session.id },
        data: { status: 'failed' },
      })
      await prisma.registration.update({
        where: { id: registrationId },
        data: { status: 'cancelled' },
      })
    }
  }

  return NextResponse.json({ received: true })
}
