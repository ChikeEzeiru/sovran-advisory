import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import { sendRegistrationConfirmation } from '@/lib/email'

const EVENT_QUERY = `*[_type == "event" && _id == $eventId][0] {
  title,
  "slug": slug.current,
  startDate,
  location,
  price,
  capacity
}`

const PENDING_HOLD_MINUTES = 30

export async function POST(request: Request) {
  const body = await request.json()
  const { eventId, name, email } = body as { eventId?: string; name?: string; email?: string }

  if (!eventId || !name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const event = await client.fetch(EVENT_QUERY, { eventId })

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  if (event.capacity) {
    const heldSince = new Date(Date.now() - PENDING_HOLD_MINUTES * 60 * 1000)
    const activeCount = await prisma.registration.count({
      where: {
        eventId,
        OR: [
          { status: 'confirmed' },
          { status: 'pending', createdAt: { gte: heldSince } },
        ],
      },
    })

    if (activeCount >= event.capacity) {
      return NextResponse.json({ error: 'This event is full' }, { status: 409 })
    }
  }

  const price: number = event.price ?? 0

  if (price <= 0) {
    const registration = await prisma.registration.create({
      data: { eventId, name, email, status: 'confirmed' },
    })

    await sendRegistrationConfirmation({
      to: email,
      name,
      eventTitle: event.title,
      eventStartDate: new Date(event.startDate).toLocaleString(),
      eventLocation: event.location,
    })

    return NextResponse.json({ registrationId: registration.id })
  }

  const registration = await prisma.registration.create({
    data: { eventId, name, email, status: 'pending' },
  })

  const origin = request.headers.get('origin') ?? new URL(request.url).origin
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: price,
          product_data: { name: event.title },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/events/${event.slug}/success`,
    cancel_url: `${origin}/events/${event.slug}/cancelled`,
    metadata: { registrationId: registration.id },
  })

  await prisma.payment.create({
    data: {
      registrationId: registration.id,
      stripeSessionId: session.id,
      amount: price,
      currency: 'usd',
      status: 'pending',
    },
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
