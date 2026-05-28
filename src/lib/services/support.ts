import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { SupportArticle } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchSupportArticles(locale: string = 'en') {
  const query = `*[_type == "support" && locale == $locale] | order(publishedAt desc) {
    _id, title, slug, tags, publishedAt, locale
  }`
  return client.fetch(query, { locale })
}

export async function fetchSupportArticleBySlug(slug: string, locale: string = 'en'): Promise<SupportArticle | null> {
  const query = `*[_type == "support" && slug.current == $slug && locale == $locale][0] {
    _id, _createdAt, _updatedAt, title, slug, content, tags, publishedAt, locale
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchSupportArticlesByTag(tag: string, locale: string = 'en') {
  const query = `*[_type == "support" && locale == $locale && count(tags[lower(@) == lower($tag)]) > 0] | order(publishedAt desc) {
    _id, title, slug, tags, publishedAt, locale
  }`
  return client.fetch(query, { tag, locale } as Record<string, any>)
}

export async function fetchSupportArticleTranslations(slug: string) {
  const query = `*[_type == "support" && slug.current == $slug]{ _id, locale, title, slug }`
  return client.fetch(query, { slug })
}

export async function fetchAllSupportTags(locale: string = 'en'): Promise<string[]> {
  const query = `array::unique(*[_type == "support" && locale == $locale].tags[])`
  return client.fetch(query, { locale })
}
