import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

// import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: any | string | number
  } | null
  size?: 'default' | 'sm' | 'lg' | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    label,
    newTab,
    reference,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  // const size = appearance === 'inline' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn("dark:text-white text-black font-semibold cursor-pointer text-nowrap md:text-base text-sm hover:text-red-500 hover:underline hover:decoration-[3px] hover:underline-offset-[6px]")} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
      <Link className={cn("dark:text-white text-black font-semibold cursor-pointer text-nowrap md:text-base text-sm hover:text-red-500 hover:underline hover:decoration-[3px] hover:underline-offset-[6px]")} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
  )
}
