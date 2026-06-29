import { NextResponse } from 'next/server'
// 1. Import the NextRequest type
import type { NextRequest } from 'next/server' 

// 2. Add the type annotation to the request parameter
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has('epic_session')
  const { pathname } = request.nextUrl

  const isProtectedRoute = pathname.startsWith('/profile') || pathname.startsWith('/upload')

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/upload_replay/:path*'],
}