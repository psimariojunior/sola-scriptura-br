import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento, MP_ACCESS_TOKEN } from '@/lib/assinatura';
import { gravarPagamentoAprovado } from '@/lib/supabaseServer';
import crypto from 'crypto';

export const runtime = 'nodejs';

const MP_WEBHOOK_SECRET = process.env.MERCADO_PAGO_WEBHOOK_SECRET || '';

function verificarAssinatura(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    const parts: Record<string, string> = {};
    for (const part of signature.split(',')) {
      const [key, value] = part.split('=');
      if (key && value) parts[key.trim()] = value.trim();
    }
    const ts = parts['ts'];
    const v1 = parts['v1'];
    if (!ts || !v1) return false;

    const MAX_AGE_MS = 5 * 60 * 1000;
    const timestamp = parseInt(ts, 10);
    if (isNaN(timestamp) || Math.abs(Date.now() - timestamp) > MAX_AGE_MS) {
      console.warn('[webhook] Assinatura com timestamp fora do limite.');
      return false;
    }

    const payload = `${ts}.${body}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(v1, 'hex'));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (MP_WEBHOOK_SECRET) {
    const signature = request.headers.get('x-signature') || request.headers.get('x-hub-signature-256');
    if (!verificarAssinatura(rawBody, signature, MP_WEBHOOK_SECRET)) {
      console.warn('[webhook] Assinatura invalida ou ausente. Requisicao rejeitada.');
      return NextResponse.json({ received: false, error: 'invalid signature' }, { status: 401 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ received: true });
  }

  const paymentId = (body?.data as Record<string, unknown>)?.id;

  if (paymentId && MP_ACCESS_TOKEN) {
    const pagamento = await verificarPagamento(String(paymentId), MP_ACCESS_TOKEN);
    if (pagamento && pagamento.status === 'approved') {
      const payer = pagamento.payer as Record<string, unknown> | undefined;
      const email = payer?.email ? String(payer.email) : undefined;
      const externalReference = pagamento.external_reference ? String(pagamento.external_reference) : undefined;

      console.log(
        '[webhook] Pagamento aprovado:',
        paymentId,
        'email:',
        email,
        'external_reference:',
        externalReference,
      );

      if (email && externalReference) {
        try {
          await gravarPagamentoAprovado(email, externalReference);
          console.log('[webhook] Acesso Total liberado para:', email);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error('[webhook] Falha ao gravar aprovacao no Supabase:', msg);
        }
      } else {
        console.warn('[webhook] Pagamento aprovado sem email/external_reference completos.');
      }
    } else {
      console.log('[webhook] Pagamento recebido:', paymentId, pagamento?.status);
    }
  } else {
    console.log('[webhook] Notificacao recebida (sem verificacao):', body);
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ received: true });
}
