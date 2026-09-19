import Image from "next/image";

const MILESTONES = [
  {
    title: ["Built around", "market intelligence"],
    body: "Sovran began as a small market-intelligence practice helping organisations understand unfamiliar markets and make better-informed decisions.",
  },
  {
    title: ["From insight", "to execution"],
    body: "Clients increasingly needed more than reports. They needed help navigating institutions, entering markets and turning recommendations into action.",
  },
  {
    title: ["Expertise across", "disciplines"],
    body: "That work expanded across strategy, policy, communications and technology, reflecting how closely these forces shape one another.",
  },
  {
    title: ["A regional perspective,", "grounded locally"],
    body: "Today, Sovran combines local knowledge with a broader understanding of how businesses, governments and institutions operate across Sub-Saharan Africa.",
  },
];

export function AboutEvolutionSection() {
  return (
    <section aria-label="Sovran's evolution" className="px-12 py-8 max-md:px-4">
      <div className="mx-auto flex h-76 w-full max-w-400 gap-6 overflow-hidden">
        <article className="relative flex h-full w-79 min-w-79 shrink-0 flex-col justify-end gap-2 overflow-hidden rounded-xs p-4 text-text-primary-on-brand max-md:w-56 max-md:min-w-56">
          <Image
            src="/images/about-us/Sovran founded 2012.jpg"
            alt=""
            fill
            sizes="316px"
            className="object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-black/25" />
          <p className="relative text-6xl font-bold leading-16 tracking-tight">
            2012
          </p>
          <p className="relative text-xl leading-7.5">Sovran was founded</p>
        </article>

        <div
          tabIndex={0}
          aria-label="Sovran's evolution timeline. The milestones move slowly from right to left."
          className="min-w-0 flex-1 overflow-hidden overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="about-evolution-marquee flex h-full w-max will-change-transform motion-reduce:will-change-auto">
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate" : "original"}
                aria-hidden={isDuplicate || undefined}
                className="flex h-full gap-6 pr-6"
              >
                {MILESTONES.map((milestone) => (
                  <article
                    key={milestone.title.join(" ")}
                    className="h-full w-72 shrink-0 rounded-xs border border-border-primary p-4"
                  >
                    <h2 className="text-xl font-medium leading-7.5 tracking-tight text-text-secondary-hover">
                      {milestone.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>
                    <p className="mt-4 text-lg leading-7 text-text-tertiary">
                      {milestone.body}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
