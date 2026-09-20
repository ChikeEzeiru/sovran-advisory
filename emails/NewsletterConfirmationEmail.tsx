import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { absoluteUrl } from "@/lib/seo";

type NewsletterConfirmationEmailProps = {
  email: string;
  confirmationUrl: string;
  heroImageSrc?: string;
};

export default function NewsletterConfirmationEmail({
  email,
  confirmationUrl,
  heroImageSrc = absoluteUrl("/images/emails/newsletter-email-hero-composite.jpg"),
}: NewsletterConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email to receive Sovran&apos;s perspectives and reports.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Img
            src={heroImageSrc}
            width="600"
            height="350"
            alt="Sovran Advisory — Confirm your subscription"
            style={heroImageStyle}
          />

          <Section style={contentStyle}>
            <Text style={paragraphStyle}>
              Please confirm that {email} should receive perspectives and occasional updates from Sovran Advisory.
            </Text>
            <Text style={{...paragraphStyle, marginBottom: "48px"}}>
              We will only send you confirmed reports and perspectives every fortnight. No spam.
            </Text>

            <Button href={confirmationUrl} style={buttonStyle}>
              Confirm subscription&nbsp;&nbsp;→
            </Button>
            <Text style={expiryStyle}>The confirmation link expires after 24 hours.</Text>

            <Section style={noticeStyle}>
              <Text style={noticeIconStyle}>ⓘ</Text>
              <Text style={noticeTextStyle}>
                If you did not submit this address, you can ignore this email. You will not be added to the mailing list.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  margin: "0",
  padding: "0",
  backgroundColor: "#f3f5f4",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const containerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  paddingBottom: "24px",
  backgroundColor: "#f3f5f4",
};

const heroImageStyle = {
  display: "block",
  width: "100%",
  height: "auto",
  objectFit: "cover" as const,
};

const contentStyle = {padding: "32px 24px 20px"};
const paragraphStyle = {
  margin: "0 0 18px",
  color: "#4b585b",
  fontSize: "18px",
  lineHeight: "28px",
};

const buttonStyle = {
  padding: "8px 12px",
  border: "1px solid #2f5542",
  borderRadius: "2px",
  backgroundColor: "#38634d",
  boxShadow: "0 1px 2px rgba(0,0,0,.05)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  textDecoration: "none",
};

const expiryStyle = {
  margin: "8px 0 32px",
  color: "#4b585b",
  fontSize: "16px",
  fontStyle: "italic",
  lineHeight: "24px",
};

const noticeStyle = {
  padding: "12px",
  border: "1px solid #e3e7e8",
  borderRadius: "2px",
  backgroundColor: "#f9fbfb",
};

const noticeIconStyle = {
  width: "30px",
  height: "30px",
  margin: "0 0 12px",
  border: "1px solid #d4d4d4",
  borderRadius: "2px",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 2px rgba(0,0,0,.05)",
  color: "#4b585b",
  fontSize: "17px",
  lineHeight: "30px",
  textAlign: "center" as const,
};

const noticeTextStyle = {
  margin: "0",
  color: "#4b585b",
  fontSize: "18px",
  lineHeight: "28px",
};
