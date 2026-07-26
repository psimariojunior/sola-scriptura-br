import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function headersSupabase(): Record<string, string> {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

const TABLE_MAP: Record<string, string> = {
  favoritos: 'user_favorites',
  notas: 'user_notes',
  colecoes: 'user_collections',
  flashcards: 'user_flashcards',
  progresso: 'user_progress',
};

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const { tipo, dados, userId } = body as { tipo?: string; dados?: unknown; userId?: string };

  if (!tipo || !dados || !userId) {
    return NextResponse.json({ erro: 'Campos obrigatorios: tipo, dados, userId' }, { status: 400 });
  }

  const tiposValidos = ['favoritos', 'notas', 'colecoes', 'flashcards', 'progresso'];
  if (!tiposValidos.includes(tipo)) {
    return NextResponse.json({ erro: `Tipo invalido. Use: ${tiposValidos.join(', ')}` }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[sync] Supabase nao configurado. Dados salvos apenas no localStorage do cliente.');
    return NextResponse.json({
      ok: true,
      modo: 'degradado',
      mensagem: `${tipo} registrado (localStorage apenas)`,
      timestamp: Date.now(),
    });
  }

  const table = TABLE_MAP[tipo];

  try {
    const resCheck = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?user_id=eq.${encodeURIComponent(userId)}&select=id&limit=1`,
      { method: 'GET', headers: headersSupabase() },
    );

    if (!resCheck.ok) {
      const erro = await resCheck.text();
      console.error(`[sync] Falha ao verificar ${tipo}:`, resCheck.status, erro);
      return NextResponse.json({ erro: `Falha ao verificar ${tipo}` }, { status: 500 });
    }

    const existing = await resCheck.json();

    if (Array.isArray(existing) && existing.length > 0) {
      const resUpdate = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}?user_id=eq.${encodeURIComponent(userId)}`,
        {
          method: 'PATCH',
          headers: headersSupabase(),
          body: JSON.stringify({
            dados: JSON.stringify(dados),
            atualizado_em: new Date().toISOString(),
          }),
        },
      );

      if (!resUpdate.ok) {
        const erro = await resUpdate.text();
        console.error(`[sync] Falha ao atualizar ${tipo}:`, resUpdate.status, erro);
        return NextResponse.json({ erro: `Falha ao atualizar ${tipo}` }, { status: 500 });
      }
    } else {
      const resInsert = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: headersSupabase(),
        body: JSON.stringify({
          user_id: userId,
          dados: JSON.stringify(dados),
          criado_em: new Date().toISOString(),
          atualizado_em: new Date().toISOString(),
        }),
      });

      if (!resInsert.ok) {
        const erro = await resInsert.text();
        console.error(`[sync] Falha ao inserir ${tipo}:`, resInsert.status, erro);
        return NextResponse.json({ erro: `Falha ao inserir ${tipo}` }, { status: 500 });
      }
    }

    return NextResponse.json({
      ok: true,
      mensagem: `${tipo} sincronizado com sucesso`,
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[sync] Erro ao sincronizar ${tipo}:`, msg);
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');
  const userId = searchParams.get('userId');

  if (!tipo || !userId) {
    return NextResponse.json({ erro: 'Campos obrigatorios: tipo, userId' }, { status: 400 });
  }

  const tiposValidos = ['favoritos', 'notas', 'colecoes', 'flashcards', 'progresso'];
  if (!tiposValidos.includes(tipo)) {
    return NextResponse.json({ erro: `Tipo invalido. Use: ${tiposValidos.join(', ')}` }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: true, dados: [], modo: 'degradado', timestamp: Date.now() });
  }

  const table = TABLE_MAP[tipo];

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?user_id=eq.${encodeURIComponent(userId)}&select=dados,atualizado_em&limit=1`,
      { method: 'GET', headers: headersSupabase() },
    );

    if (!res.ok) {
      const erro = await res.text();
      console.error(`[sync] Falha ao buscar ${tipo}:`, res.status, erro);
      return NextResponse.json({ erro: `Falha ao buscar ${tipo}` }, { status: 500 });
    }

    const rows = await res.json();

    if (Array.isArray(rows) && rows.length > 0) {
      let dadosParsed: unknown;
      try {
        dadosParsed = JSON.parse(rows[0].dados);
      } catch {
        dadosParsed = rows[0].dados;
      }
      return NextResponse.json({
        ok: true,
        dados: dadosParsed,
        atualizadoEm: rows[0].atualizado_em,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json({ ok: true, dados: [], timestamp: Date.now() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[sync] Erro ao buscar ${tipo}:`, msg);
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}
