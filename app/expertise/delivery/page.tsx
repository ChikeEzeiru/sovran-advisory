import type { Metadata } from "next";
import {
  PracticePage,
  type PracticePageData,
} from "@/components/pages/PracticePage";

export const metadata: Metadata = {
  title: "Delivery",
  description: "Turn approved strategy into coordinated, measurable progress.",
};

const deliveryPageData: PracticePageData = {
  name: "Delivery",

  // CONTENT EDIT — HERO: eyebrow, headline, introduction and image.
  hero: {
    title: "Make the decision real.",
    body: "We help teams coordinate people, priorities and practical work so an approved strategy becomes progress that can be seen and measured.",
    image: "/images/services/sovran photo - digital and tech advisory 2.avif",
    imageAlt: "A transport and logistics system operating at scale.",
  },

  // CONTENT EDIT — INTRO: section label, title, body and all three metrics.
  intro: {
    eyebrow: "Intro",
    title: "A good recommendation is only the beginning.",
    body: "Delivery is where plans meet budgets, teams, institutions and changing conditions. We help clients organise the work, resolve what gets in the way and maintain momentum from decision through implementation.",
    metrics: [
      {
        value: "31%",
        label:
          "of complex projects fail to realise their full intended benefits",
        context: "PMI Pulse of the Profession, 2026",
      },
      {
        value: "$320m+",
        label: "in programme value supported through delivery",
        context: "From implementation planning through programme execution.",
      },
      {
        value: "88%",
        label: "of critical milestones delivered on schedule",
        context: "Across programmes supported by Sovran.",
      },
    ],
  },

  // CONTENT EDIT — WHAT WE DO: section copy and capability-card content.
  capabilities: {
    eyebrow: "What we do",
    title: "Focused work around the decision in front of you.",
    body: "We help clients organise complex work, align the people involved and keep implementation moving from plan to outcome.",
    items: [
      {
        title: "Programme design",
        body: "Turn strategic priorities into structured programmes with clear outcomes and responsibilities.",
      },
      {
        title: "Transformation delivery",
        body: "Define what needs to happen, in what order and who needs to be involved.",
      },
      {
        title: "Implementation support",
        body: "Coordinate complex work across teams, partners and stakeholders.",
      },
      {
        title: "Performance tracking",
        body: "Help organisations manage the practical work behind significant operational or organisational change.",
      },
      {
        title: "Strategic communications",
        body: "Establish clear measures of progress and identify where intervention is needed.",
      },
    ],
  },

  // CONTENT EDIT — RELATED WORK: case-study copy, link, image, logo and two results.
  caseStudy: {
    eyebrow: "Related work",
    title:
      "Launching two regional hubs through one coordinated delivery programme",
    body: "Axis Freight's country-by-country expansion was creating inconsistent service levels and blurred accountability. Sovran designed a regional model for launching two new hubs.",
    href: "/case-studies/logistics-expansion",
    // Leave `image` unset to use case-study-card-texture.png until the final image is available.
    logo: "/logos/case_study_logos/Axis logo.svg",
    logoAlt: "Axis Freight",
    cta: "View case study",
    metrics: [
      { value: "2", label: "New regional hubs launched" },
      { value: "1", label: "Coordinated delivery programme" },
    ],
  },
};

export default function DeliveryPage() {
  return <PracticePage data={deliveryPageData} />;
}
