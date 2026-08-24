"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LINKS_ENABLED } from "@/lib/links";

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
export type ButtonInteraction = "self" | "service-card";

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
const innerHighlight = "before:absolute before:inset-px before:rounded-[1px] before:border before:border-white/[0.12] before:[mask-image:linear-gradient(to_bottom,black,transparent)] before:pointer-events-none";

const variantCls: Record<ButtonVariant, string> = {
  primary:          `bg-bg-brand-solid hover:bg-bg-brand-solid-hover text-text-primary-on-brand shadow-xs-skeuomorphic active:shadow-xs ${innerHighlight}`,
  "primary-alt":    `bg-bg-primary-solid hover:bg-bg-secondary-solid text-text-primary-on-brand shadow-xs-skeuomorphic active:shadow-xs ${innerHighlight}`,
  secondary:        "bg-bg-primary hover:bg-bg-primary-hover text-text-secondary shadow-xs-skeuomorphic active:shadow-xs ring-1 ring-border-primary ring-inset",
  tertiary:         "bg-bg-tertiary hover:bg-bg-secondary-hover text-text-tertiary",
  link:             "text-text-tertiary hover:text-text-tertiary-hover",
  destructive:      `bg-bg-error-solid hover:bg-bg-error-solid-hover text-text-primary-on-brand shadow-xs-skeuomorphic active:shadow-xs ${innerHighlight}`,
  "destructive-link": "text-text-error-primary hover:text-text-error-primary-hover",
};

// px, py, text size, line-height
const sizeCls: Record<ButtonSize, { padding: string; text: string }> = {
  xs: { padding: "px-2.5 py-1.5", text: "text-sm leading-5" }, // 14/20 → 32px
  sm: { padding: "px-3 py-2", text: "text-sm leading-5" }, // 14/20 → 36px
  md: { padding: "px-3.5 py-2.5", text: "text-sm leading-5" }, // 14/20 → 40px
  lg: { padding: "px-3.5 py-2.5", text: "text-base leading-6" }, // 16/24 → 44px
  xl: { padding: "px-4.5 py-3", text: "text-base leading-6" }, // 16/24 → 48px
};

function isPill(v: ButtonVariant) {
  return v !== "link" && v !== "destructive-link";
}

const textMotionCls: Record<ButtonInteraction, string> = {
  self: "group-hover:-translate-y-full",
  "service-card": "group-hover/service-card:-translate-y-full",
};

const outgoingIconMotionCls: Record<ButtonInteraction, string> = {
  self: "group-hover:translate-x-full",
  "service-card": "group-hover/service-card:translate-x-full",
};

const incomingIconMotionCls: Record<ButtonInteraction, string> = {
  self: "group-hover:translate-x-0",
  "service-card": "group-hover/service-card:translate-x-0",
};

export function ButtonVisual({
  children,
  size = "md",
  showIcon = true,
  interaction = "self",
}: {
  children: ReactNode;
  size?: ButtonSize;
  showIcon?: boolean;
  interaction?: ButtonInteraction;
}) {
  const textHeight = size === "lg" || size === "xl" ? "h-6" : "h-5";
  const leading = size === "lg" || size === "xl" ? "leading-6" : "leading-5";
  const sharedMotion =
    "transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

  return (
    <>
      <span className={`relative flex overflow-hidden ${textHeight}`}>
        <span
          className={`${leading} whitespace-nowrap ${sharedMotion} ${textMotionCls[interaction]}`}
        >
          {children}
        </span>
        <span
          className={`absolute top-full left-0 ${leading} whitespace-nowrap ${sharedMotion} ${textMotionCls[interaction]}`}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {showIcon && (
        <span className="relative inline-flex size-4 shrink-0 items-center overflow-hidden">
          <ArrowRight
            className={`shrink-0 ${sharedMotion} ${outgoingIconMotionCls[interaction]}`}
          />
          <ArrowRight
            className={`absolute inset-0 shrink-0 -translate-x-full ${sharedMotion} ${incomingIconMotionCls[interaction]}`}
          />
        </span>
      )}
    </>
  );
}

export function Button({
  children,
  href: hrefProp,
  variant = "primary",
  size = "md",
  showIcon = true,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const href = LINKS_ENABLED ? hrefProp : undefined
  const pill = isPill(variant);
  const { padding, text } = sizeCls[size];

  const base = [
    "group relative inline-flex items-center gap-1.5 cursor-pointer font-medium",
    "transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    text,
    pill
      ? `rounded-[2px] ${padding} active:scale-[0.98] active:duration-100 motion-reduce:transform-none`
      : "",
    variantCls[variant],
    className,
  ].join(" ");

  const inner = (
    <ButtonVisual size={size} showIcon={showIcon}>
      {children}
    </ButtonVisual>
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

  // Keep the 2px geometry on the shadow-bearing element. A clip-path here
  // would also clip the external portion of the skeuomorphic box shadow.
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
