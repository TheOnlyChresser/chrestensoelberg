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
    <div className="print:hidden relative min-h-screen -mt-[8.4rem] pt-[8.4rem] flex justify-center items-center">
      <div className="z-10 relative min-w-[60vw] max-w-[75vw] lg:flex lg:min-w-[10vw] lg:max-w-[75vw] lg:justify-center text-black/85 dark:text-white/85 pb-25">
        <div className="glass-box z-10 px-5 lg:px-20 col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-3 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold md:font-semibold line-clamp-3 md:line-clamp-2 p-1">{title}</h1>
          </div>
          <div className="uppercase text-sm mt-4 flex items-center italic">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'

                  return (
                      <span
                          key={index}
                          className="bg-blue-500/10 dark:text-white/80 dark:bg-blue-400/20 group-hover:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-3 py-1 text-xs uppercase italic"
                      >
                        {categoryTitle}
                      </span>
                  )}
                return null
              })}
            </div>
          </div>
          <div className="flex flex-row gap-4 md:gap-16">
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
        <Image alt="gradient" fill priority={true} className="object-cover dark:hidden" src="/gradient.avif" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950"></div>
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-white/100 dark:from-gray-950/100 to-transparent" />
      </div>
    </div>
  )
}
