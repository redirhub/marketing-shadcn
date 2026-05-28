export interface SanityImageAsset {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Author {
  _id: string
  name: string
  slug: { _type: 'slug'; current: string }
  image?: SanityImageAsset
  bio?: string
  title?: string
}

export interface FAQItem {
  _key?: string
  question: string
  answer: string
}

export interface FAQSet {
  _id: string
  pageSlug: string
  title?: string
  faqs: FAQItem[]
  locale: string
}

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

export interface PortableTextBlock {
  _key: string
  _type: 'block'
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: PortableTextSpan[]
  markDefs?: Array<{ _key: string; _type: string; [key: string]: unknown }>
  level?: number
  listItem?: 'bullet' | 'number'
}

export interface FeatureBlock {
  _type: 'feature'
  _key: string
  mainTitle: string
  subTitle?: string
  reverseOrder?: boolean
  image?: SanityImageAsset
  features?: string[]
}

export type PortableTextContent = Array<PortableTextBlock | SanityImageAsset | FeatureBlock>

export interface Post {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  excerpt?: string
  tags?: string[]
  content?: PortableTextContent
  image?: SanityImageAsset
  publishedAt: string
  locale: string
  author?: Author
  faqs?: FAQItem[]
}

export interface PostPreview {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  image?: SanityImageAsset
  publishedAt: string
  tags?: string[]
  author?: { name: string; image?: SanityImageAsset; slug: { current: string } }
}

export interface SupportArticle {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  content?: PortableTextContent
  tags?: string[]
  publishedAt: string
  locale: string
}

export interface LegalDocument {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  content?: PortableTextContent
  publishedAt: string
  locale: string
  footer?: boolean
}

export interface ChangelogEntry {
  _id: string
  title: string
  slug: { _type: 'slug'; current: string }
  description: string
  content?: PortableTextContent
  author?: Author
  publishedAt: string
  locale: string
}

export interface TestimonialDocument {
  _id: string
  _type: 'testimonial'
  slug?: { _type: 'slug'; current: string }
  quote: string
  author: string
  role?: string
  company?: string
  link?: string
  avatar?: SanityImageAsset
  order: number
  isActive: boolean
  locale: string
}

export interface Translation {
  _id: string
  locale: string
  title: string
  slug: { current: string }
}

export interface LandingPageMeta {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImageAsset
}

export interface CTAButton {
  label?: string
  url?: string
}

export interface HeroSection {
  headline: string
  subheadline?: string
  badge?: string
  ctaPrimary?: CTAButton
  ctaNote?: string
  heroImage?: SanityImageAsset & { dimensions?: { aspectRatio: number } }
  heroSections?: Array<'redirect' | 'customerLogos'>
  widget?: 'all' | 'redirect' | 'shorten' | 'check' | 'disable'
  bannerStyle?: 'default' | 'purple' | 'teal' | 'dark'
}

export interface LandingPage {
  _id: string
  _type: 'landingPage'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: { _type: 'slug'; current: string }
  meta?: LandingPageMeta
  hero: HeroSection
  content: PortableTextContent
  faqs: FAQItem[]
  sections?: Array<'contentTable' | 'testimonials' | 'blogInsight'>
  footerType: 'default' | 'with-widgets'
  publishedAt: string
  directive?: string
  isActive: boolean
  footer: boolean
  locale: string
}

export interface ProgrammaticPage {
  _id: string
  _type: 'programmaticPage'
  _createdAt?: string
  _updatedAt?: string
  group: string
  slug: { _type: 'slug'; current: string }
  keys: string[]
  json: { code: string }
  title: string
  meta?: LandingPageMeta
  hero: HeroSection
  content: PortableTextContent
  faqs: FAQItem[]
  sections?: Array<'contentTable' | 'testimonials' | 'blogInsight'>
  footerType: 'default' | 'with-widgets'
  publishedAt: string
  isActive: boolean
  locale: string
}
