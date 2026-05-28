import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { ProgrammaticPage, Translation } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchProgrammaticPages(locale: string = 'en') {
  const query = `*[_type == "programmaticPage" && locale == $locale && isActive == true] | order(publishedAt desc) {
    _id, title, slug, group, keys, publishedAt, locale
  }`
  return client.fetch(query, { locale })
}

export async function matchProgrammaticPage(
  path: string,
  locale: string = 'en'
): Promise<{ page: ProgrammaticPage; key: string } | null> {
  const segments = path.split('/').filter(Boolean)
  if (segments.length !== 2) return null

  const [group, fullSlug] = segments
  const lastHyphenIndex = fullSlug.lastIndexOf('-')
  if (lastHyphenIndex === -1) return null

  const firstHyphenIndex = fullSlug.indexOf('-')
  const candidates = [
    {
      key: fullSlug.substring(lastHyphenIndex + 1),
      slugTemplate: fullSlug.substring(0, lastHyphenIndex + 1) + '{key}',
    },
    {
      key: fullSlug.substring(0, firstHyphenIndex),
      slugTemplate: '{key}' + fullSlug.substring(firstHyphenIndex),
    },
  ]

  const query = `*[
    _type == "programmaticPage" &&
    group == $group &&
    slug.current == $slugTemplate &&
    locale == $locale
  ][0] {
    _id, _createdAt, _updatedAt, title, slug, group, keys, json, meta, hero, content, faqs, sections, footerType, publishedAt, locale
  }`

  for (const { key, slugTemplate } of candidates) {
    const page = await client.fetch<ProgrammaticPage | null>(query, { group, slugTemplate, locale })
    if (page && page.keys.includes(key)) {
      return { page, key }
    }
  }

  return null
}

export async function fetchProgrammaticPageTranslations(group: string, slugTemplate: string): Promise<Translation[]> {
  const query = `*[_type == "programmaticPage" && group == $group && slug.current == $slugTemplate && isActive == true] {
    _id, locale, title, slug
  }`
  return client.fetch(query, { group, slugTemplate })
}

export async function fetchProgrammaticPagesByGroup(group: string, locale: string = 'en'): Promise<ProgrammaticPage[]> {
  const query = `*[_type == "programmaticPage" && group == $group && locale == $locale && onList == true] | order(publishedAt desc) {
    _id, title, slug, group, keys, json
  }`
  return client.fetch(query, { group, locale })
}
