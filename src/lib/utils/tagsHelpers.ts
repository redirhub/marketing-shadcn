export function denormalizeTag(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ')
}

export function normalizeTag(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))
}

export function formatTagForDisplay(tag: string): string {
  if (/[^\x00-\x7F]/.test(tag)) return tag
  return tag.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function ucfirst(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
