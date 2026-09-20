import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AboutPointOfViewSection() {
  return (
    <section
      aria-labelledby="point-of-view-heading"
      className="bg-bg-quaternary px-12 pt-24 pb-16 max-md:px-4 max-md:py-16"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <SectionEyebrow>A Strong Point of View</SectionEyebrow>
            <h2
              id="point-of-view-heading"
              className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary "
            >
              We believe good advice begins with understanding how things
              actually work.
            </h2>
          </div>
          <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
            Markets are shaped by more than data. We look at the policy,
            institutions, technology and commercial forces around each
            challenge, helping clients understand the context, set priorities
            and turn strategy into action.
          </p>
        </div>

        <Button href="/perspectives" variant="primary" size="lg">
          Read Perspectives
        </Button>
      </div>
    </section>
  );
}
