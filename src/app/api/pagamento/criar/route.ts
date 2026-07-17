import { NextRequest, NextResponse } from 'next/server';
import {
  criarPreferenciaMP,
  MP_ACCESS_TOKEN,
} from '@/lib/assinatura';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 });
  }

  const email = (body?.email || '').toString().trim();

  if (!MP_ACCESS_TOKEN) {
    // Modo demo: sem credenciais configuradas, o fluxo e' demonstrável.
    return NextResponse.json({
      mock: true,
      init_point: '/assinar?mock=1',
      preference_id: null,
    });
  }

  const preferencia = criarPreferenciaMP(undefined, undefined, email);

  try {
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferencia),
    });

    if (!res.ok) {
      const erro = await res.text();
      console.error('Mercado Pago falhou:', res.status, erro);
      return NextResponse.json(
        { erro: 'Falha ao criar checkout' },
        { status: 502 },
      );
    }

    const data = await res.json();
    return NextResponse.json({
      init_point: data.init_point,
      preference_id: data.id,
    });
  } catch (err: any) {
    console.error('Erro ao chamar Mercado Pago:', err?.message);
    return NextResponse.json(
      { erro: 'Erro de conexão com o gateway de pagamento' },
      { status: 502 },
    );
  }
}
