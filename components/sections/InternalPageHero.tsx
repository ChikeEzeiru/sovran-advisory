import Image from "next/image";

type InternalPageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
  align?: "left" | "center";
  spacing?: "default" | "compact";
};

export function InternalPageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  meta,
  align = "left",
  spacing = "default",
}: InternalPageHeroProps) {
  const isCentered = align === "center" && !image;

  return (
    <section
      className={`mx-auto w-full max-w-400 px-12 pb-24 max-md:px-4 max-md:pb-16 ${
        spacing === "compact" ? "pt-30 max-md:pt-30" : "pt-40 max-md:pt-24"
      }`}
    >
      <div
        className={
          image
            ? "grid grid-cols-2 items-end gap-12 max-lg:grid-cols-1"
            : isCentered
              ? "mx-auto max-w-4xl"
              : "max-w-4xl"
        }
      >
        <div
          className={`flex min-w-0 flex-col gap-4 ${
            isCentered ? "items-center text-center" : "items-start"
          }`}
        >
          <div className="rounded-xs border border-border-secondary-alt bg-bg-secondary-alt px-3 py-1">
            <p className="text-base leading-6 text-text-quaternary">
              {eyebrow}
            </p>
          </div>
          <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary max-md:text-3xl max-md:leading-9">
            {title}
          </h1>
          {intro && (
            <p className="max-w-3xl text-xl leading-7.5 text-text-tertiary max-md:text-lg max-md:leading-7">
              {intro}
            </p>
          )}
          {meta && (
            <p className="text-sm leading-5 text-text-quaternary">{meta}</p>
          )}
        </div>

        {image && (
          <div className="relative aspect-4/3 min-w-0 overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-video max-sm:aspect-4/3">
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
