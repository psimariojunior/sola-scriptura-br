import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const usuarioCookie = request.cookies.get('ssb_usuario')?.value;

  if (!usuarioCookie) {
    return NextResponse.json({ usuario: null }, { status: 401 });
  }

  try {
    const usuario = JSON.parse(decodeURIComponent(usuarioCookie));
    return NextResponse.json({ usuario });
  } catch {
    return NextResponse.json({ usuario: null }, { status: 401 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
