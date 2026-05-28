import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { LegalDocument } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchLegalDocuments(locale: string = 'en') {
  const query = `*[_type == "legal" && locale == $locale] | order(title asc) {
    _id, title, slug, publishedAt, locale, footer
  }`
  return client.fetch(query, { locale })
}

export async function fetchLegalDocumentBySlug(slug: string, locale: string = 'en'): Promise<LegalDocument | null> {
  const query = `*[_type == "legal" && slug.current == $slug && locale == $locale][0] {
    _id, _createdAt, _updatedAt, title, slug, content, publishedAt, locale, footer
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchLegalDocumentTranslations(slug: string) {
  const query = `*[_type == "legal" && slug.current == $slug]{ _id, locale, title, slug, footer }`
  return client.fetch(query, { slug })
}
