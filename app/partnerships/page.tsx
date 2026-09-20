import Image from 'next/image'
import {Award03, Globe06, Microscope, ZapFast} from '@untitledui/icons'
import {Footer} from '@/components/sections/Footer'
import {FooterCTA} from '@/components/sections/FooterCTA'
import {Navbar} from '@/components/sections/Navbar'
import {FeaturedIcon} from '@/components/ui/FeaturedIcon'
import {SectionEyebrow} from '@/components/ui/SectionEyebrow'
import {createPageMetadata} from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Partnerships & Institutional Relationships',
  description:
    'How Sovran works with specialist firms, research organisations, public institutions and regional networks to extend expertise and delivery capability.',
  path: '/partnerships',
})

const PARTNER_STRENGTHS = [
  {
    title: 'Specialist expertise',
    copy: 'We work with firms and independent specialists when an engagement requires capabilities beyond our core disciplines.',
    icon: Award03,
  },
  {
    title: 'Research & knowledge',
    copy: 'We collaborate with research organisations, academic institutions and subject-matter experts where specialist knowledge is required.',
    icon: Microscope,
  },
  {
    title: 'Regional capability',
    copy: 'Local partners can add market knowledge, relationships and operating experience in places where deep context matters.',
    icon: Globe06,
  },
  {
    title: 'Delivery partners',
    copy: 'For implementation, we may work alongside technology, operational or programme partners whose capabilities are needed to deliver the project well.',
    icon: ZapFast,
  },
] as const

const SELECTED_PARTNERSHIPS = [
  {
    name: 'Westbridge Policy Institute',
    description:
      'Supports policy research, regulatory analysis and institutional studies across West Africa.',
  },
  {
    name: 'Kora Digital Systems',
    description:
      'Works with Sovran on digital transformation, technology-led change and systems implementation.',
  },
  {
    name: 'East Africa Market Forum',
    description:
      'Provides local market insight, operating context and stakeholder intelligence across East Africa.',
  },
  {
    name: 'Amani Research Group',
    description:
      'Contributes sector research, field studies and market evidence for complex advisory engagements.',
  },
  {
    name: 'Northstar Infrastructure Partners',
    description:
      'Brings technical and commercial expertise to infrastructure and large-scale development programmes.',
  },
  {
    name: 'Meridian Public Affairs',
    description:
      'Supports stakeholder engagement, public affairs and regulatory strategy in selected markets.',
  },
  {
    name: 'CivicLab Africa',
    description:
      'Works on public-sector reform, institutional capacity and policy implementation programmes.',
  },
  {
    name: 'Frontier Delivery Partners',
    description:
      'Supports programme delivery, operational planning and execution across multi-stakeholder initiatives.',
  },
] as const

export default function PartnershipsPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main>
        <section
          data-theme="dark"
          aria-labelledby="partnerships-heading"
          className="relative flex min-h-148 items-end overflow-hidden bg-neutral-900 px-12 pt-30 pb-16 max-md:min-h-136 max-md:px-4 max-md:pt-24 max-md:pb-12"
        >
          <Image
            src="/images/partnerships/sovran-partnerships-hero.avif"
            alt="Professionals from different organisations in discussion."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

          <div className="relative mx-auto w-full max-w-400">
            <div className="flex max-w-192 flex-col items-start gap-3">
              <SectionEyebrow surface="raised">
                Partnerships &amp; Institutional Relationships
              </SectionEyebrow>
              <div className="flex flex-col gap-2">
                <h1
                  id="partnerships-heading"
                  className="text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-15 tracking-tight text-text-primary "
                >
                  Some projects are stronger when the right organisations come together
                </h1>
                <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-secondary ">
                  We work with specialist firms, research organisations, institutions and
                  other partners when their knowledge, reach or capabilities strengthen the
                  work we are doing for clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary-alt-2 px-12 py-16 max-md:px-4 max-md:py-12">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
            <div className="flex max-w-222 flex-col gap-4">
              <h2 className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-secondary ">
                Different partners bring different strengths.
              </h2>
              <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
                We work with specialists, researchers, regional firms and delivery partners
                when their expertise adds something specific to an engagement.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {PARTNER_STRENGTHS.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="flex min-w-0 flex-col gap-6">
                    <FeaturedIcon>
                      <Icon aria-hidden="true" className="size-6" />
                    </FeaturedIcon>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl max-md:text-xl max-md:leading-7.5 font-medium leading-8 tracking-tight text-text-secondary ">
                        {item.title}
                      </h3>
                      <p className="text-lg max-md:text-base max-md:leading-6 leading-7 text-text-secondary ">{item.copy}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-bg-quaternary px-12 pt-24 pb-16 max-md:px-4 max-md:pt-16 max-md:pb-12">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
            <div className="flex max-w-192 flex-col gap-4">
              <h2 className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary ">
                What makes a good partnership
              </h2>
              <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
                We look for organisations that are strong at what they do, clear about where
                they add value and comfortable working as part of one team. The standard of
                their work matters more to us than the size of the organisation.
              </p>
            </div>

            <div className="relative h-70 overflow-hidden bg-bg-primary max-md:h-56">
              <Image
                src="/images/partnerships/Sovran what makes a partnership pic.avif"
                alt="A freight train moving through a forested transport corridor."
                fill
                sizes="(min-width: 1440px) 1344px, calc(100vw - 96px)"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary-alt-2 px-12 py-16 max-md:px-4">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-16 max-md:gap-12">
            <h2 className="text-center text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary">
              Selected partnerships
            </h2>

            <div className="grid grid-cols-4 gap-2.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {SELECTED_PARTNERSHIPS.map((partner) => (
                <article
                  key={partner.name}
                  className="flex min-h-52 flex-col items-center gap-3 rounded-xs border border-border-secondary p-6 text-center max-sm:min-h-0 max-sm:items-start max-sm:px-4 max-sm:py-5 max-sm:text-left"
                >
                  <h3 className="text-2xl max-md:text-xl max-md:leading-7.5 font-medium leading-8 tracking-tight text-text-secondary ">
                    {partner.name}
                  </h3>
                  <p className="text-lg max-md:text-base max-md:leading-6 leading-7 text-text-quaternary ">
                    {partner.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterCTA
        title="Interested in working with Sovran?"
        description="If your organisation brings expertise or capability that could strengthen the work we do, tell us a little about it."
        buttonLabel="Discuss a partnership"
      />
      <Footer />
    </>
  )
}
