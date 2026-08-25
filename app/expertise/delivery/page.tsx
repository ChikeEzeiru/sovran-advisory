import type { Metadata } from "next";
import { PracticePage } from "@/components/pages/PracticePage";

export const metadata: Metadata = { title: "Delivery", description: "Turn approved strategy into coordinated, measurable progress." };

export default function DeliveryPage() {
  return <PracticePage data={{
    name: "Delivery", title: "Make the decision real.",
    intro: "We help teams coordinate people, priorities and practical work so an approved strategy becomes progress that can be seen and measured.",
    image: "/images/services/sovran photo - digital and tech advisory 2.avif", imageAlt: "A transport and logistics system operating at scale.",
    services: ["Programme design", "Transformation delivery", "Implementation support", "Performance tracking", "Strategic communications"],
    receive: "A working delivery plan, a programme rhythm, clear responsibilities and a way to track progress.",
    callWhen: "When strategy has been approved but implementation is complex, cross-functional or at risk of drifting.", cta: "Discuss a delivery question",
    caseStudy: { title: "Launching two regional hubs through one coordinated delivery programme", meta: "Logistics · West Africa", href: "/case-studies/logistics-expansion", image: "/images/case-studies/financial_services-case.avif" },
    perspectives: [
      { title: "Three signals reshaping East African logistics", type: "Regional brief", href: "/perspectives/signals-reshaping-east-african-logistics" },
      { title: "Local context is not a footnote to strategy", type: "Opinion", href: "/perspectives/local-context-and-strategy" },
    ],
  }} />;
}
