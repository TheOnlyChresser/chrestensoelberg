import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'
import Image from 'next/image'
import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[8.4rem] flex justify-center items-end">
      <div className="z-10 relative min-w-[50vw] max-w-[75vw] lg:flex lg:min-w-[10vw] lg:max-w-[75vw] lg:justify-center text-black/85 pb-25">
        <div className="glass-box z-10 px-5 lg:px-20 col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-3 md:mb-6 italic">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-3 md:mb-6 text-2xl md:text-3xl lg:text-5xl font-bold md:font-semibold">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:gap-1">
                  <p className="text-sm">Lavet af</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col md:gap-1">
                <p className="text-sm">Udgivet</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
          {/*{heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}*/}
        <Image alt="gradient" fill priority={true} className="-z-10 object-cover" src="/gradient.avif" />
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-white/100 to-transparent" />
      </div>
    </div>
  )
}
