import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type RegistrationConfirmationEmailProps = {
  name: string
  eventTitle: string
  eventStartDate: string
  eventLocation?: string
  amountPaid?: number
}

export default function RegistrationConfirmationEmail({
  name,
  eventTitle,
  eventStartDate,
  eventLocation,
  amountPaid,
}: RegistrationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your registration for {eventTitle} is confirmed</Preview>
      <Body style={{fontFamily: 'sans-serif', backgroundColor: '#f6f6f6', padding: '24px'}}>
        <Container style={{backgroundColor: '#ffffff', padding: '32px', borderRadius: '8px'}}>
          <Heading as="h2">You're registered, {name}!</Heading>
          <Section>
            <Text>
              Your registration for <strong>{eventTitle}</strong> is confirmed.
            </Text>
            <Text>Date: {eventStartDate}</Text>
            {eventLocation && <Text>Location: {eventLocation}</Text>}
            {typeof amountPaid === 'number' && amountPaid > 0 && (
              <Text>Amount paid: ${(amountPaid / 100).toFixed(2)}</Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
