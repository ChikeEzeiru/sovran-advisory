import type { Metadata } from "next";
import { PracticePage } from "@/components/pages/PracticePage";

export const metadata: Metadata = { title: "Strategy", description: "Choose a route to market, investment or growth that can work in the real world." };

export default function StrategyPage() {
  return <PracticePage data={{
    name: "Strategy", title: "Choose a route that can work in the real world.",
    intro: "We help leaders make choices about where to play, how to enter, what to build and what must be true for growth to last.",
    image: "/images/services/sovran photo - comms and stakeholder eng.avif", imageAlt: "A modern transport interchange connecting a growing city.",
    services: ["Market-entry strategy", "Growth strategy", "Portfolio choices", "Investment cases", "Operating-model design"],
    receive: "A focused strategy with choices, priorities, owners and a plan to move from decision to action.",
    callWhen: "When the direction is not yet clear, or when a good idea needs a more workable plan.", cta: "Discuss a strategy question",
    caseStudy: { title: "Testing an infrastructure opportunity against freight corridor constraints", meta: "Infrastructure · East Africa", href: "/case-studies/infrastructure-investment", image: "/images/case-studies/development_finance-case.avif" },
    perspectives: [
      { title: "Why market entry fails after the strategy is approved", type: "Analysis", href: "/perspectives/why-market-entry-fails-after-strategy" },
      { title: "Infrastructure opportunities beyond major cities", type: "Investment brief", href: "/perspectives/infrastructure-opportunities-beyond-major-cities" },
    ],
  }} />;
}
