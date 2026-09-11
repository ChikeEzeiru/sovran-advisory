import Image from "next/image";
import { Clock, CurrencyDollarCircle } from "@untitledui/icons";
import { BadgeWithFlag } from "@/components/base/badges/badges";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const OPEN_ROLES = [
  {
    title: "Senior Associate, Strategy & Market Intelligence",
    location: "Accra, Ghana",
    flag: "GH" as const,
    description:
      "Turn research, market insight and commercial context into clear recommendations for clients making complex decisions.",
    salary: "20k - 30k",
  },
  {
    title: "Consultant, Policy & Public Affairs",
    location: "Lagos, Nigeria",
    flag: "NG" as const,
    description:
      "Help clients understand policy, regulation and stakeholder dynamics, and navigate the environments shaping their work.",
    salary: "25k - 35k",
  },
];

export function AboutCareersSection() {
  return (
    <section className="border-t border-border-secondary  px-12 pt-24 pb-16 max-md:px-6 max-md:pt-16 max-md:pb-12">
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
            {OPEN_ROLES.map((role) => (
              <article
                key={role.title}
                className="flex min-h-42 flex-col rounded-xs border border-border-secondary bg-bg-primary p-6"
              >
                <div className="flex items-start justify-between gap-5 max-sm:flex-col max-sm:gap-3">
                  <h4 className="max-w-182.5 text-base font-medium leading-6 text-text-primary">
                    {role.title}
                  </h4>
                  <BadgeWithFlag
                    type="color"
                    size="md"
                    color="gray"
                    flag={role.flag}
                    className="shrink-0 rounded-xs"
                  >
                    {role.location}
                  </BadgeWithFlag>
                </div>

                <p className="mt-2.5 text-base max-w-182.5 leading-6 text-text-tertiary">
                  {role.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm leading-5 text-text-tertiary">
                  <span className="inline-flex items-center gap-2">
                    <Clock aria-hidden="true" className="size-5" />
                    Full-time
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CurrencyDollarCircle
                      aria-hidden="true"
                      className="size-5"
                    />
                    {role.salary}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
