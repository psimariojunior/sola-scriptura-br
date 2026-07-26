import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PREFIXES = [
  '/api/',
  '/_next/',
  '/favicon',
  '/icon',
  '/manifest',
  '/sw.js',
  '/offline',
  '/screenshots/',
  '/patterns/',
  '/sounds/',
  '/audio/',
  '/estudos/',
  '/ferramentas/',
];

const PROTECTED_PREFIXES = [
  '/admin',
  '/conta',
];

function getTokenFromRequest(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('ssb_token')?.value;
  if (cookieToken) return cookieToken;

  const urlToken = request.nextUrl.searchParams.get('token');
  if (urlToken) return urlToken;

  const authHeader = request.headers.get('x-ssb-token');
  if (authHeader) return authHeader;

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    const token = getTokenFromRequest(request);
    if (!token) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/conta/:path*',
  ],
};
