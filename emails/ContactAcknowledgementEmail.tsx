import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { absoluteUrl } from "@/lib/seo";

type ContactAcknowledgementEmailProps = {
  firstName: string;
  organisation: string;
  markets: string;
  timeframe?: string;
  message: string;
  reference: string;
};

const colours = {
  background: "#f3f5f4",
  surface: "#f9fbfb",
  border: "#e3e7e8",
  primary: "#161b1d",
  tertiary: "#4b585b",
};

export default function ContactAcknowledgementEmail({
  firstName,
  organisation,
  markets,
  timeframe,
  message,
  reference,
}: ContactAcknowledgementEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Our team will review your enquiry and respond within two business days.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={heroStyle}>
            <Img
              src={absoluteUrl("/images/emails/sovran-logo-light.png")}
              width="121"
              height="40"
              alt="Sovran Advisory"
              style={contactLogoStyle}
            />
            <Heading as="h1" style={headingStyle}>
              Your enquiry has
              <br />
              been received
            </Heading>
          </Section>

          <Section style={contentStyle}>
            <Text style={paragraphStyle}>Hello {firstName},</Text>
            <Text style={paragraphStyle}>
              Thank you for contacting Sovran Advisory. We have received your enquiry concerning {markets} and sent it to the appropriate team for review.
            </Text>
            <Text style={{...paragraphStyle, marginBottom: "48px"}}>
              You can expect a response within two business days.
            </Text>

            <Section style={summaryStyle}>
              <Heading as="h2" style={summaryHeadingStyle}>Your enquiry</Heading>
              <Detail label="Organisation" value={organisation} />
              <Detail label="Markets" value={markets} />
              <Detail label="Timeframe" value={timeframe || "Not specified"} />
              <Detail label="Message" value={message} />
              <Detail label="Reference" value={reference} isLast />
            </Section>

            <Section style={noteStyle}>
              <Text style={noteIconStyle}>ⓘ</Text>
              <Text style={noteTextStyle}>
                If you need to add information in the meantime, reply directly to this email and include the reference above.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Detail({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <Section style={{marginBottom: isLast ? "0" : "12px"}}>
      <Text style={detailLabelStyle}>{label}</Text>
      <Text style={detailValueStyle}>{value}</Text>
    </Section>
  );
}

const bodyStyle = {
  margin: "0",
  padding: "0",
  backgroundColor: colours.background,
  fontFamily: "Arial, Helvetica, sans-serif",
};

const containerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  paddingBottom: "24px",
  backgroundColor: colours.background,
};

const heroStyle = {
  height: "350px",
  backgroundColor: "#333b3c",
  backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)), url(${absoluteUrl("/images/emails/contact-email-hero.jpg")})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const contactLogoStyle = {margin: "8px 0 0 8px"};

const headingStyle = {
  margin: "158px 16px 24px",
  color: "#ffffff",
  fontSize: "36px",
  fontWeight: "500",
  lineHeight: "44px",
  letterSpacing: "-1.44px",
};

const contentStyle = {padding: "32px 24px 20px"};

const paragraphStyle = {
  margin: "0 0 18px",
  color: colours.tertiary,
  fontSize: "18px",
  lineHeight: "28px",
};

const summaryStyle = {
  padding: "12px",
  border: `1px solid ${colours.border}`,
  borderRadius: "2px",
  backgroundColor: colours.surface,
};

const summaryHeadingStyle = {
  margin: "0 0 24px",
  color: colours.primary,
  fontSize: "24px",
  fontWeight: "500",
  lineHeight: "32px",
  letterSpacing: "-0.96px",
};

const detailLabelStyle = {
  margin: "0 0 6px",
  color: colours.primary,
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "24px",
};

const detailValueStyle = {
  margin: "0",
  color: colours.tertiary,
  fontSize: "18px",
  lineHeight: "28px",
  whiteSpace: "pre-wrap" as const,
};

const noteStyle = {marginTop: "32px"};
const noteIconStyle = {
  display: "inline-block",
  width: "20px",
  margin: "0 8px 0 0",
  color: colours.tertiary,
  fontSize: "18px",
  lineHeight: "24px",
  verticalAlign: "top",
};
const noteTextStyle = {
  display: "inline-block",
  width: "calc(100% - 32px)",
  margin: "0",
  color: colours.tertiary,
  fontSize: "16px",
  fontStyle: "italic",
  lineHeight: "24px",
  verticalAlign: "top",
};
