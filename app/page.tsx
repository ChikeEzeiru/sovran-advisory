import { Navbar } from "@/components/sections/Navbar"
import { HomeHero } from "@/components/sections/HomeHero"
import { LogoMarquee } from "@/components/sections/LogoMarquee"
import { AboutSection } from "@/components/sections/AboutSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection"
import { IntelligenceSection } from "@/components/sections/IntelligenceSection"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <LogoMarquee />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <IntelligenceSection />
      <Footer />
    </>
  )
}
