import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const LEADERS = [
  {
    name: "Amara Okafor",
    role: "Co-Founder & Managing Partner",
    image: "/images/about-us/Managing Partner co founder img.avif",
    imagePosition: "object-center",
  },
  {
    name: "Daniel Mensah",
    role: "Co-Founder & Partner, Institutional Advisory",
    image: "/images/about-us/Partner co founder img.avif",
    imagePosition: "object-center",
  },
  {
    name: "Lina Adeyemi",
    role: "Partner, Intelligence",
    image: "/images/about-us/Intelligence Partner img.avif",
    imagePosition: "object-center",
  },
  {
    name: "Kofi Asare",
    role: "Partner, Delivery",
    image: "/images/about-us/Delivery Partner img.avif",
    imagePosition: "object-center",
  },
];

function SocialMarks() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center gap-4 text-text-quaternary transition-transform duration-300 ease-out group-hover/leader:-translate-x-1 motion-reduce:transition-none"
    >
      <span className="size-4.5 bg-current mask-[url('/icons/social/x.svg')] mask-center mask-no-repeat mask-contain transition-colors duration-300 group-hover/leader:text-black motion-reduce:transition-none" />
      <span className="size-4.5 bg-current mask-[url('/icons/social/linkedin.svg')] mask-center mask-no-repeatze:contain] transition-colors duration-300 group-hover/leader:text-[#0A66C2] motion-reduce:transition-none" />
    </div>
  );
}

export function AboutLeadershipSection() {
  return (
    <section className="px-12 pt-24 pb-16 max-md:px-6 max-md:pt-16 max-md:pb-12">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
        <div className="flex items-start justify-between gap-12 max-md:flex-col max-md:gap-6">
          <div className="flex max-w-194 flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <SectionEyebrow>Leadership</SectionEyebrow>
              <h2 className="text-4xl font-medium leading-11 tracking-tight text-text-primary max-md:text-3xl max-md:leading-9">
                Experience across the markets we advise on.
              </h2>
            </div>
            <p className="text-xl leading-7.5 text-text-tertiary">
              Our partners bring backgrounds in market intelligence, strategy,
              institutional advisory and delivery. They lead engagements
              directly, bringing together the people and expertise each
              assignment requires.
            </p>
          </div>

          <Button href="/leadership" variant="primary-alt" size="md">
            Meet the rest of the team
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {LEADERS.map((leader) => (
            <article key={leader.name} className="group/leader min-w-0">
              <div className="relative h-95 overflow-hidden rounded-xs bg-bg-quaternary">
                <Image
                  src={leader.image}
                  alt={`Portrait of ${leader.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover ${leader.imagePosition}`}
                />
              </div>

              <div className="mt-6 px-2 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="min-w-0 text-2xl font-medium leading-8 tracking-tight text-text-secondary">
                    {leader.name}
                  </h3>
                  <SocialMarks />
                </div>
                <p className="max-w-72 text-lg leading-7 text-text-secondary">
                  {leader.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
