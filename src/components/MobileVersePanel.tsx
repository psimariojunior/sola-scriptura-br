'use client';

import { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Copy, Share2, Languages, MessageSquare, GraduationCap, Link2, BookOpen, Palette, StickyNote, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleFavorito } from '@/lib/estudos';
import { CORES, setMarcador, removeMarcador, getMarcador, type CorMarcador } from '@/lib/marcadores';
import type { RecursoVersiculo } from '@/data/biblia/versiculoRecursos';

interface MobileVersePanelProps {
  livro: string;
  livroAbrev: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  aberto: boolean;
  onFechar: () => void;
  isFavorito: boolean;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onStrong: () => void;
  onComentarios: () => void;
  copyVerse: (text: string, ref: string) => void;
  copiedVerse: string | null;
}

const corBgMapInline: Record<CorMarcador, string> = {
  yellow: '#facc15', green: '#4ade80', blue: '#60a5fa',
  pink: '#f472b6', orange: '#fb923c', purple: '#a78bfa',
};

export const MobileVersePanel = memo(function MobileVersePanel({
  livro, livroAbrev, capitulo, versiculo, texto, traducao,
  aberto, onFechar, isFavorito, onFavoritoChange,
  onAnotar, onStrong, onComentarios, copyVerse, copiedVerse,
}: MobileVersePanelProps) {
  const [activeTab, setActiveTab] = useState<string>('acoes');
  const [recursos, setRecursos] = useState<RecursoVersiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [lexicoPalavras, setLexicoPalavras] = useState<Array<{ strong: string; palavra: string; transliteracao: string; definicao: string; morfologia: string; idioma: string }>>([]);
  const [lexicoLoading, setLexicoLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const ref = `${livro} ${capitulo}:${versiculo}`;
  const corAtual = getMarcador(livroAbrev, capitulo, versiculo, traducao)?.cor ?? null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copiarTexto = async (textoParaCopiar: string) => {
    try {
      await navigator.clipboard.writeText(textoParaCopiar);
      showToast('Copiado!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = textoParaCopiar;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('Copiado!'); } catch { showToast('Erro ao copiar'); }
      document.body.removeChild(ta);
    }
  };

  const compartilhar = async () => {
    const textoCompleto = `${ref}\n\n${texto}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: ref, text: textoCompleto });
      } else {
        await copiarTexto(textoCompleto);
      }
    } catch { /* user cancelled */ }
  };

  useEffect(() => {
    if (!aberto || !livroAbrev) return;
    setLoading(true);
    setActiveTab('acoes');
    setLexicoPalavras([]);
    import('@/data/biblia/versiculoRecursos').then(mod => {
      mod.getRecursosBasicos(livroAbrev, capitulo, versiculo).then(r => {
        setRecursos(r);
        setLoading(false);
      }).catch(() => setLoading(false));
    }).catch(() => setLoading(false));
  }, [aberto, livroAbrev, capitulo, versiculo]);

  useEffect(() => {
    if (activeTab !== 'lexico' || !livroAbrev) return;
    setLexicoLoading(true);
    import('@/data/biblia/strong').then(mod => {
      const palavras = mod.getStrongPorVersiculo(livroAbrev, capitulo, versiculo);
      setLexicoPalavras(palavras);
      setLexicoLoading(false);
    }).catch(() => setLexicoLoading(false));
  }, [activeTab, livroAbrev, capitulo, versiculo]);

  if (!aberto) return null;

  const estudos = recursos.filter(r => r.tipo === 'estudo');
  const comentarios = recursos.filter(r => r.tipo === 'comentario');

  const tabs = [
    { id: 'acoes', label: 'Ações', icon: BookOpen },
    { id: 'estudo', label: 'Estudo', icon: GraduationCap, count: estudos.length },
    { id: 'comentarios', label: 'Coment.', icon: MessageSquare, count: comentarios.length },
    { id: 'lexico', label: 'Léxico', icon: Languages },
  ];

  return createPortal((
    <>
      <div className="fixed inset-0 z-[100] bg-black/50" onClick={onFechar} />
      <div className="fixed inset-x-0 bottom-0 z-[101] bg-[var(--surface-raised)] rounded-t-2xl shadow-2xl flex flex-col" style={{ height: '80vh' }}>
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[var(--content-muted)]/30" />
        </div>

        {/* Header */}
        <div className="px-4 pb-2 flex items-center justify-between border-b border-[var(--border)]/30 shrink-0">
          <div>
            <h2 className="text-base font-bold text-[var(--content-primary)]">{ref}</h2>
            <p className="text-[10px] text-[var(--content-muted)]">{recursos.length} recurso{recursos.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onFechar} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]/30 shrink-0 overflow-x-auto">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={cn('flex items-center gap-1 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors',
                  active ? 'border-[var(--brand-default)] text-[var(--brand-default)]' : 'border-transparent text-[var(--content-muted)]')}>
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {t.count !== undefined && t.count > 0 && (
                  <span className="px-1 py-0 text-[9px] rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">{t.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* TAB: AÇÕES */}
          {activeTab === 'acoes' && (
            <div className="p-4">
              <p className="text-sm text-[var(--content-secondary)] font-serif-body leading-relaxed mb-4">{texto}</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => { toggleFavorito(livroAbrev, capitulo, versiculo, traducao, texto); onFavoritoChange(); }}
                  className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all active:scale-95',
                    isFavorito ? 'bg-red-500 text-white' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}>
                  <Heart className="w-5 h-5" fill={isFavorito ? 'currentColor' : 'none'} />
                  <span className="text-[10px] font-medium">{isFavorito ? 'Favoritado' : 'Favoritar'}</span>
                </button>
                <button onClick={() => copiarTexto(texto)}
                  className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all active:scale-95',
                    copiedVerse === ref ? 'bg-green-500 text-white' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}>
                  <Copy className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{copiedVerse === ref ? 'Copiado!' : 'Copiar'}</span>
                </button>
                <button onClick={compartilhar}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95">
                  <Share2 className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Compartilhar</span>
                </button>
                <button onClick={() => { onFechar(); window.open(`/compartilhar?livro=${encodeURIComponent(livro)}&cap=${capitulo}&ver=${versiculo}&texto=${encodeURIComponent(texto)}`, '_blank'); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Imagem</span>
                </button>
                <button onClick={() => setShowColor(!showColor)}
                  className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all active:scale-95',
                    corAtual ? 'text-white' : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]')}
                  style={corAtual ? { backgroundColor: corBgMapInline[corAtual as CorMarcador] } : undefined}>
                  <Palette className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Cor</span>
                </button>
                <button onClick={onAnotar}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95">
                  <StickyNote className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Anotar</span>
                </button>
                <button onClick={onStrong}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-all active:scale-95">
                  <Languages className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Léxico</span>
                </button>
              </div>
              {showColor && (
                <div className="flex gap-2 mt-3 justify-center">
                  {CORES.map(cor => (
                    <button key={cor} onClick={() => {
                      if (corAtual === cor) removeMarcador(livroAbrev, capitulo, versiculo, traducao);
                      else setMarcador(livroAbrev, capitulo, versiculo, traducao, cor);
                      setShowColor(false);
                    }} className="w-9 h-9 rounded-full active:scale-90 transition-transform"
                      style={{ backgroundColor: corBgMapInline[cor] }}>
                      {corAtual === cor && <div className="w-full h-full rounded-full border-2 border-white" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ESTUDO */}
          {activeTab === 'estudo' && (
            <div className="p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-20 bg-[var(--surface-sunken)] rounded-lg animate-pulse" />)}
                </div>
              ) : estudos.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="w-10 h-10 mx-auto text-[var(--content-muted)]/30 mb-3" />
                  <p className="text-sm text-[var(--content-muted)]">Nenhum estudo disponível para este versículo.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {estudos.map((e, i) => {
                    const dados = e.dados as unknown as { tema: string; interpretes: Array<{ nome: string; periodo: string; tradicao: string; visao: string; resumo: string }> };
                    return (
                      <div key={i} className="bg-[var(--surface-sunken)] rounded-xl p-4">
                        <h3 className="text-sm font-bold text-[var(--content-primary)] mb-3">{dados.tema}</h3>
                        <div className="space-y-3">
                          {dados.interpretes?.map((int, j) => (
                            <div key={j} className="pl-3 border-l-2 border-[var(--brand-default)]/30">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-[var(--content-primary)]">{int.nome}</span>
                                <span className="text-[10px] px-1.5 py-0 rounded bg-[var(--surface-raised)] text-[var(--content-muted)]">{int.periodo}</span>
                              </div>
                              <p className="text-[11px] text-[var(--brand-default)] font-medium mb-1">{int.visao}</p>
                              <p className="text-xs text-[var(--content-secondary)] leading-relaxed">{int.resumo}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: COMENTÁRIOS */}
          {activeTab === 'comentarios' && (
            <div className="p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-16 bg-[var(--surface-sunken)] rounded-lg animate-pulse" />)}
                </div>
              ) : comentarios.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 mx-auto text-[var(--content-muted)]/30 mb-3" />
                  <p className="text-sm text-[var(--content-muted)]">Nenhum comentário disponível.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comentarios.map((c, i) => {
                    const dados = c.dados as unknown as { autor: string; texto: string; tipoComentario: string };
                    return (
                      <div key={i} className="bg-[var(--surface-sunken)] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-[var(--brand-default)]">{dados.autor}</span>
                          <span className="text-[10px] px-1.5 py-0 rounded bg-[var(--surface-raised)] text-[var(--content-muted)] capitalize">{dados.tipoComentario}</span>
                        </div>
                        <p className="text-sm text-[var(--content-secondary)] leading-relaxed font-serif-body italic">&ldquo;{dados.texto}&rdquo;</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: LÉXICO */}
          {activeTab === 'lexico' && (
            <div className="p-4">
              {lexicoLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-16 bg-[var(--surface-sunken)] rounded-lg animate-pulse" />)}
                </div>
              ) : lexicoPalavras.length === 0 ? (
                <div className="text-center py-8">
                  <Languages className="w-10 h-10 mx-auto text-[var(--content-muted)]/30 mb-3" />
                  <p className="text-sm text-[var(--content-muted)]">Nenhuma palavra Strong disponível.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lexicoPalavras.map((p, i) => (
                    <div key={i} className="bg-[var(--surface-sunken)] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.idioma === 'grego' ? 'bg-purple-500/20 text-purple-600' : 'bg-amber-500/20 text-amber-600'}`}>{p.strong}</span>
                        <span className="text-xs text-[var(--content-muted)]">{p.idioma}</span>
                      </div>
                      <p className="text-base font-bold text-[var(--content-primary)] mb-0.5">{p.palavra}</p>
                      <p className="text-xs text-[var(--content-muted)] italic mb-1">{p.transliteracao}</p>
                      <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{p.definicao}</p>
                      {p.morfologia && <p className="text-[11px] text-[var(--content-muted)] mt-1">Morfologia: {p.morfologia}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-[var(--content-primary)] text-[var(--surface-raised)] px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}
    </>
  ), document.body);
});
