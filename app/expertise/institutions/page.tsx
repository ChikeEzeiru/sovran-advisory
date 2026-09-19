import {
  PracticePage,
  type PracticePageData,
} from "@/components/pages/PracticePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Institutional, Policy & Regulatory Advisory",
  description:
    "Institutional advisory for organisations navigating regulators, public bodies, policy, stakeholder relationships and multi-party programmes across Africa.",
  path: "/expertise/institutions",
  image: "/images/services/sovran photo - policy and govt relations.avif",
});

const institutionsPageData: PracticePageData = {
  name: "Institutions",

  // CONTENT EDIT — HERO: eyebrow, headline, introduction and image.
  hero: {
    title: "Navigate the systems and relationships around the work.",
    body: "Markets are shaped by regulators, public bodies, partners and communities. We help clients understand those actors and engage them responsibly.",
    image: "/images/services/sovran photo - policy and govt relations.avif",
    imageAlt: "A civic building set within a working city.",
  },

  // CONTENT EDIT — INTRO: section label, title, body and all three metrics.
  intro: {
    eyebrow: "Intro",
    title:
      "Businesses do not operate separately from the institutions around them.",
    body: "Policy decisions, regulation, government priorities and public interests can shape what an organisation can do and how quickly it can do it. We help clients understand that environment and engage with it more effectively.",
    metrics: [
      {
        value: "2.8×",
        label: "implementation gap in young-workforce economies",
        context: "World Bank B-READY, 2025",
      },
      {
        value: "21",
        label: "regulatory environments worked across",
        context:
          "Experience navigating different policy, regulatory and institutional settings.",
      },
      {
        value: "80+",
        label: "policy and institutional engagements supported",
        context: "Across government, business and regulated sectors.",
      },
    ],
  },

  // CONTENT EDIT — WHAT WE DO: section copy and capability-card content.
  capabilities: {
    eyebrow: "What we do",
    title: "Focused work around the decision in front of you.",
    body: "We help organisations understand the policy, regulatory and stakeholder environment around them, and how to work within it effectively.",
    items: [
      {
        title: "Stakeholder mapping",
        body: "Identify who matters, understand their interests and determine how engagement should be approached.",
      },
      {
        title: "Regulatory strategy",
        body: "Examine the political, economic and institutional forces shaping a market or issue.",
      },
      {
        title: "Policy analysis",
        body: "Understand existing rules, emerging policy and what changes could mean for the organisation.",
      },
      {
        title: "Partnership design",
        body: "Develop a clearer approach to engaging government and public institutions.",
      },
      {
        title: "Public-sector programme support",
        body: "Support institutions and organisations developing policy, frameworks or programmes.",
      },
    ],
  },

  // CONTENT EDIT — RELATED WORK: case-study copy, link, image and two results.
  caseStudy: {
    eyebrow: "Related work",
    title:
      "Aligning institutions around a shared digital infrastructure programme",
    body: "A shared digital identity programme had a sound technical case but no common operating picture across the agencies involved. Sovran clarified mandates, data responsibilities and decision rights, helping the institutions agree one roadmap, governance group and first services for pilot.",
    href: "/case-studies/digital-infrastructure",
    image: "/images/case-studies/public_sector-case.avif",
    imageAlt: "A public-sector infrastructure project in an African city.",
    logo: "/logos/case_study_logos/National Dig. Serv. Logo [Vectorized].svg",
    logoAlt: "National Digital Services Office",
    cta: "View case study",
    metrics: [
      {
        value: "1",
        label: "agreed roadmap with shared programme governance",
      },
      {
        value: "4",
        label: "delivery domains brought into shared governance",
      },
    ],
  },
};

export default function InstitutionsPage() {
  return <PracticePage data={institutionsPageData} />;
}
