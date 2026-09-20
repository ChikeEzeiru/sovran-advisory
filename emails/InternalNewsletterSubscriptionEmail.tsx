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

type InternalNewsletterSubscriptionEmailProps = {
  email: string;
  subscribedAt: string;
  consentVersion: string;
};

export default function InternalNewsletterSubscriptionEmail({
  email,
  subscribedAt,
  consentVersion,
}: InternalNewsletterSubscriptionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>A new subscriber has confirmed their email address.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img
              src={absoluteUrl("/images/emails/sovran-logo-dark.png")}
              width="121"
              height="40"
              alt="Sovran Advisory"
              style={logoStyle}
            />
          </Section>

          <Section style={heroOuterStyle}>
            <Section style={heroStyle}>
              <Heading as="h1" style={headingStyle}>
                Newsletter
                <br />
                subscription confirmed
              </Heading>
            </Section>
          </Section>

          <Section style={contentStyle}>
            <Text style={{...paragraphStyle, marginBottom: "48px"}}>
              A new subscriber has confirmed their email address.
            </Text>

            <Section style={cardStyle}>
              <Heading as="h2" style={cardHeadingStyle}>Subscriber details</Heading>
              <Detail label="Email" value={email} />
              <Detail label="Subscribed" value={subscribedAt} />
              <Detail label="Source" value="Website footer" />
              <Detail label="Status" value="Confirmed" />
              <Detail label="Consent Version" value={consentVersion} isLast />
            </Section>

            <Text style={noteStyle}>No action is required</Text>
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
const headerStyle = {height: "56px"};
const logoStyle = {margin: "8px 8px 8px auto"};
const heroOuterStyle = {padding: "16px", paddingTop: "0"};
const heroStyle = {
  height: "262px",
  borderRadius: "2px",
  backgroundColor: "#44504e",
  backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(${absoluteUrl("/images/emails/internal-newsletter-email-hero.jpg")})`,
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
const headingStyle = {
  margin: "0",
  padding: "144px 16px 24px",
  color: "#ffffff",
  fontSize: "36px",
  fontWeight: "500",
  lineHeight: "44px",
  letterSpacing: "-1.44px",
};
const contentStyle = {padding: "32px 24px 20px"};
const paragraphStyle = {
  margin: "0",
  color: "#4b585b",
  fontSize: "18px",
  lineHeight: "28px",
};
const cardStyle = {
  padding: "12px",
  border: "1px solid #e3e7e8",
  borderRadius: "2px",
  backgroundColor: "#f9fbfb",
};
const cardHeadingStyle = {
  margin: "0 0 24px",
  color: "#161b1d",
  fontSize: "24px",
  fontWeight: "500",
  lineHeight: "32px",
  letterSpacing: "-0.96px",
};
const detailLabelStyle = {
  margin: "0 0 6px",
  color: "#161b1d",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "24px",
};
const detailValueStyle = {
  margin: "0",
  color: "#4b585b",
  fontSize: "18px",
  lineHeight: "28px",
  whiteSpace: "pre-wrap" as const,
};
const noteStyle = {
  margin: "32px 0 0",
  color: "#4b585b",
  fontSize: "16px",
  fontStyle: "italic",
  lineHeight: "24px",
};
