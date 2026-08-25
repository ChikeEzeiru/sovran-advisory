import Image from "next/image";

type InternalPageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
};

export function InternalPageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  meta,
}: InternalPageHeroProps) {
  return (
    <section className="mx-auto w-full max-w-400 px-12 pt-40 pb-24 max-md:px-6 max-md:pt-32 max-md:pb-16">
      <div className={image ? "grid grid-cols-2 items-end gap-12 max-lg:grid-cols-1" : "max-w-4xl"}>
        <div className="flex min-w-0 flex-col items-start gap-4">
          <div className="rounded-xs border border-border-secondary-alt bg-bg-secondary-alt px-3 py-1">
            <p className="text-base leading-6 text-text-quaternary">{eyebrow}</p>
          </div>
          <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary max-md:text-4xl max-md:leading-11">
            {title}
          </h1>
          {intro && (
            <p className="max-w-3xl text-xl leading-7.5 text-text-tertiary">
              {intro}
            </p>
          )}
          {meta && <p className="text-sm leading-5 text-text-quaternary">{meta}</p>}
        </div>

        {image && (
          <div className="relative aspect-4/3 min-w-0 overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-16/9 max-sm:aspect-4/3">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, calc(100vw - 48px)"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
          </div>
        )}
      </div>
    </section>
  );
}
