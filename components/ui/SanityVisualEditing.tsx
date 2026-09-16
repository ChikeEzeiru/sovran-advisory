'use client'

import {usePathname} from 'next/navigation'
import {VisualEditing} from 'next-sanity/visual-editing'

export function SanityVisualEditing() {
  const pathname = usePathname()

  // The Studio is embedded in this app. Keep its own interface free of
  // frontend editing overlays when the draft-mode cookie is active.
  if (pathname.startsWith('/studio')) return null

  return <VisualEditing />
}
