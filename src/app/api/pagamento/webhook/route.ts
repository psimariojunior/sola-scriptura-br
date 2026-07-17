import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento, MP_ACCESS_TOKEN } from '@/lib/assinatura';
import { gravarPagamentoAprovado } from '@/lib/supabaseServer';

export const runtime = 'nodejs';

// Webhook de notificacoes do Mercado Pago (VERIFICACAO REAL no servidor).
// O Mercado Pago envia POST com { type, data: { id } }.
// Fluxo: recebe o id -> consulta MP (verificarPagamento) -> se aprovado,
// grava pagamento aprovado e libera acesso_total no Supabase via service_role.
// Retorna 200 sempre para evitar reenvios do gateway.
export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ received: true });
  }

  const paymentId = body?.data?.id;

  if (paymentId && MP_ACCESS_TOKEN) {
    const pagamento = await verificarPagamento(paymentId, MP_ACCESS_TOKEN);
    if (pagamento && pagamento.status === 'approved') {
      const email = pagamento?.payer?.email;
      const externalReference = pagamento?.external_reference;

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
        } catch (err: any) {
          console.error('[webhook] Falha ao gravar aprovacao no Supabase:', err?.message);
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
