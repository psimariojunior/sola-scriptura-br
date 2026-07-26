'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Check, Trash2, HardDrive, Wifi, WifiOff,
  ChevronRight, ChevronDown, ChevronUp, BookOpen, RefreshCw, Info, Shield,
  Globe, Zap, CloudOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  cacheTranslation, removeTranslation, isTranslationDownloaded,
  getOfflineStats, cacheAllTranslations, TRADUCOES_LOCAIS,
  downloadApiTranslation, type TraducaoLocalId
} from '@/lib/offline';
import { traducoes } from '@/data/biblia/versoes';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

interface TraducaoInfo {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  cor: string;
  tipo: 'local' | 'api';
  idioma: string;
  tamanho?: string;
}

const ALL_TRANSLATIONS: TraducaoInfo[] = [
  // Locais — instantâneo, ~4MB cada
  { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC', descricao: 'Tradição evangélica clássica', cor: '#6366f1', tipo: 'local', idioma: 'pt', tamanho: '~4 MB' },
  { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI', descricao: 'Mais lida do mundo', cor: '#10b981', tipo: 'local', idioma: 'pt', tamanho: '~4 MB' },
  { id: 'ara', nome: 'Almeida Revista e Atualizada', sigla: 'ARA', descricao: 'Revisão pela SBB', cor: '#f59e0b', tipo: 'local', idioma: 'pt', tamanho: '~4 MB' },
  { id: 'acf', nome: 'Almeida Corrigida Fiel', sigla: 'ACF', descricao: 'Fiel ao original hebraico/grego', cor: '#ef4444', tipo: 'local', idioma: 'pt', tamanho: '~4 MB' },
  { id: 'kjv', nome: 'King James Version', sigla: 'KJV', descricao: 'Referência em inglês', cor: '#8b5cf6', tipo: 'local', idioma: 'en', tamanho: '~4 MB' },
  { id: 'web', nome: 'World English Bible', sigla: 'WEB', descricao: 'Domínio público em inglês', cor: '#06b6d4', tipo: 'local', idioma: 'en', tamanho: '~4 MB' },

  // API — baixam da Midvash, precisam de internet uma vez
  { id: 'naa', nome: 'Nova Almeida Atualizada', sigla: 'NAA', descricao: 'Atualização contemporânea', cor: '#f97316', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'ntlh', nome: 'Nova Tradução na Linguagem de Hoje', sigla: 'NTLH', descricao: 'Linguagem simples e acessível', cor: '#14b8a6', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'nvt', nome: 'Nova Versão Transformadora', sigla: 'NVT', descricao: 'Enfatiza transformação', cor: '#a855f7', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'kja', nome: 'King James Atualizada', sigla: 'KJA', descricao: 'KJV em português moderno', cor: '#e11d48', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'aa', nome: 'Almeida e Atualizada', sigla: 'AA', descricao: 'Versão atualizada da Almeida', cor: '#0ea5e9', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'nbv', nome: 'Nova Bíblia Viva', sigla: 'NBV', descricao: 'Contemporânea e acessível', cor: '#84cc16', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'as21', nome: 'Almeida Século 21', sigla: 'AS21', descricao: 'Linguagem do século 21', cor: '#d946ef', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'jfaa', nome: 'João Ferreira de Almeida Atualizada', sigla: 'JFAA', descricao: 'Revisão contemporânea', cor: '#f43f5e', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'kjf', nome: 'King James Fiel', sigla: 'KJF', descricao: 'Fiel da KJV em português', cor: '#7c3aed', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'msgpt', nome: 'A Mensagem', sigla: 'MSG', descricao: 'Paráfrase de Eugene Peterson', cor: '#059669', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'bpm', nome: 'Bíblia Portuguesa Mundial', sigla: 'BPM', descricao: 'Português acessível', cor: '#2563eb', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'nva', nome: 'Nova Versão de Acesso Livre', sigla: 'NVA', descricao: 'Domínio público', cor: '#ca8a04', tipo: 'api', idioma: 'pt', tamanho: '~3 MB' },
  { id: 'esv', nome: 'English Standard Version', sigla: 'ESV', descricao: 'Inglês acadêmica', cor: '#9333ea', tipo: 'api', idioma: 'en', tamanho: '~3 MB' },
  { id: 'niv', nome: 'New International Version', sigla: 'NIV', descricao: 'Inglês popular', cor: '#dc2626', tipo: 'api', idioma: 'en', tamanho: '~3 MB' },
  { id: 'nkjv', nome: 'New King James Version', sigla: 'NKJV', descricao: 'KJV em inglês moderno', cor: '#0284c7', tipo: 'api', idioma: 'en', tamanho: '~3 MB' },
  { id: 'nlt', nome: 'New Living Translation', sigla: 'NLT', descricao: 'Linguagem acessível', cor: '#16a34a', tipo: 'api', idioma: 'en', tamanho: '~3 MB' },
  { id: 'rvr1960', nome: 'Reina-Valera 1960', sigla: 'RVR60', descricao: 'Espanhol clássica', cor: '#ea580c', tipo: 'api', idioma: 'es', tamanho: '~3 MB' },
  { id: 'lsg', nome: 'Louis Segond', sigla: 'LSG', descricao: 'Francês clássica', cor: '#4f46e5', tipo: 'api', idioma: 'fr', tamanho: '~3 MB' },
];

const IDIOMA_LABELS: Record<string, string> = {
  pt: 'Português',
  en: 'Inglês',
  es: 'Espanhol',
  fr: 'Francês',
};

export default function OfflinePage() {
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, book: '' });
  const [stats, setStats] = useState({ totalChapters: 0, totalTranslations: 0, translations: {} as Record<string, number>, storageUsed: 0, lastSync: null as number | null });
  const [mounted, setMounted] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [showLocal, setShowLocal] = useState(true);
  const [showApi, setShowApi] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const loadStats = useCallback(async () => {
    try {
      const s = await getOfflineStats();
      setStats(s);
      const d: Record<string, boolean> = {};
      for (const t of ALL_TRANSLATIONS) {
        d[t.id] = (s.translations[t.id] || 0) > 0;
      }
      setDownloaded(d);
    } catch {}
  }, []);

  useEffect(() => { if (mounted) loadStats(); }, [mounted, loadStats]);

  const handleDownload = async (traducao: TraducaoInfo) => {
    if (downloading) return;
    setDownloading(traducao.id);
    setProgress({ current: 0, total: 0, book: traducao.sigla });
    abortRef.current = new AbortController();

    try {
      if (traducao.tipo === 'local') {
        await cacheTranslation(traducao.id, (current, total) => {
          setProgress({ current, total, book: traducao.sigla });
        });
      } else {
        await downloadApiTranslation(traducao.id, (book, chapter, total) => {
          setProgress(prev => ({ current: prev.current + 1, total, book: `${traducao.sigla} — ${book.toUpperCase()}` }));
        }, abortRef.current.signal);
      }
      await loadStats();
    } catch {}
    setDownloading(null);
    setProgress({ current: 0, total: 0, book: '' });
  };

  const handleRemove = async (traducaoId: string) => {
    await removeTranslation(traducaoId);
    await loadStats();
  };

  const handleDownloadAllLocal = async () => {
    if (downloadingAll) return;
    setDownloadingAll(true);
    setProgress({ current: 0, total: 0, book: '' });
    await cacheAllTranslations((trad, current, total) => {
      setProgress({ current, total, book: trad.toUpperCase() });
    });
    setDownloadingAll(false);
    await loadStats();
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setDownloading(null);
    setDownloadingAll(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (!mounted) return null;

  const localTranslations = ALL_TRANSLATIONS.filter(t => t.tipo === 'local');
  const apiTranslations = ALL_TRANSLATIONS.filter(t => t.tipo === 'api');
  const downloadedCount = Object.values(downloaded).filter(Boolean).length;
  const anyDownloading = !!(downloading || downloadingAll);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
              <CloudOff size={18} style={{ color: 'var(--brand-default)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--content-muted)' }}>Bíblia Offline</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--content-primary)' }}>
              Baixar Versões
            </h1>
            <p className="text-lg" style={{ color: 'var(--content-muted)' }}>
              24 traduções disponíveis — baixe e leia sem internet
            </p>
          </div>
        </ScrollReveal>

        {/* Status Card */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl p-6 mb-8" style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--brand-default)', color: '#fff' }}>
                  {typeof navigator !== 'undefined' && navigator.onLine ? <Wifi size={22} /> : <WifiOff size={22} />}
                </div>
                <div>
                  <h2 className="font-semibold text-lg" style={{ color: 'var(--content-primary)' }}>
                    {downloadedCount}/{ALL_TRANSLATIONS.length} versões baixadas
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--content-muted)' }}>
                    {stats.totalChapters.toLocaleString('pt-BR')} capítulos · {formatBytes(stats.storageUsed)}
                  </p>
                </div>
              </div>
              <Link href="/biblia"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: 'var(--brand-default)', color: '#fff' }}>
                <BookOpen size={16} /> Abrir Bíblia
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Download All Locals */}
        <ScrollReveal delay={0.15}>
          <button
            onClick={handleDownloadAllLocal}
            disabled={anyDownloading}
            className={cn(
              "w-full rounded-2xl p-5 mb-6 flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300",
              anyDownloading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"
            )}
            style={{
              background: anyDownloading
                ? 'var(--surface-raised)'
                : 'linear-gradient(135deg, var(--brand-default), #b8860b)',
              color: anyDownloading ? 'var(--content-muted)' : '#fff',
              border: `1px solid ${anyDownloading ? 'var(--border)' : 'transparent'}`,
              boxShadow: anyDownloading ? 'none' : '0 4px 20px rgba(184,134,11,0.3)',
            }}
          >
            {anyDownloading ? (
              <>
                <RefreshCw size={22} className="animate-spin" />
                Baixando {progress.book}... {progress.total > 0 && `(${progress.current}/${progress.total})`}
              </>
            ) : (
              <>
                <Zap size={22} />
                Baixar Todas as Versões Locais (6)
                <span className="text-sm opacity-80 ml-2">~24 MB</span>
              </>
            )}
          </button>

          {/* Progress Bar */}
          <AnimatePresence>
            {anyDownloading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--content-primary)' }}>
                      {progress.book}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: 'var(--content-muted)' }}>
                        {progress.total > 0 ? `${progress.current}/${progress.total} capítulos` : 'Iniciando...'}
                      </span>
                      <button onClick={handleCancel}
                        className="text-xs font-medium px-2 py-1 rounded-lg transition-colors"
                        style={{ color: '#ef4444', background: '#ef444410' }}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--brand-default), #fbbf24)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        {/* Local Translations */}
        <ScrollReveal delay={0.2}>
          <div className="mb-6">
            <button onClick={() => setShowLocal(!showLocal)}
              className="flex items-center gap-2 w-full text-left mb-3 group">
              {showLocal ? <ChevronUp size={16} style={{ color: 'var(--content-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--content-muted)' }} />}
              <Globe size={16} style={{ color: 'var(--brand-default)' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>
                Versões Locais — Instantâneo
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                {localTranslations.filter(t => downloaded[t.id]).length}/{localTranslations.length}
              </span>
            </button>

            <AnimatePresence>
              {showLocal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden"
                >
                  {localTranslations.map((t) => {
                    const isDown = downloaded[t.id];
                    const isCurrentDL = downloading === t.id;
                    return (
                      <div key={t.id} className="rounded-xl p-4 transition-all duration-200"
                        style={{
                          background: 'var(--surface-raised)',
                          border: `1px solid ${isDown ? t.cor + '40' : 'var(--border)'}`,
                        }}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white"
                              style={{ background: t.cor }}>
                              {t.sigla}
                            </span>
                            {isDown && (
                              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                                style={{ background: t.cor + '20', color: t.cor }}>
                                <Check size={10} /> Baixada
                              </span>
                            )}
                          </div>
                          {isDown && (
                            <button onClick={() => handleRemove(t.id)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                              style={{ color: 'var(--content-muted)' }} title="Remover">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--content-primary)' }}>{t.nome}</p>
                        <p className="text-[11px] mb-3" style={{ color: 'var(--content-muted)' }}>{t.descricao}</p>
                        {!isDown ? (
                          <button onClick={() => handleDownload(t)} disabled={anyDownloading}
                            className="w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all hover:brightness-110"
                            style={{ background: t.cor + '15', color: t.cor, border: `1px solid ${t.cor}30` }}>
                            {isCurrentDL ? (
                              <><RefreshCw size={12} className="animate-spin" /> Baixando...</>
                            ) : (
                              <><Download size={12} /> Baixar</>
                            )}
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--content-muted)' }}>
                            <HardDrive size={10} />
                            {stats.translations[t.id] ? `${stats.translations[t.id]} capítulos` : 'Disponível offline'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* API Translations */}
        <ScrollReveal delay={0.25}>
          <div className="mb-8">
            <button onClick={() => setShowApi(!showApi)}
              className="flex items-center gap-2 w-full text-left mb-3">
              {showApi ? <ChevronUp size={16} style={{ color: 'var(--content-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--content-muted)' }} />}
              <CloudOff size={16} style={{ color: 'var(--brand-default)' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--content-muted)' }}>
                Versões Online — Requer Internet para Baixar
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                {apiTranslations.filter(t => downloaded[t.id]).length}/{apiTranslations.length}
              </span>
            </button>

            <AnimatePresence>
              {showApi && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {Object.entries(
                    apiTranslations.reduce((acc, t) => {
                      const lang = IDIOMA_LABELS[t.idioma] || t.idioma;
                      if (!acc[lang]) acc[lang] = [];
                      acc[lang].push(t);
                      return acc;
                    }, {} as Record<string, TraducaoInfo[]>)
                  ).map(([idioma, trads]) => (
                    <div key={idioma} className="mb-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 ml-1"
                        style={{ color: 'var(--content-muted)' }}>
                        {idioma} ({trads.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {trads.map((t) => {
                          const isDown = downloaded[t.id];
                          const isCurrentDL = downloading === t.id;
                          return (
                            <div key={t.id} className="rounded-xl p-3 transition-all duration-200"
                              style={{
                                background: 'var(--surface-raised)',
                                border: `1px solid ${isDown ? t.cor + '40' : 'var(--border)'}`,
                              }}>
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                                    style={{ background: t.cor }}>
                                    {t.sigla}
                                  </span>
                                  {isDown && <Check size={12} style={{ color: '#10b981' }} />}
                                </div>
                                {isDown && (
                                  <button onClick={() => handleRemove(t.id)}
                                    className="p-1 rounded hover:bg-red-500/10 transition-colors"
                                    style={{ color: 'var(--content-muted)' }}>
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                              <p className="text-xs font-medium truncate" style={{ color: 'var(--content-primary)' }}>{t.nome}</p>
                              <p className="text-[10px] truncate" style={{ color: 'var(--content-muted)' }}>{t.descricao}</p>
                              {!isDown && (
                                <button onClick={() => handleDownload(t)} disabled={anyDownloading}
                                  className="w-full mt-2 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all hover:brightness-110"
                                  style={{ background: t.cor + '15', color: t.cor, border: `1px solid ${t.cor}30` }}>
                                  {isCurrentDL ? (
                                    <><RefreshCw size={10} className="animate-spin" /> {progress.total > 0 ? `${Math.round((progress.current / progress.total) * 100)}%` : '...'}</>
                                  ) : (
                                    <><Download size={10} /> Baixar</>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Info Section */}
        <ScrollReveal delay={0.3}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Info size={18} style={{ color: 'var(--brand-default)' }} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--content-primary)' }}>
                Como funciona?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Zap, title: 'Versões Locais', desc: 'ARC, NVI, ARA, ACF, KJV, WEB — baixam instantaneamente do app' },
                { icon: CloudOff, title: 'Versões Online', desc: 'As outras 18 traduções baixam da internet uma vez e ficam salvas' },
                { icon: Shield, title: 'Sem Limite', desc: 'Baixe todas as 24 traduções — ocupam ~80 MB no total' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center"
                    style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--content-primary)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--content-muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
