import Image from 'next/image'
import {Suspense} from 'react'
import {CareerRoleCard} from '@/components/sections/CareerRoleCard'
import {Navbar} from '@/components/sections/Navbar'
import {SiteFooter} from '@/components/sections/SiteFooter'
import {SectionEyebrow} from '@/components/ui/SectionEyebrow'
import {getCareerRoles, type CareerRole} from '@/lib/career-roles'
import {createPageMetadata} from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Careers in African Markets Advisory',
  description:
    'Explore open roles at Sovran and join a multidisciplinary team working across African markets, strategy, policy, institutions and delivery.',
  path: '/careers',
  image: '/images/about-us/Careers section image.avif',
})

function groupRoles(roles: CareerRole[]) {
  return roles.reduce<Map<string, CareerRole[]>>((groups, role) => {
    const group = groups.get(role.department) ?? []
    group.push(role)
    groups.set(role.department, group)
    return groups
  }, new Map())
}

async function OpenRoles() {
  const roles = await getCareerRoles()
  const groupedRoles = groupRoles(roles)

  if (roles.length === 0) {
    return (
      <div className="grid grid-cols-[20rem_minmax(0,1fr)] gap-16 max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <h2 className="text-xl max-md:text-lg max-md:leading-7 font-semibold leading-7.5 text-text-primary">
            No open roles
          </h2>
          <p className="mt-2 text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">
            There are no current vacancies, but new opportunities will be published here.
          </p>
        </div>
        <div className="flex min-h-42 items-center rounded-xs border border-border-secondary bg-bg-primary p-6">
          <p className="max-w-xl text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">
            We are not recruiting at the moment. Please check back for future openings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16">
      {[...groupedRoles.entries()].map(([department, departmentRoles]) => (
        <div
          key={department}
          className="grid grid-cols-[20rem_minmax(0,1fr)] gap-16 max-lg:grid-cols-1 max-lg:gap-8"
        >
          <div>
            <h2 className="text-xl max-md:text-lg max-md:leading-7 font-semibold leading-7.5 text-text-primary">
              {department}
            </h2>
            <p className="mt-2 text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">
              {departmentRoles[0].departmentDescription}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            {departmentRoles.map((role) => (
              <CareerRoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function OpenRolesFallback() {
  return (
    <div className="grid grid-cols-[20rem_minmax(0,1fr)] gap-16 max-lg:grid-cols-1 max-lg:gap-8">
      <div className="h-15 w-64 rounded-xs bg-bg-quaternary" />
      <div className="flex flex-col gap-6">
        <div className="h-42 rounded-xs border border-border-secondary bg-bg-primary" />
        <div className="h-42 rounded-xs border border-border-secondary bg-bg-primary" />
      </div>
    </div>
  )
}

export default function CareersPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main>
        <section
          data-theme="dark"
          className="bg-neutral-900 px-12 pt-30 pb-24 max-md:px-4 max-md:pt-24 max-md:pb-16"
          aria-labelledby="careers-heading"
        >
          <div className="mx-auto flex w-full max-w-400 flex-col gap-16 max-md:gap-8">
            <div className="flex max-w-214 flex-col items-start gap-2">
              <SectionEyebrow surface="raised">Careers</SectionEyebrow>
              <div className="flex flex-col gap-3">
                <h1
                  id="careers-heading"
                  className="text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-15 tracking-tight text-text-primary "
                >
                  Do work that has to hold up in the real world.
                </h1>
                <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
                  We bring together people who ask better questions, work across
                  different perspectives and stay close to the practical work
                  after a decision is made.
                </p>
              </div>
            </div>

            <div className="relative h-95 w-full max-w-336 overflow-hidden bg-bg-quaternary max-md:h-44">
              <Image
                src="/images/about-us/Careers section image.avif"
                alt="Sovran colleagues in conversation during a working session."
                fill
                priority
                sizes="(min-width: 1440px) 1344px, calc(100vw - 96px)"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section
          id="open-roles"
          className="scroll-mt-18 px-12 pt-16 pb-24 max-md:px-4 max-md:pt-12 max-md:pb-16"
        >
          <div className="mx-auto flex w-full max-w-336 flex-col gap-6 border-t border-border-secondary pt-6">
            <SectionEyebrow>Open roles</SectionEyebrow>
            <Suspense fallback={<OpenRolesFallback />}>
              <OpenRoles />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
