import { client as defaultClient, draftClient } from '@/sanity/lib/client'
import type { Post, PostPreview } from '@/types/sanity'
import type { SanityClient } from 'next-sanity'

const isPreview = process.env.VERCEL_ENV !== 'production' && !!process.env.SANITY_API_TOKEN
const client: SanityClient = isPreview ? draftClient : defaultClient

export async function fetchBlogPosts(locale: string = 'en', limit?: number): Promise<PostPreview[]> {
  const query = `*[_type == "post" && locale == $locale && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id, title, slug, excerpt, image, publishedAt, tags,
    author->{ name, image, slug }
  }`
  return client.fetch(query, { locale })
}

export async function fetchPaginatedPosts(locale: string = 'en', page: number = 1, pageSize: number = 12, term?: string) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const filter = term ? `&& (title match $term || excerpt match $term || $term in tags[])` : ''
  const params = { locale, start, end, ...(term ? { term: `*${term}*` } : {}) }
  const [posts, total] = await Promise.all([
    client.fetch(
      `*[_type == "post" && locale == $locale && defined(publishedAt) && publishedAt <= now() ${filter}] | order(publishedAt desc) [$start...$end] {
        _id, title, slug, excerpt, image, publishedAt, tags,
        author->{ name, image, slug }
      }`,
      params
    ),
    client.fetch(
      `count(*[_type == "post" && locale == $locale && defined(publishedAt) && publishedAt <= now() ${filter}])`,
      params
    ),
  ])
  return { posts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

export async function fetchPostBySlug(slug: string, locale: string = 'en'): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
    _id, _createdAt, _updatedAt, title, slug, excerpt, tags, content, image, publishedAt, locale,
    author->{ _id, name, image, bio, slug },
    faqs
  }`
  return client.fetch(query, { slug, locale })
}

export async function fetchRelatedPosts(postId: string, tags: string[], locale: string = 'en', limit: number = 6): Promise<PostPreview[]> {
  if (!tags || tags.length === 0) return []
  const query = `*[_type == "post" && _id != $postId && locale == $locale && defined(publishedAt) && publishedAt <= now() && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc) [0...${limit}] {
    _id, title, slug, excerpt, image, publishedAt, tags,
    author->{ name, image, slug }
  }`
  return client.fetch(query, { postId, tags, locale })
}

export async function fetchPostsByAuthor(authorSlug: string, locale: string = 'en', limit?: number): Promise<PostPreview[]> {
  const query = `*[_type == "post" && author->slug.current == $authorSlug && locale == $locale && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id, title, slug, excerpt, image, publishedAt, tags,
    author->{ name, image, slug }
  }`
  return client.fetch(query, { authorSlug, locale })
}

export async function fetchAllTags(locale: string = 'en'): Promise<string[]> {
  const query = `array::unique(*[_type == "post" && locale == $locale && defined(publishedAt) && publishedAt <= now()].tags[])`
  return client.fetch(query, { locale: 'en' })
}

export function calculateReadTime(content: any[]): number {
  if (!content || !Array.isArray(content)) return 1
  const WORDS_PER_MINUTE = 200
  const wordCount = content
    .filter((block) => block._type === 'block')
    .reduce((count, block) => {
      const text = block.children?.map((child: any) => child.text || '').join(' ') || ''
      return count + text.trim().split(/\s+/).filter(Boolean).length
    }, 0)
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export async function findSimilarSlug(slug: string, locale: string = 'en'): Promise<string | null> {
  if (slug.length < 3 || slug.includes('/')) return null
  const query = `*[_type == "post" && locale == $locale] | score(
    boost(string::startsWith(slug.current, $baseSlug), 5),
    boost(title match $searchTerm + "*", 2),
    boost(slug.current match $searchTerm + "*", 1)
  ) | order(_score desc) [0] { "slug": slug.current, _score }`
  const baseSlug = slug.replace(/-in-\d{4}$/, '')
  const searchTerm = slug.replace(/-/g, ' ')
  const result = await client.fetch(query, { locale, searchTerm, baseSlug })
  return result?._score > 0 ? result.slug : null
}
