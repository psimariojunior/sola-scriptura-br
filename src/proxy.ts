import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/session';

const PROTECTED_PREFIXES = ['/admin', '/conta'];
const PUBLIC_ASSET_PREFIXES = [
  '/_next/',
  '/favicon',
  '/icon',
  '/manifest',
  '/sw.js',
  '/offline',
  '/screenshots/',
  '/patterns/',
  '/sounds/',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Recursos estaticos nao exigem sessao
  if (PUBLIC_ASSET_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // /admin requer role admin; /conta requer usuario autenticado
  const needsAdmin = pathname.startsWith('/admin');
  const needsAuth = needsAdmin || pathname.startsWith('/conta');

  if (!needsAuth) return NextResponse.next();

  const user = await getUserFromRequest(request);
  if (!user) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Para /admin exige role de admin — confia no email allowlist local
  // (a checagem real de role e feita no server-side do admin).
  if (needsAdmin) {
    const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const isAdmin =
      user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/conta', request.url));
    }
  }

  // Disponibiliza o user para a pagina via header (nao confiar no client)
  const res = NextResponse.next();
  res.headers.set('x-ssb-user-id', user.id);
  if (user.email) res.headers.set('x-ssb-user-email', user.email);
  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/conta/:path*',
  ],
};
