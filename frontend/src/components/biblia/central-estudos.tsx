'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, BookText, Link2, MessageSquare, ScrollText, Languages } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export interface VersiculoCentral {
  id?: string;
  numero: number;
  texto: string;
  livroNome?: string;
  capitulo?: number;
}

interface Props {
  versiculo: VersiculoCentral | null;
  aberto: boolean;
  onFechar: () => void;
}

interface Doutrina {
  id: string;
  nome: string;
  definicao: string;
  explicacao?: string | null;
  baseScriptura?: string | null;
}

const TABS = [
  { id: 'texto', label: 'Texto', icone: ScrollText },
  { id: 'strong', label: 'Strong', icone: Languages },
  { id: 'teologia', label: 'Teologia', icone: BookText },
  { id: 'referencias', label: 'Referências', icone: Link2 },
  { id: 'comentarios', label: 'Comentários', icone: MessageSquare },
  { id: 'ia', label: 'IA', icone: Sparkles },
];

function referencia(v: VersiculoCentral | null): string {
  if (!v) return '';
  const livro = v.livroNome || '';
  const cap = v.capitulo != null ? ` ${v.capitulo}` : '';
  return `${livro}${cap}:${v.numero}`;
}

function refItemLabel(r: any, i: number): string {
  if (r.referencia) return r.referencia;
  if (r.referenciaTexto) return r.referenciaTexto;
  if (r.textoReferencia) return r.textoReferencia;
  if (r.livro) {
    const nome = typeof r.livro === 'string' ? r.livro : r.livro?.nome;
    const cap = r.capitulo ?? r.capituloNumero ?? '';
    const ver = r.versiculo ?? r.numero ?? '';
    return `${nome ?? ''} ${cap}:${ver}`.trim();
  }
  return `Referência ${i + 1}`;
}

