import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from './image'

/**
 * Safe wrapper around urlFor() that always returns a string.
 * Falls back to default placeholder if image is missing, malformed, or throws.
 */
export function safeUrlFor(
  source: SanityImageSource | null | undefined,
  options: { width?: number; height?: number; fallback?: string } = {}
): string {
  const { width = 800, height = 450, fallback = '/assets/images/default.png' } = options

  if (!source) return fallback

  try {
    const url = urlFor(source).width(width).height(height).url()
    if (typeof url === 'string' && url.length > 0) return url
    return fallback
  } catch {
    return fallback
  }
}
