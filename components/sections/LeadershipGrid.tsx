'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import {User01, XClose} from '@untitledui/icons'
import {FeaturedIcon} from '@/components/ui/FeaturedIcon'
import type {Leader} from '@/lib/leadership'

function SocialMarks({leader, interactive = false}: {leader: Leader; interactive?: boolean}) {
  const iconClasses =
    'size-4.5 bg-current mask-center mask-no-repeat mask-contain transition-colors duration-300 motion-reduce:transition-none'

  if (interactive && (leader.xUrl || leader.linkedinUrl)) {
    return (
      <div className="flex shrink-0 items-center gap-4 text-text-quaternary">
        {leader.xUrl && (
          <a
            href={leader.xUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${leader.name} on X`}
            className="transition-colors hover:text-black"
          >
            <span className={`${iconClasses} block mask-[url('/icons/social/x.svg')]`} />
          </a>
        )}
        {leader.linkedinUrl && (
          <a
            href={leader.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="transition-colors hover:text-[#0A66C2]"
          >
            <span className={`${iconClasses} block mask-[url('/icons/social/linkedin.svg')]`} />
          </a>
        )}
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center gap-4 text-text-quaternary transition-transform duration-300 ease-out group-hover/leader:-translate-x-1 motion-reduce:transition-none"
    >
      <span className={`${iconClasses} mask-[url('/icons/social/x.svg')] group-hover/leader:text-black`} />
      <span className={`${iconClasses} mask-[url('/icons/social/linkedin.svg')] group-hover/leader:text-[#0A66C2]`} />
    </div>
  )
}

function LeaderPortrait({leader, modal = false}: {leader: Leader; modal?: boolean}) {
  if (!leader.image) {
    return (
      <div className="grid size-full place-items-center bg-bg-quaternary text-fg-quaternary">
        <FeaturedIcon surface="secondary">
          <User01 aria-hidden="true" className="size-6" />
        </FeaturedIcon>
      </div>
    )
  }

  return (
    <Image
      src={leader.image}
      alt={`Portrait of ${leader.name}`}
      fill
      sizes={modal ? '(min-width: 768px) 380px, calc(100vw - 96px)' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
      className={`object-cover ${leader.imagePosition ?? 'object-center'} ${
        modal
          ? ''
          : 'transition-transform duration-500 ease-out group-hover/leader:scale-105 motion-reduce:transform-none motion-reduce:transition-none'
      }`}
    />
  )
}

export function LeadershipGrid({leaders}: {leaders: Leader[]}) {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !activeLeader || dialog.open) return
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const fixedElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-lock-fixed]'),
    )
    const previousFixedRight = fixedElements.map((element) => element.style.right)

    if (scrollbarWidth > 0) {
      const bodyPaddingRight = Number.parseFloat(
        window.getComputedStyle(document.body).paddingRight,
      )
      document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`
      fixedElements.forEach((element) => {
        element.style.right = `${scrollbarWidth}px`
      })
    }

    document.body.style.overflow = 'hidden'
    dialog.showModal()

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      fixedElements.forEach((element, index) => {
        element.style.right = previousFixedRight[index]
      })
    }
  }, [activeLeader])

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const handleClosed = () => {
    setActiveLeader(null)
    triggerRef.current?.focus()
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-x-6 gap-y-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {leaders.map((leader) => (
          <button
            key={leader.id}
            type="button"
            aria-haspopup="dialog"
            aria-label={`View ${leader.name}’s profile`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget
              setActiveLeader(leader)
            }}
            className="group/leader min-w-0 self-start cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            <div className="relative h-95 overflow-hidden rounded-xs bg-bg-quaternary">
              <LeaderPortrait leader={leader} />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="min-w-0 text-2xl max-md:text-xl max-md:leading-7.5 font-medium leading-8 tracking-tight text-text-secondary">
                  {leader.name}
                </h2>
                <SocialMarks leader={leader} />
              </div>
              <p className="max-w-72 text-lg max-md:text-base max-md:leading-6 leading-7 text-text-secondary">
                {leader.role}
              </p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={activeLeader ? `leader-name-${activeLeader.id}` : undefined}
        aria-describedby={activeLeader ? `leader-bio-${activeLeader.id}` : undefined}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
        className="m-auto max-h-[calc(100svh-3rem)] w-[min(calc(100%-3rem),64rem)] overflow-y-auto rounded-xs bg-bg-primary p-0 text-text-primary shadow-2xl backdrop:bg-black/55 max-md:m-0 max-md:h-svh max-md:max-h-none max-md:w-full max-md:rounded-none"
      >
        {activeLeader && (
          <div className="flex flex-col gap-8 px-8 py-16 max-md:px-4 max-md:py-12">
            <div className="flex items-start justify-between gap-6 max-md:px-4">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                  <h2
                    id={`leader-name-${activeLeader.id}`}
                    className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary "
                  >
                    {activeLeader.name}
                  </h2>
                  <div className="pb-2">
                    <SocialMarks leader={activeLeader} interactive />
                  </div>
                </div>
                <p className="text-lg max-md:text-base max-md:leading-6 leading-7 text-text-tertiary">
                  {activeLeader.role}
                </p>
              </div>

              <button
                type="button"
                autoFocus
                onClick={closeDialog}
                aria-label="Close profile"
                className="group flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xs bg-bg-primary text-fg-secondary shadow-xs transition-[transform,background-color] duration-150 hover:bg-bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring motion-reduce:transform-none"
              >
                <XClose aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-[23.75rem_minmax(0,1fr)] items-start gap-6 max-lg:grid-cols-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-bg-quaternary max-lg:max-w-95 max-md:h-70 max-md:aspect-auto max-md:max-w-none">
                <LeaderPortrait leader={activeLeader} modal />
              </div>
              <div
                id={`leader-bio-${activeLeader.id}`}
                className="flex flex-col gap-4 p-2 text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-secondary max-lg:p-0 max-md:px-2 "
              >
                {activeLeader.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