export function CentralEstudos({ versiculo, aberto, onFechar }: Props) {
  const [tab, setTab] = useState('texto');

  const [teologia, setTeologia] = useState<Doutrina[]>([]);
  const [teologiaCarregando, setTeologiaCarregando] = useState(false);
  const [teologiaErro, setTeologiaErro] = useState('');

  const [referencias, setReferencias] = useState<any[]>([]);
  const [refCarregando, setRefCarregando] = useState(false);
  const [refErro, setRefErro] = useState('');

  const [iaResposta, setIaResposta] = useState<any>(null);
  const [iaCarregando, setIaCarregando] = useState(false);
  const [iaErro, setIaErro] = useState('');

  useEffect(() => {
    if (aberto) setTab('texto');
  }, [versiculo?.id, aberto]);

  useEffect(() => {
    if (!aberto) {
      setIaResposta(null);
      setIaErro('');
    }
  }, [aberto]);

  useEffect(() => {
    if (!aberto) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto || tab !== 'teologia' || !versiculo?.id) return;
    let cancelled = false;
    setTeologiaCarregando(true);
    setTeologiaErro('');
    setTeologia([]);
    fetch(`${API}/teologia/versiculo/${versiculo.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setTeologia(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancelled) setTeologiaErro('Não foi possível carregar as doutrinas relacionadas.');
      })
      .finally(() => {
        if (!cancelled) setTeologiaCarregando(false);
      });
    return () => {
      cancelled = true;
    };
  }, [aberto, tab, versiculo?.id]);

  useEffect(() => {
    if (!aberto || tab !== 'referencias' || !versiculo?.id) return;
    let cancelled = false;
    setRefCarregando(true);
    setRefErro('');
    setReferencias([]);
    fetch(`${API}/referencias/versiculo/${versiculo.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setReferencias(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancelled) setRefErro('Não foi possível carregar as referências cruzadas.');
      })
      .finally(() => {
        if (!cancelled) setRefCarregando(false);
      });
    return () => {
      cancelled = true;
    };
  }, [aberto, tab, versiculo?.id]);

  async function consultarIA() {
    if (!versiculo) return;
    setIaCarregando(true);
    setIaErro('');
    setIaResposta(null);
    try {
      const r = await fetch(`${API}/ia/exegese`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          versiculoId: versiculo.id,
          texto: versiculo.texto,
          referencia: referencia(versiculo),
        }),
      });
      const dados = await r.json();
      setIaResposta(dados);
    } catch {
      setIaErro('Não foi possível conectar ao assistente. Tente novamente.');
    } finally {
      setIaCarregando(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          aberto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onFechar}
        aria-hidden={!aberto}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[480px] bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          aberto ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Central de Estudos"
      >
        <header className="px-6 py-5 border-b border-border/60 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                Central de Estudos
              </p>
              <h2 className="font-display text-2xl font-semibold text-foreground truncate">
                {versiculo ? referencia(versiculo) : '—'}
              </h2>
            </div>
            <button
              onClick={onFechar}
              className="p-1.5 -mt-1 -mr-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex gap-1 mt-5 -mb-1 overflow-x-auto">
            {TABS.map((t) => {
              const Icone = t.icone;
              const ativo = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                    ativo
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!versiculo ? (
            <p className="font-serif-body italic text-muted-foreground text-center py-12">
              Nenhum versículo selecionado.
            </p>
          ) : tab === 'texto' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <p className="texto-sagrado text-foreground">{versiculo.texto}</p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-6 pt-4 border-t border-border/40">
                {referencia(versiculo)}
              </p>
            </div>
          ) : tab === 'strong' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Análise de palavras originais
              </h3>
              <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
                A análise léxica e morfológica de cada termo do versículo — grego Koiné do Novo
                Testamento e hebraico do Antigo — estará disponível aqui, com numeração de Strong,
                transliteração, parsing e definição de léxico.
              </p>
              <div className="sola-card p-5 mt-6">
                <p className="font-serif-body italic text-sm text-muted-foreground">
                  Em breve: clique em qualquer palavra do versículo para ver seu lexema, família
                  semântica e ocorrências no cânon.
                </p>
              </div>
            </div>
          ) : tab === 'teologia' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Doutrinas relacionadas
              </h3>
              {teologiaCarregando ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando teologia...
                </div>
              ) : teologiaErro ? (
                <p className="font-serif-body italic text-sm text-muted-foreground">
                  {teologiaErro}
                </p>
              ) : teologia.length === 0 ? (
                <p className="font-serif-body italic text-sm text-muted-foreground">
                  Nenhuma doutrina vinculada a este versículo ainda.
                </p>
              ) : (
                <div className="space-y-4">
                  {teologia.map((d) => (
                    <article key={d.id} className="sola-card p-5">
                      <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                        {d.nome}
                      </h4>
                      <p className="font-serif-body text-sm text-foreground/80 leading-relaxed mb-3">
                        {d.definicao}
                      </p>
                      {d.explicacao && (
                        <p className="font-serif-body text-sm text-muted-foreground leading-relaxed mb-3">
                          {d.explicacao}
                        </p>
                      )}
                      {d.baseScriptura && (
                        <p className="text-[10px] tracking-widest uppercase text-muted-foreground pt-3 border-t border-border/40">
                          Base scriptura ·{' '}
                          <span style={{ color: 'hsl(var(--burgundy))' }}>{d.baseScriptura}</span>
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : tab === 'referencias' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Referências cruzadas
              </h3>
              {refCarregando ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Carregando referências...
                </div>
              ) : refErro ? (
                <p className="font-serif-body italic text-sm text-muted-foreground">{refErro}</p>
              ) : referencias.length === 0 ? (
                <p className="font-serif-body italic text-sm text-muted-foreground">
                  Nenhuma referência cruzada registrada para este versículo.
                </p>
              ) : (
                <div className="space-y-3">
                  {referencias.map((r, i) => (
                    <article key={i} className="sola-card p-4">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                        <span style={{ color: 'hsl(var(--burgundy))' }}>
                          {refItemLabel(r, i)}
                        </span>
                      </p>
                      {r.texto && (
                        <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">
                          {r.texto}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : tab === 'comentarios' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Comentários
              </h3>
              <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
                Comentários expositivos de autores clássicos e contemporâneos serão apresentados
                aqui — Calvino, Lutero, Barnes, Henry, Hendriksen e outros — organizados por
                passagem e por tradição teológica.
              </p>
              <div className="sola-card p-5 mt-6">
                <p className="font-serif-body italic text-sm text-muted-foreground">
                  Em breve. Por enquanto, use a aba &laquo;IA&raquo; para uma análise exegética
                  assistida.
                </p>
              </div>
            </div>
          ) : tab === 'ia' ? (
            <div>
              <div className="ornamento w-16 mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Análise por IA
              </h3>
              <p className="font-serif-body text-sm text-muted-foreground leading-relaxed mb-6">
                Consulte o assistente especializado para uma exegese deste versículo, com base em
                léxicos, comentários e a biblioteca teológica.
              </p>

              {!iaResposta && !iaCarregando && !iaErro && (
                <button
                  onClick={consultarIA}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                  Consultar IA sobre este versículo
                </button>
              )}

              {iaCarregando && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
                  <Loader2 className="w-4 h-4 animate-spin" /> Consultando o assistente...
                </div>
              )}

              {iaErro && (
                <p className="font-serif-body italic text-sm text-muted-foreground">{iaErro}</p>
              )}

              {iaResposta && (
                <article className="sola-card p-6">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                    Resposta
                  </p>
                  <div className="font-serif-body text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {iaResposta.resposta || iaResposta.texto || iaResposta.analise || ''}
                  </div>
                  {iaResposta.fontes && iaResposta.fontes.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border/40">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                        Fontes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {iaResposta.fontes.map((f: any, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-secondary text-muted-foreground"
                          >
                            {f.tipo || f.nome || f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={consultarIA}
                    className="mt-5 text-xs font-medium text-primary border-b border-primary pb-0.5 hover:text-primary/80 transition-colors"
                  >
                    Consultar novamente
                  </button>
                </article>
              )}
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}

export default CentralEstudos;
