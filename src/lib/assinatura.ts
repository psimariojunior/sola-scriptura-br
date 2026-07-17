// Servico de assinatura (pagamento unico) — Mercado Pago.
// Mantenha secrets no servidor (process.env.MERCADO_PAGO_ACCESS_TOKEN).
// A chave publica e' segura para o cliente (NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY).

export const PRECO = 20; // reais — pagamento unico, vitalicio
export const PRODUTO = 'Acesso Total Sola Scriptura BR';

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || '';

export const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://solascripturabr.com.br';

export interface PreferenciaMP {
  items: Array<{
    title: string;
    unit_price: number;
    quantity: number;
    currency_id?: string;
  }>;
  payer: { email: string };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  notification_url: string;
  statement_descriptor?: string;
  external_reference: string;
}

export function criarPreferenciaMP(
  valor: number = PRECO,
  descricao: string = PRODUTO,
  email: string = '',
): PreferenciaMP {
  const external_reference = `ssb_at_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  return {
    items: [
      {
        title: descricao,
        unit_price: valor,
        quantity: 1,
        currency_id: 'BRL',
      },
    ],
    payer: { email: email || '' },
    back_urls: {
      success: `${SITE_URL}/assinar?status=sucesso&ref=${external_reference}`,
      failure: `${SITE_URL}/assinar?status=erro`,
      pending: `${SITE_URL}/assinar?status=pendente`,
    },
    notification_url: `${SITE_URL}/api/pagamento/webhook`,
    statement_descriptor: 'SOLA SCRIPTURA',
    external_reference,
  };
}

// Verifica um pagamento no Mercado Pago (usado pelo webhook/route).
// Recebe o access token do servidor. Retorna os dados do pagamento ou null.
export async function verificarPagamento(
  paymentId: string,
  accessToken: string = MP_ACCESS_TOKEN,
): Promise<any | null> {
  if (!accessToken || !paymentId) return null;
  try {
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
