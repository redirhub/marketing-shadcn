/**
 * Sanity Query API Endpoint
 *
 * Executes GROQ queries against Sanity CMS.
 *
 * Parameters:
 * - query: GROQ query string (required)
 * - slug: Optional slug parameter for the query
 * - fresh: If "true", bypasses CDN cache
 */

import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/sanity/lib/client'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    const slug = searchParams.get('slug')
    const fresh = searchParams.get('fresh') === 'true'

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const sanityClient = fresh ? writeClient : client

    const result = await sanityClient.fetch(query, { slug })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Sanity query error:', error)
    return NextResponse.json(
      {
        error: 'Query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
