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
      <div className="mx-auto flex h-76 w-full max-w-400 gap-6 overflow-hidden max-md:h-auto max-md:flex-col max-md:overflow-visible">
        <article className="relative flex h-full w-79 min-w-79 shrink-0 flex-col justify-end gap-2 overflow-hidden rounded-xs p-4 text-text-primary-on-brand max-md:h-76 max-md:w-full max-md:min-w-0">
          <Image
            src="/images/about-us/Sovran founded 2012.jpg"
            alt=""
            fill
            sizes="316px"
            className="object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-black/25" />
          <p className="relative text-6xl max-md:text-4xl max-md:leading-11 font-bold leading-16 tracking-tight">
            2012
          </p>
          <p className="relative text-xl max-md:text-lg max-md:leading-7 leading-7.5">Sovran was founded</p>
        </article>

        <div
          tabIndex={0}
          aria-label="Sovran's evolution timeline. The milestones move slowly from right to left."
          className="min-w-0 flex-1 overflow-hidden overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:overflow-x-auto max-md:w-full max-md:overflow-visible"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="about-evolution-marquee flex h-full w-max will-change-transform motion-reduce:will-change-auto max-md:h-auto max-md:w-full max-md:transform-none max-md:animate-none max-md:will-change-auto">
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate" : "original"}
                aria-hidden={isDuplicate || undefined}
                className={`flex h-full gap-6 pr-6 max-md:h-auto max-md:w-full max-md:flex-col max-md:pr-0 ${
                  isDuplicate ? "max-md:hidden" : ""
                }`}
              >
                {MILESTONES.map((milestone) => (
                  <article
                    key={milestone.title.join(" ")}
                    className="h-full w-72 shrink-0 rounded-xs border border-border-primary p-4 max-md:h-auto max-md:w-full max-md:px-4 max-md:py-5"
                  >
                    <h2 className="text-xl max-md:text-lg max-md:leading-7 font-medium leading-7.5 tracking-tight text-text-secondary-hover">
                      {milestone.title.map((line, index) => (
                        <span key={line} className="block max-md:inline">
                          {index > 0 && <span className="hidden max-md:inline"> </span>}
                          {line}
                        </span>
                      ))}
                    </h2>
                    <p className="mt-4 text-lg max-md:mt-3 max-md:text-base max-md:leading-6 leading-7 text-text-tertiary">
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
