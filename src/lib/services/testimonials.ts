import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { TestimonialDocument } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchTestimonials(locale: string = 'en'): Promise<TestimonialDocument[]> {
  const query = `*[_type == "testimonial" && locale == $locale && isActive == true] | order(order asc) {
    _id, _type, slug, quote, author, role, company, link, avatar, order, isActive, locale
  }`
  return client.fetch(query, { locale })
}
