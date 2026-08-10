"use client";

import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import type { ReactNode } from "react";

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 8h12M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ButtonVariant =
  | "primary"
  | "primary-alt"
  | "secondary"
  | "tertiary"
  | "link"
  | "destructive"
  | "destructive-link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

// Inner top-highlight border for dark-bg variants (fades top→bottom)
const innerHighlight = "before:absolute before:inset-px before:rounded-[14px] before:border before:border-white/[0.12] before:[mask-image:linear-gradient(to_bottom,black,transparent)] before:pointer-events-none";

const variantCls: Record<ButtonVariant, string> = {
  primary:          `bg-[#1A3D2E] hover:bg-[#2A5C45] text-white shadow-xs-skeuomorphic ${innerHighlight}`,
  "primary-alt":    `bg-[#22292B] hover:bg-[#3A4547] text-white shadow-xs-skeuomorphic ${innerHighlight}`,
  secondary:        "bg-white hover:bg-[var(--color-secondary-hover)] text-[#22292B] shadow-xs-skeuomorphic ring-1 ring-[#D4D1CC] ring-inset",
  tertiary:         "bg-[var(--btn-tertiary-bg)] hover:bg-[var(--btn-tertiary-bg-hover)] text-[var(--btn-muted-text)]",
  link:             "text-[var(--btn-muted-text)]",
  destructive:      `bg-[#C13030] hover:bg-[#D94040] text-white shadow-xs-skeuomorphic ${innerHighlight}`,
  "destructive-link": "text-[#C13030]",
};

// px, py, text size, line-height
const sizeCls: Record<ButtonSize, { padding: string; text: string }> = {
  xs: { padding: "px-2.5 py-1.5", text: "text-sm leading-5" }, // 14/20 → 32px
  sm: { padding: "px-3 py-2", text: "text-sm leading-5" }, // 14/20 → 36px
  md: { padding: "px-3.5 py-2.5", text: "text-sm leading-5" }, // 14/20 → 40px
  lg: { padding: "px-3.5 py-2.5", text: "text-base leading-6" }, // 16/24 → 44px
  xl: { padding: "px-4.5 py-3", text: "text-base leading-6" }, // 16/24 → 48px
};

const PILL_RADIUS = 16;
const PILL_SMOOTHING = 0.6;

function isPill(v: ButtonVariant) {
  return v !== "link" && v !== "destructive-link";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  showIcon = true,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const pill = isPill(variant);
  const { padding, text } = sizeCls[size];

  const base = [
    "group relative inline-flex items-center gap-1.5 cursor-pointer font-medium",
    "transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    text,
    pill ? padding : "",
    variantCls[variant],
    className,
  ].join(" ");

  // Text container height matches the line-height of the chosen size
  const textHeight = size === "lg" || size === "xl" ? "h-6" : "h-5";
  const leading = size === "lg" || size === "xl" ? "leading-6" : "leading-5";

  const inner = (
    <>
      {/* Text slides vertically */}
      <span className={`relative overflow-hidden flex ${textHeight}`}>
        <span
          className={`${leading} whitespace-nowrap transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full motion-reduce:transition-none`}
        >
          {children}
        </span>
        <span
          className={`absolute top-full left-0 ${leading} whitespace-nowrap transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full motion-reduce:transition-none`}
          aria-hidden
        >
          {children}
        </span>
      </span>

      {/* Icon slides horizontally */}
      {showIcon && (
        <span className="relative overflow-hidden inline-flex items-center w-4 h-4 shrink-0">
          <ArrowRight className="shrink-0 transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-full motion-reduce:transition-none" />
          <ArrowRight className="absolute inset-0 shrink-0 -translate-x-full transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 motion-reduce:transition-none" />
        </span>
      )}
    </>
  );

  // Link variants: no squircle clipping
  if (!pill) {
    return href ? (
      <Link href={href} className={base}>
        {inner}
      </Link>
    ) : (
      <button type={type} onClick={onClick} className={base}>
        {inner}
      </button>
    );
  }

  // Pill variants: iOS corner smoothing via squircle clip-path
  return (
    <Squircle
      asChild
      cornerRadius={PILL_RADIUS}
      cornerSmoothing={PILL_SMOOTHING}
    >
      {href ? (
        <Link href={href} className={base}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={base}>
          {inner}
        </button>
      )}
    </Squircle>
  );
}
