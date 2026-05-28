import type { ProgrammaticPage, LandingPage } from '@/types/sanity'

export function parseJsonData(jsonCode: string): Record<string, Record<string, string>> {
  try {
    return JSON.parse(jsonCode)
  } catch {
    return {}
  }
}

export function interpolateString(template: string, jsonData: Record<string, Record<string, string>>, key: string): string {
  return template.replace(/\{([\w-]+)\}/g, (match, variableName) => {
    const value = jsonData[variableName]?.[key]
    return value !== undefined ? value : match
  })
}

function interpolateContent<T>(content: T, jsonData: Record<string, Record<string, string>>, key: string): T {
  if (typeof content === 'string') return interpolateString(content, jsonData, key) as T
  if (Array.isArray(content)) return content.map(item => interpolateContent(item, jsonData, key)) as T
  if (content && typeof content === 'object') {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(content)) {
      result[k] = interpolateContent(v, jsonData, key)
    }
    return result as T
  }
  return content
}

export function interpolateProgrammaticPage(page: ProgrammaticPage, key: string): LandingPage {
  const jsonData = parseJsonData(page.json.code)
  return {
    _id: page._id,
    _type: 'landingPage',
    _createdAt: page._createdAt,
    _updatedAt: page._updatedAt,
    title: interpolateString(page.title, jsonData, key),
    slug: {
      _type: 'slug',
      current: `${page.group}/${page.slug.current.replace(/\{key\}/g, key)}`,
    },
    meta: page.meta ? interpolateContent(page.meta, jsonData, key) : undefined,
    hero: interpolateContent(page.hero, jsonData, key),
    content: interpolateContent(page.content, jsonData, key),
    faqs: interpolateContent(page.faqs, jsonData, key),
    sections: page.sections,
    footerType: page.footerType,
    publishedAt: page.publishedAt,
    isActive: page.isActive,
    footer: false,
    locale: page.locale,
    directive: undefined,
  }
}
