"use client"

import NextLink from "next/link"
import { LINKS_ENABLED } from "@/lib/links"
import type { ComponentPropsWithoutRef } from "react"

type AnimatedLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string
  external?: boolean
}

export function AnimatedLink({
  href,
  children,
  external,
  className = "",
  ...props
}: AnimatedLinkProps) {
  const base = [
    "group inline-flex items-center cursor-pointer",
    className,
  ].join(" ")

  const inner = (
    <span className="relative overflow-hidden inline-flex h-[1.2em]">
      <span className="leading-[1.2] whitespace-nowrap transition-transform duration-[380ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        className="absolute top-full left-0 leading-[1.2] whitespace-nowrap transition-transform duration-[380ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full motion-reduce:transition-none"
        aria-hidden
      >
        {children}
      </span>
    </span>
  )

  if (!LINKS_ENABLED) {
    return <span className={base} {...props}>{inner}</span>
  }

  if (external) {
    return (
      <a
        href={href}
        className={base}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {inner}
      </a>
    )
  }

  return (
    <NextLink href={href} className={base} {...props}>
      {inner}
    </NextLink>
  )
}
