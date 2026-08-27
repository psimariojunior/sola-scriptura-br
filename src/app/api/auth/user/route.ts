import { NextRequest, NextResponse } from 'next/server';
import { emailEhAdmin, getUserFromRequest } from '@/lib/session';
import { origemPermitida, headersCorsRestrito } from '@/lib/origemPermitida';

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ usuario: null }, { status: 401, headers: headersCorsRestrito(request) });
  }

  const usuarioCookie = request.cookies.get('ssb_usuario')?.value;
  let usuario: Record<string, unknown> | null = null;
  if (usuarioCookie) {
    try {
      usuario = JSON.parse(decodeURIComponent(usuarioCookie));
    } catch {
      usuario = null;
    }
  }

  const email = user.email || (typeof usuario?.email === 'string' ? usuario.email : '');
  const id = user.id || (typeof usuario?.id === 'string' ? usuario.id : '');
  const nome = typeof usuario?.nome === 'string' ? usuario.nome : email;
  const role = emailEhAdmin(email) ? 'admin' : (usuario?.role === 'admin' ? 'admin' : 'user');

  return NextResponse.json(
    {
      usuario: {
        ...(usuario || {}),
        id,
        email,
        nome,
        role,
      },
    },
    { headers: headersCorsRestrito(request) },
  );
}

export async function OPTIONS(request: NextRequest) {
  if (!origemPermitida(request)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: headersCorsRestrito(request),
  });
}
