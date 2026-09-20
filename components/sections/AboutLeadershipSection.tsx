import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { LEADERS } from "@/lib/leadership";

export function AboutLeadershipSection() {
  return (
    <section className="px-12 pt-24 pb-16 max-md:px-4 max-md:pt-16 max-md:pb-12">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-12">
        <div className="flex items-start justify-between gap-12 max-md:flex-col max-md:gap-6">
          <div className="flex max-w-194 flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <SectionEyebrow>Leadership</SectionEyebrow>
              <h2 className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary ">
                Experience across the markets we advise on.
              </h2>
            </div>
            <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
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

        <LeadershipGrid leaders={LEADERS.slice(0, 4)} />
      </div>
    </section>
  );
}
