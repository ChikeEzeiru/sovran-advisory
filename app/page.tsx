import { Navbar } from "@/components/sections/Navbar"
import { JsonLd } from "@/components/seo/JsonLd"
import { SOVRAN_LOCATIONS } from "@/data/sovran-locations"
import {
  absoluteUrl,
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "African Markets Advisory | Sovran Advisory",
  description:
    "Sovran helps businesses, investors and public institutions make better decisions across African markets, strategy, institutions and delivery.",
  path: "/",
})
import { HomeHero } from "@/components/sections/HomeHero"
import { LogoMarquee } from "@/components/sections/LogoMarquee"
import { AboutSection } from "@/components/sections/AboutSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection"
import { PerspectivesSection } from "@/components/sections/PerspectivesSection"
import { SiteFooter } from "@/components/sections/SiteFooter"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logos/Sovran LogoMark.svg"),
      description: SITE_DESCRIPTION,
      foundingDate: "2012",
      areaServed: ["Africa", "Sub-Saharan Africa"],
      knowsAbout: [
        "African markets",
        "Market intelligence",
        "Corporate strategy",
        "Institutional advisory",
        "Programme delivery",
      ],
      address: SOVRAN_LOCATIONS.map((location) => ({
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressCountry: location.country,
      })),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {"@id": absoluteUrl("/#organization")},
      inLanguage: "en",
    },
  ],
}

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
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
