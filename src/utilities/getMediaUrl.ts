import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (url.includes('rsvaoleivebajgsczjre.storage.supabase.co')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  const baseUrl = 'https://rsvaoleivebajgsczjre.supabase.co/storage/v1/object/public/media'
  const normalizedUrl = url.replace(/^.*\/api\/media\/file/, '')
  return cacheTag ? `${baseUrl}${normalizedUrl}?${cacheTag}` : `${baseUrl}${normalizedUrl}`
}
