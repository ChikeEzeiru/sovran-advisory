import type { Metadata } from "next";
import { PracticePage } from "@/components/pages/PracticePage";

export const metadata: Metadata = { title: "Intelligence", description: "Understand the market before you commit with clear commercial, competitor, policy and operating intelligence." };

export default function IntelligencePage() {
  return <PracticePage data={{
    name: "Intelligence", title: "Understand the market before you commit.",
    intro: "We turn dispersed market, competitor, policy and operating signals into a clear view of the decision in front of you.",
    image: "/images/services/sovran photo - Intelligence.avif", imageAlt: "An elevated view of a dense city and its transport network.",
    services: ["Market landscape", "Competitor and customer insight", "Commercial due diligence", "Political and economic context", "Opportunity assessment"],
    receive: "A short decision brief, a clear risk-and-opportunity view, and a practical recommendation about what to test, change or pursue.",
    callWhen: "When you are considering a new market, investment, partner or growth move.", cta: "Discuss an intelligence question",
    caseStudy: { title: "Building a smarter route into three fast-moving payments markets", meta: "Payments · Nigeria, Kenya and Ghana", href: "/case-studies/payments-entry", image: "/images/case-studies/Case-study_Asterpay.avif" },
    perspectives: [
      { title: "The new competitive landscape for African payments", type: "Sector insight", href: "/perspectives/the-new-competitive-landscape-for-african-payments" },
      { title: "Nigeria’s next digital infrastructure cycle", type: "Market brief", href: "/perspectives/nigerias-next-digital-infrastructure-cycle" },
    ],
  }} />;
}
