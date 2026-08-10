import Link from "next/link"
import { forwardRef } from "react"
import type { ComponentProps, Ref } from "react"
import { LINKS_ENABLED } from "@/lib/links"

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
}

export const ConditionalLink = forwardRef<HTMLElement, Props>(function ConditionalLink(
  { href, children, className, style, onMouseEnter, ...rest },
  ref
) {
  if (LINKS_ENABLED) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        ref={ref as Ref<HTMLAnchorElement>}
        {...rest}
      >
        {children}
      </Link>
    )
  }
  return (
    <span
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      ref={ref as Ref<HTMLSpanElement>}
    >
      {children}
    </span>
  )
})
