import { APP_URL, URL_OG_IMAGE } from '@/config/constant'
import type { FAQItem } from '@/types/sanity'

export function buildCanonicalUrl(locale: string, path: string): string {
  if (locale === 'en') return `${APP_URL}${path}`
  return `${APP_URL}/${locale}${path}`
}

export function localeUrl(locale: string, path: string): string {
  if (locale === 'en') return path
  try {
    const url = new URL(path)
    url.pathname = `/${locale}${url.pathname}`
    return url.toString()
  } catch {
    return `/${locale}${path}`
  }
}

export function buildHreflangAlternates(
  translations: Array<{ locale: string; slug: { current: string } }>,
  basePath: string
) {
  const languages: Record<string, string> = {}
  translations.forEach((t) => {
    const path = `${basePath}/${t.slug.current}`
    if (t.locale === 'en') {
      languages['en'] = `${APP_URL}${path}`
      languages['x-default'] = `${APP_URL}${path}`
    } else {
      languages[t.locale] = `${APP_URL}/${t.locale}${path}`
    }
  })
  return { languages }
}

export function buildStaticHreflangAlternates(locales: string[], basePath: string) {
  const languages: Record<string, string> = {}
  locales.forEach((locale) => {
    if (locale === 'en') {
      languages['en'] = basePath
      languages['x-default'] = `${APP_URL}${basePath}`
    } else {
      languages[locale] = `${APP_URL}/${locale}${basePath}`
    }
  })
  return { languages }
}

export function generateFAQSchema(faqs: FAQItem[] | undefined | null) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function parseRedirect(directive: string | undefined | null): {
  statusCode: '301' | '302'
  targetPath: string
} | null {
  if (!directive) return null
  const redirectMatch = directive.match(/redirect\s+(301|302)?\s*(.+)/i)
  if (!redirectMatch) return null
  const statusCode = (redirectMatch[1] as '301' | '302') || '302'
  const targetPath = redirectMatch[2].trim()
  return { statusCode, targetPath }
}

export interface SocialCardOptions {
  title: string
  description?: string
  image?: string
  type?: 'article' | 'website'
  publishedTime?: string
  authors?: string[]
}

export function buildSocialCards(options: SocialCardOptions) {
  const { title, description, image = URL_OG_IMAGE, type = 'website', publishedTime, authors } = options
  return {
    openGraph: {
      title,
      description: description || undefined,
      type,
      publishedTime: publishedTime || undefined,
      authors: authors || undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description: description || undefined,
      images: image ? [image] : undefined,
    },
  }
}
