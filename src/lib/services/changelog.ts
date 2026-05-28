import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { ChangelogEntry } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchChangelogEntries(locale: string = 'en', limit: number = 10, cursor?: string) {
  const cursorFilter = cursor ? `&& publishedAt < $cursor` : ''
  const query = `*[_type == "changelog" && locale == $locale ${cursorFilter}] | order(publishedAt desc) [0...${limit + 1}] {
    _id, _createdAt, _updatedAt, title, slug, description, content,
    author->{ _id, name, slug, image },
    publishedAt, locale
  }`
  const results = await client.fetch(query, { locale, cursor })
  const hasMore = results.length > limit
  const entries = hasMore ? results.slice(0, limit) : results
  const nextCursor = hasMore ? entries[entries.length - 1].publishedAt : null
  return { entries, nextCursor }
}

export async function fetchChangelogBySlug(slug: string, locale: string = 'en'): Promise<ChangelogEntry | null> {
  const query = `*[_type == "changelog" && slug.current == $slug && locale == $locale][0] {
    _id, _createdAt, _updatedAt, title, slug, description, content,
    author->{ _id, name, slug, image },
    publishedAt, locale
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchChangelogTranslations(slug: string) {
  const query = `*[_type == "changelog" && slug.current == $slug]{ _id, locale, title, slug }`
  return client.fetch(query, { slug })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
