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
