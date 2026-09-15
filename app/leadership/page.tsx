import type {Metadata} from 'next'
import {LeadershipGrid} from '@/components/sections/LeadershipGrid'
import {Navbar} from '@/components/sections/Navbar'
import {SiteFooter} from '@/components/sections/SiteFooter'
import {LEADERS} from '@/lib/leadership'

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'Meet the senior team leading Sovran’s work across African markets and institutions.',
}

export default function LeadershipPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main>
        <section
          data-theme="dark"
          className="bg-neutral-900 px-12 pt-30 pb-24 max-md:px-6 max-md:pt-26 max-md:pb-16"
          aria-labelledby="leadership-heading"
        >
          <div className="mx-auto w-full max-w-400">
            <div className="flex max-w-214 flex-col gap-3">
              <h1
                id="leadership-heading"
                className="text-5xl font-medium leading-15 tracking-tight text-text-primary max-md:text-4xl max-md:leading-11"
              >
                Leadership shaped by experience across markets and institutions.
              </h1>
              <p className="text-xl leading-7.5 text-text-tertiary">
                Sovran is led by people with experience across business,
                government and advisory work in African markets. Our senior team
                remains involved in the engagements where their judgement and
                experience matter most.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-400 px-12 py-16 max-md:px-6 max-md:py-12"
          aria-label="Sovran leadership team"
        >
          <LeadershipGrid leaders={LEADERS} />
        </section>

        <section className="mx-auto w-full max-w-400 px-12 pb-16 max-md:px-6 max-md:pb-12">
          <div className="border-t border-border-primary pt-16">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-medium leading-8 tracking-tight text-text-secondary">
                Leadership that stays involved
              </h2>
              <p className="mt-2 text-lg leading-7 text-text-secondary">
                Senior involvement does not end after the brief is agreed.
                Partners and practice leads remain close to the work,
                particularly where the issue crosses markets, institutions or
                areas of expertise.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
