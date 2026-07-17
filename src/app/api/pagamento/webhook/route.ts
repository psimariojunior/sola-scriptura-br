import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento, MP_ACCESS_TOKEN } from '@/lib/assinatura';

export const runtime = 'nodejs';

// Webhook de notificacoes do Mercado Pago.
// O Mercado Pago envia POST com { type, data: { id } }.
//
// TODO(integracao-real): este app usa auth local (localStorage) e nao possui
// tabela de usuarios no servidor. Para liberar o "Acesso Total" automaticamente
// apos o pagamento, sera necessario: (1) vincular o external_reference ao email
// do usuario no momento da criacao da preferencia (tabela no backend/NestJS),
// (2) aqui, ao receber o pagamento aprovado, marcar o usuario como acessoTotal
// na base. Por enquanto, apenas registramos a notificacao e retornamos 200.
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
      // TODO(integracao-real): liberar acessoTotal para o usuario vinculado a
      // pagamento.external_reference (ex.: via tabela de pedidos no backend).
      console.log(
        '[webhook] Pagamento aprovado:',
        paymentId,
        'external_reference:',
        pagamento.external_reference,
      );
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
