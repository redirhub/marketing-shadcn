import { API_BASE } from '@/config/constant'

export interface Plan {
  id: string
  label?: string
  product: string
  level: number
  price?: number
  annual_coefficient?: number
  annual_price?: number
  currency?: string
  free?: boolean
  popular?: boolean
  badge?: string
  limits?: Array<{ id?: string; label?: string; limit?: number; primary?: boolean; tooltip?: string }>
  features: Array<{ id?: string; label: string; tooltip?: string; isHighlighted?: boolean; included?: boolean }>
  addons?: Array<{ id?: string; code: string; type?: string; price?: number; annual_price?: number; icon?: string; limits?: Record<string, any> }>
}

export interface PlanData {
  plans: Plan[]
  comparison: any[]
}

export async function fetchPricingPlans(product: string, locale: string = 'en', revalidate: number = 3600): Promise<PlanData> {
  const url = `${API_BASE}/public/plan/${product}`
  try {
    const response = await fetch(url, {
      headers: { 'Accept-Language': locale },
      next: { revalidate },
    })
    if (!response.ok) throw new Error(`Failed to fetch pricing plans: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
    return { plans: [], comparison: [] }
  }
}

export async function fetchPricingAddons(locale: string = 'en'): Promise<any[]> {
  const url = `${API_BASE}/public/plan/addons`
  try {
    const response = await fetch(url, {
      headers: { 'Accept-Language': locale },
      next: { revalidate: 3600 },
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.data || []
  } catch {
    return []
  }
}
