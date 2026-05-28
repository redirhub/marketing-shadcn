import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { FAQSet } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchFAQSetByPage(pageSlug: string, locale: string = 'en'): Promise<FAQSet | null> {
  const query = `*[_type == "faqSet" && pageSlug == $pageSlug && locale == $locale][0] {
    _id, pageSlug, title, faqs[]{ _key, question, answer }, locale
  }`
  return client.fetch(query, { pageSlug, locale })
}
