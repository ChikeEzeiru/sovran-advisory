import Image from "next/image";
import { CareerRoleCard } from "@/components/sections/CareerRoleCard";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { INITIAL_CAREER_ROLES } from "@/lib/career-roles";

export function AboutCareersSection() {
  return (
    <section className="px-12 pt-24 pb-16 max-md:px-6 max-md:pt-16 max-md:pb-12">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
        <div className="mx-auto flex max-w-222 flex-col items-center gap-3 text-center">
          <SectionEyebrow>Careers</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-11 tracking-tight text-text-primary max-md:text-3xl max-md:leading-9">
            Build your career at Sovran
          </h2>
          <p className="text-xl leading-7.5 text-text-tertiary">
            The problems we work on rarely come with obvious answers. They
            require people who are curious, rigorous and comfortable working
            across disciplines; people who can move from research to strategy,
            challenge assumptions and communicate clearly when the stakes are
            high. If that sounds like the kind of work you want to do, there may
            be a place for you at Sovran.
          </p>
        </div>

        <div className="relative h-95 w-full overflow-hidden rounded-xs bg-bg-quaternary max-md:h-64">
          <Image
            src="/images/about-us/Careers section image.avif"
            alt="Sovran colleagues collaborating around a table."
            fill
            sizes="(min-width: 1600px) 1344px, calc(100vw - 96px)"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-[20rem_minmax(0,1fr)] gap-16 border-t border-border-secondary pt-12 max-lg:grid-cols-1 max-lg:gap-8">
          <div>
            <h3 className="text-2xl font-medium leading-8 text-text-primary">
              Advisory
            </h3>
            <p className="mt-2 text-base leading-6 text-text-tertiary">
              Open positions on our advisory team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 ">
            {INITIAL_CAREER_ROLES.map((role) => (
              <CareerRoleCard key={role.id} role={role} />
            ))}

            <Button
              href="/careers#open-roles"
              variant="primary-alt"
              size="md"
              className="justify-self-start"
            >
              All open roles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
