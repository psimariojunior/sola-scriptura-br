// Helper de servidor para gravar pagamentos e liberar "Acesso Total" no Supabase.
// Usa a REST API via fetch (sem dependencias extras) com a SERVICE ROLE KEY,
// que SO deve existir no servidor (NUNCA no cliente). Mantenha segredo.
//
// Variaveis de ambiente esperadas (server-only):
//   SUPABASE_URL               - ex.: https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  - chave de service_role (bypassa RLS)
//
// Se faltarem as variaveis, as funcoes abaixo falham de forma controlada:
//   - gravarPagamentoAprovado lanca erro (deve ser tratado pelo chamador)
//   - consultarAcessoTotal retorna false (modo degradado seguro)
//   - registrarPedidoPendente ignora silenciosamente (best-effort)

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function verificarEnv() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      '[supabaseServer] SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes. ' +
        'Defina ambas no ambiente do servidor para integracao real.',
    );
  }
}

// Headers padrao para a REST API do Supabase usando a service_role key.
function headersSupabase(): Record<string, string> {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

// Registra um pedido pendente na tabela pagamentos (chamado em /criar).
// Best-effort: se o Supabase nao estiver configurado, apenas loga e segue.
export async function registrarPedidoPendente(
  email: string,
  externalReference: string,
  valor: number = 20,
): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      '[supabaseServer] SUPABASE nao configurado: pulando registro de pedido pendente.',
    );
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pagamentos`, {
      method: 'POST',
      headers: headersSupabase(),
      body: JSON.stringify({
        usuario_email: email,
        external_reference: externalReference,
        valor,
        status: 'pending',
        gateway: 'mercadopago',
      }),
    });
    if (!res.ok) {
      const erro = await res.text();
      console.error('[supabaseServer] Falha ao registrar pedido pendente:', res.status, erro);
    }
  } catch (err: any) {
    console.error('[supabaseServer] Erro ao registrar pedido pendente:', err?.message);
  }
}

// Grava o pagamento como aprovado e libera o Acesso Total para o usuario.
// Se a linha de usuario ainda nao existir (pagou antes de se cadastrar), cria
// uma linha minima apenas com o email para que acesso_total seja definido.
export async function gravarPagamentoAprovado(
  email: string,
  externalReference: string,
  valor: number = 20,
): Promise<void> {
  verificarEnv();

  // 1) Upsert do pagamento como aprovado.
  const resPagamento = await fetch(`${SUPABASE_URL}/rest/v1/pagamentos`, {
    method: 'POST',
    headers: headersSupabase(),
    body: JSON.stringify({
      usuario_email: email,
      external_reference: externalReference,
      valor,
      status: 'approved',
      gateway: 'mercadopago',
      metadata: { aprovado_em: new Date().toISOString() },
      atualizado_em: new Date().toISOString(),
    }),
  });
  if (!resPagamento.ok) {
    const erro = await resPagamento.text();
    console.error('[supabaseServer] Falha ao gravar pagamento aprovado:', resPagamento.status, erro);
    throw new Error('Falha ao gravar pagamento no Supabase');
  }

  // 2) Atualiza usuarios: marca acesso_total=true onde o email bater.
  const resUpdate = await fetch(
    `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: headersSupabase(),
      body: JSON.stringify({
        acesso_total: true,
        data_pagamento: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      }),
    },
  );

  if (resUpdate.ok) {
    const atualizados = await resUpdate.json();
    // Se nao existia linha para esse email, cria uma minima para registrar o acesso.
    if (Array.isArray(atualizados) && atualizados.length === 0) {
      const resInsert = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
        method: 'POST',
        headers: headersSupabase(),
        body: JSON.stringify({
          nome: email.split('@')[0] || 'Usuario',
          email,
          acesso_total: true,
          data_pagamento: new Date().toISOString(),
          email_verificado: false,
          plano: 'free',
          ativo: true,
        }),
      });
      if (!resInsert.ok) {
        const erro = await resInsert.text();
        console.error(
          '[supabaseServer] Falha ao inserir usuario para acesso total:',
          resInsert.status,
          erro,
        );
      }
    }
  } else {
    const erro = await resUpdate.text();
    console.error('[supabaseServer] Falha ao atualizar usuario:', resUpdate.status, erro);
    throw new Error('Falha ao liberar Acesso Total no Supabase');
  }
}

// Consulta se o email possui Acesso Total liberado.
// Procura em usuarios.acesso_total OU em pagamentos aprovados (fallback).
// Retorna false se o Supabase nao estiver configurado (modo degradado).
export async function consultarAcessoTotal(email: string): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[supabaseServer] SUPABASE nao configurado: consultarAcessoTotal retorna false.');
    return false;
  }
  try {
    // 1) Verifica flag direta na tabela usuarios.
    const resUsuario = await fetch(
      `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(
        email,
      )}&select=acesso_total`,
      {
        method: 'GET',
        headers: headersSupabase(),
      },
    );
    if (resUsuario.ok) {
      const usuarios = await resUsuario.json();
      if (Array.isArray(usuarios) && usuarios.length > 0 && usuarios[0].acesso_total) {
        return true;
      }
    }

    // 2) Fallback: existe algum pagamento aprovado para o email?
    const resPag = await fetch(
      `${SUPABASE_URL}/rest/v1/pagamentos?usuario_email=eq.${encodeURIComponent(
        email,
      )}&status=eq.approved&select=id&limit=1`,
      {
        method: 'GET',
        headers: headersSupabase(),
      },
    );
    if (resPag.ok) {
      const pagamentos = await resPag.json();
      return Array.isArray(pagamentos) && pagamentos.length > 0;
    }
    return false;
  } catch (err: any) {
    console.error('[supabaseServer] Erro em consultarAcessoTotal:', err?.message);
    return false;
  }
}
