import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="w-fit rounded-xs border border-border-secondary-alt bg-bg-secondary-alt px-3 py-1">
      <p className="whitespace-nowrap text-base font-normal leading-6 text-text-quaternary">
        {children}
      </p>
    </div>
  );
}
