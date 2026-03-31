import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];

// Portal submission pages are public (songwriters don't need an account to submit)
const PORTAL_PATH_PATTERN = /^\/p\//;

function isPublic(pathname: string): boolean {
  if (PORTAL_PATH_PATTERN.test(pathname)) return true;
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

const ROLE_PREFIXES: Record<string, string> = {
  LABEL: "/label",
  SONGWRITER: "/songwriter",
  ARTIST: "/artist",
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string | undefined;
  const allowedPrefix = role ? ROLE_PREFIXES[role] : undefined;

  // If user is on the root or wrong role prefix, redirect to their dashboard
  if (allowedPrefix && (pathname === "/" || !pathname.startsWith(allowedPrefix))) {
    return NextResponse.redirect(new URL(`${allowedPrefix}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
