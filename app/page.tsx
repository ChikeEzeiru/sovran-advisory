import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Sovran Advisory — African Markets Advisory",
  description:
    "Sovran is an Africa-focused advisory firm working with governments, institutions, and corporates on policy, strategy, digital transformation, and stakeholder engagement.",
}
import { HomeHero } from "@/components/sections/HomeHero"
import { LogoMarquee } from "@/components/sections/LogoMarquee"
import { AboutSection } from "@/components/sections/AboutSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection"
import { PerspectivesSection } from "@/components/sections/PerspectivesSection"
import { SiteFooter } from "@/components/sections/SiteFooter"

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <LogoMarquee />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <PerspectivesSection />
      <SiteFooter />
    </>
  )
}
