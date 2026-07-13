import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/cadastro',
  '/auth/esqueci-senha',
];

// Static assets and API routes are always public
const PUBLIC_PREFIXES = [
  '/api/',
  '/_next/',
  '/favicon',
  '/icon',
  '/manifest',
  '/sw.js',
  '/offline',
  '/screenshots/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and public prefixes
  if (PUBLIC_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token in cookie (set by client-side auth)
  const token = request.cookies.get('ssb_token')?.value;
  const usuario = request.cookies.get('ssb_usuario')?.value;

  if (!token || !usuario) {
    // Redirect to login with return URL
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon|icon|manifest|sw\\.js|offline\\.html).*)',
  ],
};
