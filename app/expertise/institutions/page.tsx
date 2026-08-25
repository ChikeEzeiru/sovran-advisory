import type { Metadata } from "next";
import { PracticePage } from "@/components/pages/PracticePage";

export const metadata: Metadata = { title: "Institutions", description: "Navigate the regulators, public bodies, partners and communities around the work." };

export default function InstitutionsPage() {
  return <PracticePage data={{
    name: "Institutions", title: "Navigate the systems and relationships around the work.",
    intro: "Markets are shaped by regulators, public bodies, partners and communities. We help clients understand those actors and engage them responsibly.",
    image: "/images/services/sovran photo - policy and govt relations.avif", imageAlt: "A civic building set within a working city.",
    services: ["Stakeholder mapping", "Regulatory strategy", "Policy analysis", "Partnership design", "Public-sector programme support"],
    receive: "A map of who matters, what they need, where decisions sit and how to engage without surprises.",
    callWhen: "When regulation, public systems or multi-party relationships can change the result.", cta: "Discuss an institutions question",
    caseStudy: { title: "Aligning institutions around a shared digital infrastructure programme", meta: "Public sector · West Africa", href: "/case-studies/digital-infrastructure", image: "/images/case-studies/public_sector-case.avif" },
    perspectives: [
      { title: "What regulatory fragmentation means for cross-border growth", type: "Policy brief", href: "/perspectives/regulatory-fragmentation-cross-border-growth" },
      { title: "Digital identity and the next phase of public infrastructure", type: "Technology", href: "/perspectives/digital-identity-public-infrastructure" },
    ],
  }} />;
}
