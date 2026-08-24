import type { SVGProps } from "react";

export type AssuranceKind = "information" | "privacy" | "integrity" | "quality";

const symbols: Record<AssuranceKind, React.ReactNode> = {
  information: (
    <>
      <path d="M9.5 10.5h3.75M9.5 14h7.5M9.5 17.5h5" />
      <path d="M8 7.5H5.5v13H8M16 7.5h2.5v13H16" />
    </>
  ),
  privacy: (
    <>
      <path d="M12 6.75c-3.3 0-5.5 2.5-5.5 5.25s2.2 5.25 5.5 5.25 5.5-2.5 5.5-5.25S15.3 6.75 12 6.75Z" />
      <circle cx="12" cy="12" r="1.75" />
      <path d="M8.2 16.1 6.75 19M15.8 16.1 17.25 19" />
    </>
  ),
  integrity: (
    <>
      <path d="M12 6.5v12" />
      <path d="m12 8.5-4 2.25h8L12 8.5Z" />
      <path d="M7 10.75 5.25 15h3.5L7 10.75ZM17 10.75 15.25 15h3.5L17 10.75Z" />
      <path d="M9 18.5h6" />
    </>
  ),
  quality: (
    <>
      <path d="m12 6.5 1.65 2.15 2.7.35-.35 2.7 1.65 2.15-2.15 1.65-.35 2.7-2.7-.35L10.3 19.5l-1.65-2.15-2.7-.35.35-2.7-1.65-2.15L6.8 10.5l.35-2.7 2.7.35L12 6.5Z" />
      <path d="m9 12.6 1.85 1.85L15.25 10" />
    </>
  ),
};

export function AssuranceMark({
  kind,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { kind: AssuranceKind }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9.25" opacity="0.48" />
      <path d="M4.5 5.9A9.25 9.25 0 0 1 18.1 4.5M19.5 18.1A9.25 9.25 0 0 1 5.9 19.5" />
      <circle cx="19.15" cy="5.15" r=".85" fill="currentColor" stroke="none" />
      <circle cx="4.85" cy="18.85" r=".85" fill="currentColor" stroke="none" />
      {symbols[kind]}
    </svg>
  );
}
