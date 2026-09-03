'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RespostaCapituloTrilha } from '@/components/cursos/RespostaCapituloTrilha';
import { DiplomaTrilha } from '@/components/cursos/DiplomaTrilha';
import { obterTrilhaPorSlug } from '@/data/trilhasLivro';
import { capitulosDaTrilha, nivelEfetivoDaTrilha } from '@/lib/trilhaCapitulos';
import { hrefBiblia, hrefGuia } from '@/lib/bibliaHref';
import { isChapterRead } from '@/lib/readingProgress';
import { authService } from '@/lib/auth';
import {
  TRILHA_NOME_KEY,
  capituloRespondido,
  emitirCertificadoTrilha,
  garantirInicioTrilha,
  obterProgressoTrilha,
  proximoCapituloPendente,
  trilhaProntaParaCertificado,
  type CertificadoTrilha,
  type TrilhaProgresso,
} from '@/lib/trilhaProgress';

export function TrilhaLivroClient({ slug }: { slug: string }) {
  const trilha = obterTrilhaPorSlug(slug);
  const [progresso, setProgresso] = useState<TrilhaProgresso | null>(null);
  const [aberto, setAberto] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [emitindo, setEmitindo] = useState(false);
  const [erroCert, setErroCert] = useState<string | null>(null);
  const [certificado, setCertificado] = useState<CertificadoTrilha | null>(null);
  const [, setTick] = useState(0);

  const caps = useMemo(() => (trilha ? capitulosDaTrilha(trilha) : []), [trilha]);
  const nivel = trilha ? nivelEfetivoDaTrilha(trilha) : 'sintese';

  const recarregar = useCallback(() => {
    if (!trilha) return;
    const p = obterProgressoTrilha(trilha.slug);
    setProgresso(p);
    if (p.certificado) setCertificado(p.certificado);
    setTick((n) => n + 1);
  }, [trilha]);

  useEffect(() => {
    if (!trilha) return;
    garantirInicioTrilha(trilha.slug);
    recarregar();
    const u = authService.getUsuario();
    if (u?.nome) {
      setNome(u.nome);
      setAutenticado(true);
    } else if (typeof window !== 'undefined') {
      setNome(localStorage.getItem(TRILHA_NOME_KEY) || '');
      setAutenticado(false);
    }
    const prox = proximoCapituloPendente(trilha);
    setAberto(prox);
  }, [trilha, recarregar]);

  if (!trilha) return null;

  const lidos = caps.filter((c) => isChapterRead(trilha.livroAbrev, c.capitulo)).length;
  const respondidos = caps.filter((c) => capituloRespondido(trilha.slug, c.capitulo)).length;
  const completos = caps.filter(
    (c) => isChapterRead(trilha.livroAbrev, c.capitulo) && capituloRespondido(trilha.slug, c.capitulo),
  ).length;
  const pronta = trilhaProntaParaCertificado(trilha);
  const proximo = proximoCapituloPendente(trilha);

  async function emitir() {
    if (!trilha) return;
    setErroCert(null);
    setEmitindo(true);
    try {
      const cert = await emitirCertificadoTrilha({ trilha, nome, autenticado });
      setCertificado(cert);
      recarregar();
    } catch (e) {
      setErroCert(e instanceof Error ? e.message : 'Não foi possível emitir.');
    } finally {
      setEmitindo(false);
    }
  }

  return (
    <PageShell maxWidth="4xl">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Cursos', href: '/cursos' },
          { label: trilha.livroNome },
        ]}
      />

      <PageHero
        icon={GraduationCap}
        eyebrow={nivel === 'profundo' ? 'Trilha oficial · fichas profundas' : 'Trilha introdutória · síntese'}
        title={trilha.titulo}
        subtitle={trilha.descricao}
        align="left"
      />

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[var(--content-muted)]">Lidos na Bíblia</p>
          <p className="font-display text-2xl text-[var(--brand-default)]">{lidos}/{trilha.totalCapitulos}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[var(--content-muted)]">Perguntas respondidas</p>
          <p className="font-display text-2xl text-[var(--brand-default)]">{respondidos}/{trilha.totalCapitulos}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[var(--content-muted)]">Capítulos completos</p>
          <p className="font-display text-2xl text-[var(--brand-default)]">{completos}/{trilha.totalCapitulos}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-2">
        <strong className="text-[var(--content-primary)]">Critério:</strong> {trilha.criterio}
      </p>
      <p className="text-xs text-[var(--content-muted)] mb-8 leading-relaxed">
        Não há carga horária inventada. O progresso fica neste dispositivo. {progresso?.dataInicio && `Início: ${new Date(progresso.dataInicio).toLocaleDateString('pt-BR')}.`}
      </p>

      {proximo && (
        <Link
          href={hrefBiblia(trilha.livroAbrev, proximo)}
          className="mb-6 inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-[var(--brand-default)] text-sm font-semibold text-white"
        >
          <BookOpen className="w-4 h-4" /> Continuar no capítulo {proximo}
        </Link>
      )}

      <ol className="space-y-2 mb-12">
        {caps.map((cap) => {
          const lido = isChapterRead(trilha.livroAbrev, cap.capitulo);
          const respondido = capituloRespondido(trilha.slug, cap.capitulo);
          const ok = lido && respondido;
          const expandido = aberto === cap.capitulo;
          return (
            <li
              key={cap.capitulo}
              className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setAberto(expandido ? null : cap.capitulo)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left min-h-[52px]"
              >
                {ok ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-[var(--content-muted)] shrink-0" />
                )}
                <span className="font-mono text-xs text-[var(--brand-default)] w-8 shrink-0">{cap.capitulo}</span>
                <span className="flex-1 font-serif text-[15px] text-[var(--content-primary)]">{cap.titulo}</span>
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-[var(--content-muted)]">
                  {ok ? 'completo' : lido ? 'lido' : respondido ? 'respondido' : 'pendente'}
                </span>
                <ChevronDown className={`w-4 h-4 text-[var(--content-muted)] transition-transform ${expandido ? 'rotate-180' : ''}`} />
              </button>
              {expandido && (
                <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]/40 pt-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={hrefBiblia(trilha.livroAbrev, cap.capitulo)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-semibold"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Ler na Bíblia
                    </Link>
                    <Link
                      href={hrefGuia(trilha.livroAbrev, cap.capitulo)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg bg-[var(--surface-sunken)] text-xs font-semibold"
                    >
                      <Compass className="w-3.5 h-3.5" /> Abrir o guia
                    </Link>
                    <Link
                      href={`/estudos/${trilha.slug}`}
                      className="inline-flex items-center min-h-[44px] px-3 text-xs text-[var(--content-muted)] hover:underline"
                    >
                      Estudo panorâmico
                    </Link>
                  </div>
                  <RespostaCapituloTrilha trilha={trilha} capitulo={cap.capitulo} onSaved={recarregar} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <section className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-5 sm:p-6 space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--brand-default)]" />
          <h2 className="font-display text-xl">Certificado</h2>
        </div>
        {!pronta && (
          <p className="text-sm text-[var(--content-secondary)]">
            O certificado só é emitido quando os {trilha.totalCapitulos} capítulos estão lidos e respondidos.
            Faltam {trilha.totalCapitulos - completos}.
          </p>
        )}
        {pronta && !certificado && (
          <>
            <label className="block text-sm">
              <span className="text-[var(--content-muted)] text-xs uppercase tracking-wider">Nome no certificado</span>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 w-full min-h-[44px] rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)] px-3 text-[var(--content-primary)]"
                placeholder="Nome completo"
              />
            </label>
            {!autenticado && (
              <p className="text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed">
                Sem sessão (<code className="font-mono">ssb_token</code>), o nome é local neste dispositivo. O certificado
                atesta a conclusão da trilha no aparelho — não verifica identidade. Entre na conta se quiser o nome da sessão.
              </p>
            )}
            <button
              type="button"
              onClick={emitir}
              disabled={emitindo || nome.trim().length < 3}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[var(--brand-default)] text-sm font-semibold text-white disabled:opacity-50"
            >
              <Award className="w-4 h-4" /> Emitir certificado
            </button>
            {erroCert && <p className="text-xs text-red-500">{erroCert}</p>}
          </>
        )}
        {certificado && <DiplomaTrilha trilha={trilha} certificado={certificado} />}
      </section>
    </PageShell>
  );
}
