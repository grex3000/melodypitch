import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs/middleware'
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

  // Validate Supabase session
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
