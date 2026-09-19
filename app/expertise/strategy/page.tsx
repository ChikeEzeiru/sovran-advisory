import {
  PracticePage,
  type PracticePageData,
} from "@/components/pages/PracticePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Market Entry & Growth Strategy",
  description:
    "Strategy advisory for market entry, growth, investment and operating-model decisions grounded in the realities of African markets.",
  path: "/expertise/strategy",
  image: "/images/services/sovran photo - comms and stakeholder eng.avif",
});

const strategyPageData: PracticePageData = {
  name: "Strategy",

  // CONTENT EDIT — HERO: eyebrow, headline, introduction and image.
  hero: {
    title: "Choose a route that can work in the real world.",
    body: "We help leaders make choices about where to play, how to enter, what to build and what must be true for growth to last.",
    image: "/images/services/sovran photo - comms and stakeholder eng.avif",
    imageAlt: "A modern transport interchange connecting a growing city.",
  },

  // CONTENT EDIT — INTRO: section label, title, body and all three metrics.
  intro: {
    eyebrow: "Intro",
    title: "Strategy is useful only when it helps people make decisions.",
    body: "We work with clients to define the problem, test assumptions and make the trade-offs that shape a clear direction. Our work is grounded in the market and institutional realities surrounding the organisation, not strategy in isolation.",
    metrics: [
      {
        value: "15%",
        label: "of African CEOs focus on five-year planning",
        context: "PwC Africa CEO Survey, 2026",
      },
      {
        value: "75+",
        label: "strategy engagements completed",
        context: "Across key business priorities.",
      },
      {
        value: "$850m+",
        label: "in commercial & investment decisions",
        context: "Helping leaders make clearer consequential choices.",
      },
    ],
  },

  // CONTENT EDIT — WHAT WE DO: section copy and capability-card content.
  capabilities: {
    eyebrow: "What we do",
    title: "Focused work around the decision in front of you.",
    body: "We help clients make the choices that shape growth, investment and direction, then turn those choices into a practical course of action.",
    items: [
      {
        title: "Market-entry strategy",
        body: "Decide where to enter, how to compete and what needs to be in place before doing so.",
      },
      {
        title: "Commercial strategy",
        body: "Assess customers, positioning, routes to market and the economics behind growth.",
      },
      {
        title: "Portfolio and investment strategy",
        body: "Evaluate opportunities and determine where resources can create the most value.",
      },
      {
        title: "Corporate and growth strategy",
        body: "Define where an organisation wants to go and the choices required to get there.",
      },
      {
        title: "Strategic & Operating-model design",
        body: "Translate a longer-term direction into priorities, decisions and a practical plan.",
      },
    ],
  },

  // CONTENT EDIT — RELATED WORK: case-study copy, link, image, logo and two results.
  caseStudy: {
    eyebrow: "Related work",
    title:
      "Testing an infrastructure opportunity against freight corridor constraints",
    body: "Northline Capital needed to test a multi-country freight corridor opportunity against operating realities. Sovran used trade-flow analysis and corridor scenarios to focus the investment.",
    href: "/case-studies/infrastructure-investment",
    // Leave `image` unset to use case-study-card-texture.png until the final image is available.
    logo: "/logos/case_study_logos/Northline logo.svg",
    logoAlt: "Northline Capital",
    cta: "View case study",
    metrics: [
      { value: "2", label: "Linked assets prioritised" },
      { value: "1", label: "Phased investment recommendation" },
    ],
  },
};

export default function StrategyPage() {
  return <PracticePage data={strategyPageData} />;
}
