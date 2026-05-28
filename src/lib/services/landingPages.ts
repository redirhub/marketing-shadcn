import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { LandingPage } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchLandingPages(locale: string = 'en') {
  const query = `*[_type == "landingPage" && locale == $locale && isActive == true] | order(publishedAt desc) {
    _id, title, slug, publishedAt, locale
  }`
  return client.fetch(query, { locale })
}

export async function fetchLandingPageBySlug(slug: string, locale: string = 'en'): Promise<LandingPage | null> {
  const query = `*[_type == "landingPage" && slug.current == $slug && locale == $locale][0] {
    _id, _createdAt, _updatedAt, title, slug, meta,
    hero { ..., heroImage { ..., "dimensions": asset->metadata.dimensions } },
    content, faqs, sections, footerType, publishedAt, locale, directive
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLandingPageTranslations(slug: string) {
  const query = `*[_type == "landingPage" && slug.current == $slug && isActive == true]{
    _id, locale, title, slug
  }`
  return client.fetch(query, { slug })
}
