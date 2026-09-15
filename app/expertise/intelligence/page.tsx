import type { Metadata } from "next";
import {
  PracticePage,
  type PracticePageData,
} from "@/components/pages/PracticePage";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "Understand the market before you commit with clear commercial, competitor, policy and operating intelligence.",
};

const intelligencePageData: PracticePageData = {
  name: "Intelligence",

  // CONTENT EDIT — HERO: eyebrow, headline, introduction and image.
  hero: {
    title: "Understand the market before you commit.",
    body: "We turn dispersed market, competitor, policy and operating signals into a clear view of the decision in front of you.",
    image: "/images/services/sovran photo - Intelligence.avif",
    imageAlt: "An elevated view of a dense city and its transport network.",
  },

  // CONTENT EDIT — INTRO: section label, title, body and all three metrics.
  intro: {
    eyebrow: "Intro",
    title: "Information is easy to find. Knowing what matters is harder.",
    body: "Our intelligence work brings together market research, local knowledge and analysis to give clients a clearer view of the environment around them. We look at what is happening, why it is happening and what it could mean for the decisions ahead.",
    metrics: [
      {
        value: "39%",
        label: "of African CEOs think they can anticipate disruption",
        context: "PwC Africa CEO Survey, 2026",
      },
      {
        value: "26",
        label: "African markets analysed",
        context: "In-depth intelligence across the region.",
      },
      {
        value: "100+",
        label: "major decisions informed",
        context: "Across market entry, investment, partnerships and growth.",
      },
    ],
  },

  // CONTENT EDIT — WHAT WE DO: section copy and capability-card content.
  capabilities: {
    eyebrow: "What we do",
    title: "Focused work around the decision in front of you.",
    body: "We build a clearer picture of the markets, competitors, institutions and shifts that matter to the decision in front of you.",
    items: [
      {
        title: "Market landscape",
        body: "Understand market size, structure, demand and the forces shaping growth.",
      },
      {
        title: "Competitor and customer insight",
        body: "See how competitors are positioned, where they are moving and where opportunities may exist.",
      },
      {
        title: "Commercial due diligence",
        body: "Build a grounded view of a new market before committing capital, people or resources.",
      },
      {
        title: "Political and economic context",
        body: "Track developments in government, policy and regulation that may affect an organisation or market.",
      },
      {
        title: "Stakeholder & Opportunity assessment",
        body: "Identify the institutions, organisations and individuals that influence an issue or decision.",
      },
    ],
  },

  // CONTENT EDIT — RELATED WORK: case-study copy, link, image, logo and two results.
  caseStudy: {
    eyebrow: "Related work",
    title: "Building a smarter route into three fast-moving payments markets",
    body: "AsterPay needed a practical route into three distinct payments markets. Sovran compared demand, competition, licensing and partner options to shape a sequenced two-stage programme.",
    href: "/case-studies/payments-entry",
    image: "/images/case-studies/Case-study_Asterpay.avif",
    imageAlt: "A city and transport network seen from above.",
    logo: "/logos/case_study_logos/Asterpay Logo.svg",
    logoAlt: "AsterPay",
    cta: "View case study",
    metrics: [
      { value: "42", label: "Regulators, industry bodies and partners mapped" },
      { value: "3", label: "Payment markets assessed for growth indicators" },
    ],
  },
};

export default function IntelligencePage() {
  return <PracticePage data={intelligencePageData} />;
}
