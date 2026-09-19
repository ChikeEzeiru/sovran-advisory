'use client'

import {useEffect, useId, useRef, useState} from 'react'
import {Clock, CurrencyDollarCircle, MarkerPin01, XClose} from '@untitledui/icons'
import {BadgeWithFlag} from '@/components/base/badges/badges'
import type {FlagTypes} from '@/components/base/badges/badge-types'
import {Button, ButtonVisual} from '@/components/ui/Button'
import type {CareerRole} from '@/lib/career-roles'

export function CareerRoleCard({role}: {role: CareerRole}) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen || dialog.open) return

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
  }, [isOpen])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-label={`View details for ${role.title}`}
        onClick={() => setIsOpen(true)}
        className="group min-h-42 w-full cursor-pointer rounded-xs border border-border-secondary bg-bg-primary p-6 text-left transition-[border-color,background-color] duration-200 hover:border-border-primary hover:bg-bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring max-md:min-h-0 max-md:p-4"
      >
        <span className="flex min-h-30 flex-col max-md:min-h-0">
          <span className="flex items-start justify-between gap-5 max-md:gap-3">
            <span className="min-w-0 text-base font-semibold leading-6 text-text-primary">
              {role.title}
            </span>
            <BadgeWithFlag
              type="color"
              size="md"
              color="gray"
              flag={role.countryCode.toUpperCase() as FlagTypes}
              className="shrink-0 rounded-xs"
            >
              {role.location}
            </BadgeWithFlag>
          </span>

          <span className="mt-2 max-w-182.5 text-base leading-6 text-text-tertiary max-md:text-sm max-md:leading-5">
            {role.summary}
          </span>

          <span className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 text-sm font-semibold leading-5 text-text-tertiary max-md:justify-between max-md:gap-x-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-5" />
              {role.employmentType}
            </span>
            {role.compensation && (
              <span className="inline-flex items-center gap-1.5">
                <CurrencyDollarCircle aria-hidden="true" className="size-5" />
                {role.compensation}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-text-brand-tertiary">
              <ButtonVisual size="xs">View role details</ButtonVisual>
            </span>
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => {
          setIsOpen(false)
          triggerRef.current?.focus()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
        className="m-auto max-h-[calc(100svh-3rem)] w-[min(calc(100%-3rem),64rem)] overflow-y-auto rounded-xs bg-bg-primary p-0 text-text-primary shadow-2xl backdrop:bg-black/55 max-md:m-0 max-md:h-svh max-md:max-h-none max-md:w-full max-md:rounded-none"
      >
        <div className="flex flex-col gap-8 px-8 py-16 max-md:px-4 max-md:py-12">
          <div className="flex items-start justify-between gap-6 max-md:px-4">
            <div className="flex min-w-0 max-w-3xl flex-col gap-2">
              <h2
                id={titleId}
                className="text-4xl font-medium leading-11 tracking-tight text-text-primary max-md:text-3xl max-md:leading-9"
              >
                {role.title}
              </h2>
              <p className="text-lg leading-7 text-text-tertiary">{role.department}</p>
            </div>

            <button
              type="button"
              autoFocus
              onClick={closeDialog}
              aria-label="Close role details"
              className="group flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xs bg-bg-primary text-fg-secondary shadow-xs transition-[transform,background-color] duration-150 hover:bg-bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring motion-reduce:transform-none"
            >
              <XClose aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-[14rem_minmax(0,1fr)] items-start gap-10 border-t border-border-secondary pt-8 max-lg:grid-cols-1 max-lg:gap-8">
            <aside className="flex flex-col gap-6">
              <BadgeWithFlag
                type="color"
                size="md"
                color="gray"
                flag={role.countryCode.toUpperCase() as FlagTypes}
                className="self-start rounded-xs"
              >
                {role.location}
              </BadgeWithFlag>

              <dl className="flex flex-col gap-4 text-sm leading-5">
                <div className="flex items-start gap-2">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                  <div>
                    <dt className="font-medium text-text-primary">Employment</dt>
                    <dd className="mt-0.5 text-text-tertiary">{role.employmentType}</dd>
                  </div>
                </div>
                {role.compensation && (
                  <div className="flex items-start gap-2">
                    <CurrencyDollarCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                    <div>
                      <dt className="font-medium text-text-primary">Compensation</dt>
                      <dd className="mt-0.5 text-text-tertiary">{role.compensation}</dd>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <MarkerPin01 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                  <div>
                    <dt className="font-medium text-text-primary">Location</dt>
                    <dd className="mt-0.5 text-text-tertiary">{role.location}</dd>
                  </div>
                </div>
              </dl>

              <Button href={role.detailsUrl ?? '/contact'} variant="primary" size="md">
                Apply for this role
              </Button>
            </aside>

            <div id={descriptionId} className="flex min-w-0 flex-col gap-8">
              <section>
                <h3 className="text-xl font-semibold leading-7.5 text-text-primary">About the role</h3>
                <div className="mt-3 flex flex-col gap-4 text-base leading-6 text-text-tertiary">
                  {role.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {role.responsibilities.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold leading-7.5 text-text-primary">What you will do</h3>
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-base leading-6 text-text-tertiary marker:text-fg-brand-primary">
                    {role.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </section>
              )}

              {role.requirements.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold leading-7.5 text-text-primary">What we are looking for</h3>
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-base leading-6 text-text-tertiary marker:text-fg-brand-primary">
                    {role.requirements.map((requirement) => (
                      <li key={requirement}>{requirement}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
