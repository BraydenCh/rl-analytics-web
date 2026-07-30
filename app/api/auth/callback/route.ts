import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/?error=missing_session', request.url));
  }

  const response = NextResponse.redirect(new URL('/', request.url));

  response.cookies.set('epic_session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week — match whatever your FastAPI session expiry is
  });

  return response;
}
