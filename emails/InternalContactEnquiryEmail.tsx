import {
  Body,
  Button,
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

type InternalContactEnquiryEmailProps = {
  name: string;
  firstName: string;
  organisation: string;
  email: string;
  contactMethod: string;
  phone?: string;
  markets: string;
  timeframe?: string;
  message: string;
  submittedAt: string;
  reference: string;
  logoSrc?: string;
  heroImageSrc?: string;
};

export default function InternalContactEnquiryEmail({
  name,
  firstName,
  organisation,
  email,
  contactMethod,
  phone,
  markets,
  timeframe,
  message,
  submittedAt,
  reference,
  logoSrc = absoluteUrl("/images/emails/sovran-logo-dark.png"),
  heroImageSrc = absoluteUrl("/images/emails/internal-contact-email-hero.jpg"),
}: InternalContactEnquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{name} from {organisation} submitted a new website enquiry.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img
              src={logoSrc}
              width="121"
              height="40"
              alt="Sovran Advisory"
              style={logoStyle}
            />
          </Section>

          <Section style={heroOuterStyle}>
            <Img
              src={heroImageSrc}
              width="568"
              height="174"
              alt="Lagos cityscape"
              style={internalHeroImageStyle}
            />
            <Section style={heroTitleStyle}>
              <Heading as="h1" style={headingStyle}>New website enquiry</Heading>
            </Section>
          </Section>

          <Section style={contentStyle}>
            <Text style={{...paragraphStyle, marginBottom: "48px"}}>
              A new enquiry has been submitted through the Sovran website.
            </Text>

            <DetailCard title="Contact">
              <Detail label="Name" value={name} />
              <Detail label="Organisation" value={organisation} />
              <Detail label="Work email" value={email} />
              <Detail label="Preferred contact method" value={contactMethod} />
              <Detail label="Phone" value={phone || "Not provided"} isLast />
            </DetailCard>

            <DetailCard title="Engagement" spacingTop="32px">
              <Detail label="Markets" value={markets} />
              <Detail label="Timeframe" value={timeframe || "Not specified"} />
              <Detail label="Enquiry" value={message} />
              <Detail label="Submitted" value={submittedAt} />
              <Detail label="Reference" value={reference} isLast />
            </DetailCard>

            <Section style={actionStyle}>
              <Button
                href={`mailto:${email}?subject=${encodeURIComponent(`Re: Sovran enquiry ${reference}`)}`}
                style={buttonStyle}
              >
                Reply to {firstName}&nbsp;&nbsp;→
              </Button>
              <Text style={captionStyle}>
                Replying to enquiries in the first 12 hours improves the chances of converting leads to business.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function DetailCard({
  title,
  spacingTop,
  children,
}: {
  title: string;
  spacingTop?: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={{...cardStyle, marginTop: spacingTop ?? "0"}}>
      <Heading as="h2" style={cardHeadingStyle}>{title}</Heading>
      {children}
    </Section>
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
const internalHeroImageStyle = {
  display: "block",
  width: "100%",
  height: "174px",
  objectFit: "cover" as const,
  borderRadius: "2px 2px 0 0",
};
const heroTitleStyle = {
  padding: "18px 16px 24px",
  borderRadius: "0 0 2px 2px",
  backgroundColor: "#44504e",
};
const headingStyle = {
  margin: "0",
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
const actionStyle = {marginTop: "32px"};
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
const captionStyle = {
  margin: "8px 0 0",
  color: "#4b585b",
  fontSize: "16px",
  fontStyle: "italic",
  lineHeight: "24px",
};
