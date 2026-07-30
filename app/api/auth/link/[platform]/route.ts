import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/', _request.url));
  }

  const { platform } = await params;

  // Redirect to FastAPI's OAuth initiation, passing the session so FastAPI
  // can associate the callback with the correct user.
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/${platform}`);
  url.searchParams.set('token', session);

  return NextResponse.redirect(url.toString());
}
