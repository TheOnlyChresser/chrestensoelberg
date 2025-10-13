'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/noter/${slug}`

  return (
    <article
      className={cn(
        'group glass-box hover:cursor-pointer hover:bg-black/30 hover:border-black/80 hover:text-white active:bg-black/30 active:border-black/80 active:text-white overflow-hidden transition hover:scale-95',
        className,
      )}
      ref={card.ref}
    >
      <div className="p-4">
        {titleToUse && (
          <div className="prose font-bold">
            <h3>
              <Link className="not-prose text-black group-hover:text-white" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {showCategories && hasCategories && (
            <div className="uppercase text-sm mt-4 flex items-center italic">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'

                    return (
                        <span
                            key={index}
                            className="bg-blue-500/10 group-hover:bg-white/10 border border-black/20 rounded-full px-3 py-1 text-xs uppercase italic"
                        >
                        {categoryTitle}
                      </span>
                    )}
                  return null
                })}
              </div>
            </div>
        )}
        {description && <div className="mt-1">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
