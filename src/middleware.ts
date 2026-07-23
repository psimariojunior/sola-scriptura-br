import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/',
  '/auth/login',
  '/auth/cadastro',
  '/auth/callback',
  '/auth/esqueci-senha',
  '/biblia',
  '/teologia',
  '/historia',
  '/personagens',
  '/cronologia',
  '/idiomas',
  '/exegese',
  '/pesquisa',
  '/ferramentas',
  '/literatura',
  '/parabolas',
  '/milagres',
  '/harmonia',
  '/comparar',
  '/topicos',
  '/pericopes',
  '/compartilhar',
  '/estudos',
  '/quiz',
  '/flashcards',
  '/devocional',
  '/planos',
  '/sermoes',
  '/estatisticas',
  '/estudo',
  '/ia',
];

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    const token = request.cookies.get('ssb_token')?.value;
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
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
