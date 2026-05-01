import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/login', '/register', '/api/auth']
const PORTAL_PATH_PATTERN = /^\/p\//;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths don't need auth
  if (
    PUBLIC_PATHS.some(p => pathname.startsWith(p)) ||
    PORTAL_PATH_PATTERN.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check for Supabase session cookie (simplified check)
  const hasSession = req.cookies.has('sb-access-token') || req.cookies.has('sb-refresh-token');
  
  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
