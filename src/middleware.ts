import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas públicas que NÃO precisam de login
const PUBLIC_PATHS = [
  '/',
  '/auth/login',
  '/auth/cadastro',
  '/auth/esqueci-senha',
];

// Prefixos sempre públicos
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
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sempre permitir prefixos públicos
  if (PUBLIC_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Sempre permitir rotas públicas
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar cookie de autenticação
  const token = request.cookies.get('ssb_token')?.value;
  const usuario = request.cookies.get('ssb_usuario')?.value;

  if (!token || !usuario) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|icon|manifest|sw\\.js|offline\\.html|cross\\.svg).*)',
  ],
};
