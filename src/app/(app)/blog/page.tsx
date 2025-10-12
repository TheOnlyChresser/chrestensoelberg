import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="bg-gradient-to-tr from-white via-blue-50 to-green-50  dark:from-black dark:via-[#050A1F] dark:to-[#041F12] flex-center w-full">
    <div className="min-h-screen w-full mb-20 md:mb-4">
      <PageClient />
      <div className="mt-10 mb-10 flex-center text-8xl text-gradient font-bold h-30">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog</h1>
        </div>
      </div>


      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Chrestens blog`,
  }
}
