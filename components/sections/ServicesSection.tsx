import Image from "next/image";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { ButtonVisual } from "@/components/ui/Button";

interface Service {
  title: string;
  description: string;
  href: string;
  image: string;
  overlay?: string;
}

const SERVICES: Service[] = [
  {
    title: "Intelligence",
    description:
      "See the signals, constraints and opportunities that matter before you commit.",
    href: "/expertise/intelligence",
    image: "/images/services/sovran photo - Intelligence.avif",
  },
  {
    title: "Strategy",
    description:
      "Choose a route to market, investment or growth that fits the situation.",
    href: "/expertise/strategy",
    image: "/images/services/sovran photo - comms and stakeholder eng.avif",
  },
  {
    title: "Institutions",
    description:
      "Work with the regulators, partners and public systems that shape the outcome",
    href: "/expertise/institutions",
    image: "/images/services/sovran photo - policy and govt relations.avif",
  },
  {
    title: "Delivery",
    description:
      "Turn decisions into coordinated programmes, operating models and measurable progress",
    href: "/expertise/delivery",
    image: "/images/services/comms-base.png",
    overlay: "/images/services/sovran photo - digital and tech advisory 2.avif",
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <ConditionalLink
      href={service.href}
      className="group/service-card block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
    >
      <div className="relative h-95 overflow-hidden rounded-xs bg-bg-quaternary mb-5">
        <Image
          src={service.image}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 640px) 360px, 288px"
          className="object-cover transition-transform duration-500 ease-out group-hover/service-card:scale-105 motion-reduce:transition-none"
        />
        {service.overlay && (
          <Image
            src={service.overlay}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 640px) 360px, 288px"
            className="object-cover transition-transform duration-500 ease-out group-hover/service-card:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <h3 className="text-xl font-semibold leading-7 text-text-primary">
          {service.title}
        </h3>
        <p className="text-base font-normal leading-6 text-text-tertiary">
          {service.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium leading-5 text-text-tertiary transition-colors duration-150 group-hover/service-card:text-text-brand-secondary">
          <ButtonVisual size="sm" interaction="service-card">
            Explore
          </ButtonVisual>
        </span>
      </div>
    </ConditionalLink>
  );
}

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="py-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-12 max-md:px-6">
        <div className="flex max-w-4xl flex-col gap-4">
          {/* Badge + body copy */}
          <div className="flex flex-col gap-2">
            <div className="self-start border border-border-primary rounded-xs px-3 py-1">
              <span className="text-base font-normal leading-6 text-text-quaternary whitespace-nowrap">
                What we do
              </span>
            </div>

            <h2
              id="services-heading"
              className="text-4xl font-medium leading-11 tracking-tight text-text-primary"
            >
              Complex markets require more than one perspective.
            </h2>
          </div>
          <p className="max-w-4xl text-base font-normal leading-6 text-text-tertiary">
            Our work often begins with a question about a market, an investment,
            or a policy change. We bring together the research, strategy,
            institutional knowledge, and delivery expertise needed to take it
            from question to action.
          </p>
        </div>

        <ul
          role="list"
          className="flex w-full gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES.map((service) => (
            <li
              key={service.href}
              className="w-72 shrink-0 transition-[flex-grow,width] duration-500 ease-out sm:w-85 xl:w-auto xl:min-w-0 xl:flex-[1_1_0%] xl:pointer-fine:hover:flex-[1.08_1_0%] motion-reduce:transition-none"
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
