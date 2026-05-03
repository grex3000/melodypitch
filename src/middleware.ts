import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths that don't require authentication
const PUBLIC_PATHS = ['/', '/login', '/register', '/api/upload']
const PORTAL_PATH_PATTERN = /^\/p\//;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths without authentication
  if (
    PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/')) ||
    PORTAL_PATH_PATTERN.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Protected app routes: /label/*, /songwriter/*, /artist/*
  const protectedRoutes = ['/label', '/songwriter', '/artist'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for Supabase session cookie
    const hasSession = req.cookies.has('sb-access-token') || req.cookies.has('sb-refresh-token');
    
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
