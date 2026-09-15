import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  surface?: "default" | "raised";
};

const surfaceClasses = {
  default: "border-border-secondary-alt bg-bg-secondary-alt",
  raised: "border-white/15 bg-white/10",
} as const;

export function SectionEyebrow({
  children,
  surface = "default",
}: SectionEyebrowProps) {
  return (
    <div
      className={`w-fit rounded-xs border px-3 py-1 ${surfaceClasses[surface]}`}
    >
      <p className="whitespace-nowrap text-base font-normal leading-6 text-text-quaternary">
        {children}
      </p>
    </div>
  );
}
