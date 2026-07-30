import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/?error=missing_session', request.url));
  }

  const response = NextResponse.redirect(new URL('/', request.url));

  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set('epic_session', session, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
