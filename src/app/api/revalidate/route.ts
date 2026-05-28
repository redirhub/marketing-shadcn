import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for on-demand revalidation
 *
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET
 * Body: { path?: string, tag?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { path, tag } = body;

    if (path) {
      revalidatePath(path, 'page');
      return NextResponse.json({
        revalidated: true,
        type: 'path',
        path,
        now: Date.now(),
      });
    }

    if (tag) {
      revalidateTag(tag, 'page');
      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        tag,
        now: Date.now(),
      });
    }

    return NextResponse.json(
      { message: 'Missing path or tag parameter' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
