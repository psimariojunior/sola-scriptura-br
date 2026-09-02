'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FolderPlus, Heart, StickyNote, Undo2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  aplicarOuRemoverMarcador,
  CORES,
  COR_SIGNIFICADO,
  desfazerUltimaMarca,
  MARCA_CLASSE,
  removeMarcador,
  type CorMarcador,
} from '@/lib/marcadores';
import { useMarcaVerso } from '@/hooks/useMarcadores';
import { toggleFavorito } from '@/lib/estudos';
import {
  adicionarVersoAColecao,
  carregarColecoes,
  criarColecao,
  listarColecoes,
  versoEstaNaColecao,
  type Colecao,
} from '@/lib/colecoes';

export interface VerseQuickBarProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  texto: string;
  isFavorito: boolean;
  temAnotacao?: boolean;
  onFavoritoChange: () => void;
  onAnotar: () => void;
  onClose?: () => void;
  variant?: 'inline' | 'dock';
}

export function VerseQuickBar({
  livroNome,
  livroAbreviacao,
  capitulo,
  versiculo,
  traducao,
  texto,
  isFavorito,
  temAnotacao = false,
  onFavoritoChange,
  onAnotar,
  onClose,
  variant = 'inline',
}: VerseQuickBarProps) {
  const marca = useMarcaVerso(livroAbreviacao, capitulo, versiculo, traducao);
  const corAtual = marca?.cor ?? null;
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [colecaoOpen, setColecaoOpen] = useState(false);
  const [novaColecao, setNovaColecao] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const colecaoRef = useRef<HTMLDivElement>(null);
  const ref = `${livroNome} ${capitulo}:${versiculo}`;

  useEffect(() => {
    if (!colecaoOpen) return;
    void carregarColecoes().then(setColecoes).catch(() => setColecoes(listarColecoes()));
  }, [colecaoOpen]);

  useEffect(() => {
    if (!colecaoOpen) return;
    const fechar = (e: MouseEvent | TouchEvent) => {
      if (colecaoRef.current && !colecaoRef.current.contains(e.target as Node)) {
        setColecaoOpen(false);
      }
    };
    document.addEventListener('mousedown', fechar);
    document.addEventListener('touchstart', fechar);
    return () => {
      document.removeEventListener('mousedown', fechar);
      document.removeEventListener('touchstart', fechar);
    };
  }, [colecaoOpen]);

  const anunciar = useCallback((msg: string) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(null), 2200);
  }, []);

  const marcar = (cor: CorMarcador) => {
    const result = aplicarOuRemoverMarcador(livroAbreviacao, capitulo, versiculo, traducao, cor);
    if (navigator?.vibrate) navigator.vibrate(10);
    anunciar(result ? `${COR_SIGNIFICADO[result].label}` : 'Marca removida');
  };

  const limpar = () => {
    if (!corAtual) return;
    removeMarcador(livroAbreviacao, capitulo, versiculo, traducao);
    anunciar('Marca removida');
  };

  const desfazer = () => {
    if (desfazerUltimaMarca()) anunciar('Desfeito');
  };

  const favoritar = () => {
    toggleFavorito(livroAbreviacao, capitulo, versiculo, traducao, texto);
    if (navigator?.vibrate) navigator.vibrate([10, 40, 10]);
    onFavoritoChange();
  };

  const adicionarColecao = (id: string) => {
    adicionarVersoAColecao(id, {
      livro: livroAbreviacao,
      capitulo,
      verso: versiculo,
      texto,
      referencia: ref,
    });
    setColecaoOpen(false);
    anunciar('Adicionado à coleção');
  };

  const criarEAdicionar = () => {
    const nome = novaColecao.trim();
    if (!nome) return;
    const criada = criarColecao(nome);
    adicionarColecao(criada.id);
    setNovaColecao('');
  };

  const dock = variant === 'dock';

  return (
    <div
      role="toolbar"
      aria-label={`Ações de ${ref}`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className={cn(
        dock
          ? 'fixed inset-x-0 z-[45] lg:hidden px-3 pt-2 pb-2 bg-[var(--surface-raised)]/95 backdrop-blur-md border-t border-[var(--border)]/60 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]'
          : 'mt-2 rounded-xl border border-[var(--border)]/50 bg-[var(--surface-raised)]/90 px-2 py-2',
      )}
      style={dock ? { bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))' } : undefined}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] truncate">
          {ref}
          {corAtual && (
            <span className="ml-1.5 normal-case tracking-normal text-[var(--content-secondary)]">
              · {COR_SIGNIFICADO[corAtual].label}
            </span>
          )}
        </p>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={desfazer}
            className="min-h-11 min-w-11 sm:min-h-8 sm:min-w-8 inline-flex items-center justify-center rounded-lg text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]"
            aria-label="Desfazer última marca"
            title="Desfazer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 min-w-11 sm:min-h-8 sm:min-w-8 inline-flex items-center justify-center rounded-lg text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]"
              aria-label="Fechar ações do versículo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-1" role="group" aria-label="Marcar com cor">
        {CORES.map((cor) => {
          const ativa = corAtual === cor;
          return (
            <button
              key={cor}
              type="button"
              onClick={() => marcar(cor)}
              title={`${COR_SIGNIFICADO[cor].label} — ${COR_SIGNIFICADO[cor].uso}`}
              aria-label={`${ativa ? 'Remover marca' : 'Marcar'}: ${COR_SIGNIFICADO[cor].label}`}
              aria-pressed={ativa}
              className={cn(
                'min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 rounded-full ring-1 ring-black/10 transition-transform active:scale-90',
                COR_SIGNIFICADO[cor].swatch,
                ativa && 'ring-2 ring-offset-2 ring-[var(--brand-default)] scale-110',
              )}
            />
          );
        })}
      </div>

      <div className="mt-1.5 grid grid-cols-4 gap-1">
        <ActionChip
          icon={Heart}
          label={isFavorito ? 'Favorito' : 'Favoritar'}
          active={isFavorito}
          activeClass="bg-red-500 text-white"
          onClick={favoritar}
        />
        <ActionChip
          icon={StickyNote}
          label={temAnotacao ? 'Nota' : 'Anotar'}
          active={temAnotacao}
          activeClass="bg-amber-500 text-white"
          onClick={onAnotar}
        />
        <div className="relative" ref={colecaoRef}>
          <ActionChip
            icon={FolderPlus}
            label="Coleção"
            active={colecaoOpen}
            onClick={() => setColecaoOpen((o) => !o)}
          />
          {colecaoOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-56 max-w-[80vw] rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] shadow-xl p-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] px-1 mb-1.5">
                Adicionar à coleção
              </p>
              <div className="max-h-40 overflow-y-auto space-y-0.5">
                {colecoes.length === 0 && (
                  <p className="text-xs text-[var(--content-muted)] px-1 py-2">Nenhuma coleção ainda.</p>
                )}
                {colecoes.map((c) => {
                  const jaTem = versoEstaNaColecao(c, livroAbreviacao, capitulo, versiculo);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      disabled={jaTem}
                      onClick={() => adicionarColecao(c.id)}
                      className="w-full text-left px-2 py-2 min-h-11 rounded-lg text-sm hover:bg-[var(--surface-sunken)] disabled:opacity-50"
                    >
                      {c.nome}
                      {jaTem ? ' · já está' : ''}
                    </button>
                  );
                })}
              </div>
              <div className="mt-1.5 flex gap-1">
                <input
                  value={novaColecao}
                  onChange={(e) => setNovaColecao(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') criarEAdicionar(); }}
                  placeholder="Nova coleção"
                  className="flex-1 min-h-11 px-2 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] text-sm"
                  aria-label="Nome da nova coleção"
                />
                <button
                  type="button"
                  onClick={criarEAdicionar}
                  className="min-h-11 px-2 rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] text-xs font-semibold"
                >
                  Criar
                </button>
              </div>
            </div>
          )}
        </div>
        <ActionChip
          icon={X}
          label="Limpar"
          disabled={!corAtual}
          onClick={limpar}
        />
      </div>

      {corAtual && (
        <p className={cn('mt-1.5 h-0.5 rounded-full', MARCA_CLASSE[corAtual])} aria-hidden />
      )}

      <p className="sr-only" aria-live="polite">{feedback}</p>
    </div>
  );
}

function ActionChip({
  icon: Icon,
  label,
  onClick,
  active,
  activeClass,
  disabled,
}: {
  icon: typeof Heart;
  label: string;
  onClick: () => void;
  active?: boolean;
  activeClass?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 min-h-11 rounded-xl text-[10px] font-medium transition-all active:scale-95 disabled:opacity-35',
        active
          ? (activeClass || 'bg-[var(--brand-default)] text-[var(--brand-contrast)]')
          : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)]',
      )}
    >
      <Icon className="w-4 h-4" fill={active && Icon === Heart ? 'currentColor' : 'none'} />
      {label}
    </button>
  );
}
