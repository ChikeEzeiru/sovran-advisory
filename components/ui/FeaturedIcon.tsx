import type {ReactNode} from 'react'

type FeaturedIconProps = {
  children: ReactNode
  surface?: 'primary' | 'secondary'
  tone?: 'default' | 'brand'
  className?: string
}

const SURFACE_CLASSES = {
  primary: 'bg-bg-primary',
  secondary: 'bg-bg-secondary',
} as const

const TONE_CLASSES = {
  default: 'text-fg-secondary',
  brand: 'text-text-brand-tertiary',
} as const

/** Canonical 48px featured-icon treatment used in editorial and supporting cards. */
export function FeaturedIcon({
  children,
  surface = 'primary',
  tone = 'default',
  className = '',
}: FeaturedIconProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex size-12 items-center justify-center rounded-xs border border-border-primary shadow-xs ${SURFACE_CLASSES[surface]} ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </div>
  )
}
