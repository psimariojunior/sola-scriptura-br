'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Check, Trash2, HardDrive, Wifi, WifiOff,
  ChevronRight, BookOpen, RefreshCw, Info, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  cacheTranslation, removeTranslation, isTranslationDownloaded,
  getOfflineStats, cacheAllTranslations, TRADUCOES_LOCAIS,
  type TraducaoLocalId
} from '@/lib/offline';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const TRADUCOES_INFO: Record<TraducaoLocalId, { nome: string; descricao: string; cor: string }> = {
  arc: { nome: 'Atualizada Revisada e Corrigida', descricao: 'Tradição evangélica', cor: '#6366f1' },
  nvi: { nome: 'Nova Versão Internacional', descricao: 'Mais lida do mundo', cor: '#10b981' },
  ara: { nome: 'Atualizada Revisada ao Falar do Dia', descricao: 'Tradição protestante', cor: '#f59e0b' },
  acf: { nome: 'Almeida Corrigida e Fiel', descricao: 'Clássica e fiel ao original', cor: '#ef4444' },
  kjv: { nome: 'King James Version', descricao: 'Referência em inglês', cor: '#8b5cf6' },
  web: { nome: 'World English Bible', descricao: 'Dominio público em inglês', cor: '#06b6d4' },
};

export default function OfflinePage() {
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, book: '' });
  const [stats, setStats] = useState({ totalChapters: 0, totalTranslations: 0, translations: {} as Record<string, number>, storageUsed: 0, lastSync: null as number | null });
  const [mounted, setMounted] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const s = await getOfflineStats();
      setStats(s);
      const d: Record<string, boolean> = {};
      for (const t of TRADUCOES_LOCAIS) {
        d[t] = s.translations[t] > 0;
      }
      setDownloaded(d);
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      loadStats();
    }
  }, [mounted, loadStats]);

  const handleDownload = async (traducao: TraducaoLocalId) => {
    setDownloading(traducao);
    setProgress({ current: 0, total: 0, book: '' });
    try {
      await cacheTranslation(traducao, (current, total) => {
        setProgress({ current, total, book: traducao.toUpperCase() });
      });
      await loadStats();
    } catch {}
    setDownloading(null);
  };

  const handleRemove = async (traducao: TraducaoLocalId) => {
    try {
      await removeTranslation(traducao);
      await loadStats();
    } catch {}
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    setProgress({ current: 0, total: 0, book: '' });
    try {
      await cacheAllTranslations((traducao, current, total) => {
        setProgress({ current, total, book: traducao.toUpperCase() });
      });
      await loadStats();
    } catch {}
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

  const allDownloaded = TRADUCOES_LOCAIS.every((t) => downloaded[t]);
  const anyDownloading = !!(downloading || downloadingAll);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
              <BookOpen size={18} style={{ color: 'var(--brand-default)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--content-muted)' }}>Gestão de Offline</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--content-primary)' }}>
              Bíblia Offline
            </h1>
            <p className="text-lg" style={{ color: 'var(--content-muted)' }}>
              Leia a Bíblia sem conexão com a internet
            </p>
          </div>
        </ScrollReveal>

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
                  {navigator.onLine ? <Wifi size={22} /> : <WifiOff size={22} />}
                </div>
                <div>
                  <h2 className="font-semibold text-lg" style={{ color: 'var(--content-primary)' }}>
                    {navigator.onLine ? 'Online' : 'Offline'}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--content-muted)' }}>
                    {stats.totalTranslations} versão(ões) baixada(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <HardDrive size={16} style={{ color: 'var(--brand-default)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--content-primary)' }}>
                    {formatBytes(stats.storageUsed)}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <BookOpen size={16} style={{ color: 'var(--brand-default)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--content-primary)' }}>
                    {stats.totalChapters} capítulos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <button
            onClick={handleDownloadAll}
            disabled={anyDownloading || allDownloaded}
            className={cn(
              "w-full rounded-2xl p-5 mb-8 flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300",
              allDownloaded ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"
            )}
            style={{
              background: allDownloaded
                ? 'var(--surface-raised)'
                : 'linear-gradient(135deg, var(--brand-default), #b8860b)',
              color: allDownloaded ? 'var(--content-muted)' : '#fff',
              border: `1px solid ${allDownloaded ? 'var(--border)' : 'transparent'}`,
              boxShadow: allDownloaded ? 'none' : '0 4px 20px rgba(184,134,11,0.3)',
            }}
          >
            {allDownloaded ? (
              <>
                <Check size={22} />
                Todas as versões já estão baixadas
              </>
            ) : anyDownloading ? (
              <>
                <RefreshCw size={22} className="animate-spin" />
                Baixando... {progress.total > 0 && `(${progress.current}/${progress.total})`}
              </>
            ) : (
              <>
                <Download size={22} />
                Baixar Todas as Versões Locais
                <span className="text-sm opacity-80 ml-2">6 traduções</span>
              </>
            )}
          </button>

          {anyDownloading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="rounded-xl p-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--content-muted)' }}>
                  <span>Baixando {progress.book || ''}</span>
                  <span>{progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {TRADUCOES_LOCAIS.map((traducao, i) => {
            const info = TRADUCOES_INFO[traducao];
            const isDownloaded = downloaded[traducao];
            const isCurrentlyDownloading = downloading === traducao;
            return (
              <ScrollReveal key={traducao} delay={0.2 + i * 0.05}>
                <div className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: 'var(--surface-raised)',
                    border: `1px solid ${isDownloaded ? info.cor + '40' : 'var(--border)'}`,
                    boxShadow: isDownloaded ? `0 0 0 1px ${info.cor}20, 0 4px 16px ${info.cor}10` : 'none',
                  }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg text-sm font-bold text-white"
                        style={{ background: info.cor }}>
                        {traducao.toUpperCase()}
                      </span>
                      {isDownloaded && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: info.cor + '20', color: info.cor }}>
                          <Check size={12} /> Baixada
                        </span>
                      )}
                    </div>
                    {isDownloaded && (
                      <button
                        onClick={() => handleRemove(traducao)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-500/10"
                        style={{ color: 'var(--content-muted)' }}
                        title="Remover"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--content-primary)' }}>
                    {info.nome}
                  </p>
                  <p className="text-xs mb-4" style={{ color: 'var(--content-muted)' }}>
                    {info.descricao}
                  </p>
                  {!isDownloaded && (
                    <button
                      onClick={() => handleDownload(traducao)}
                      disabled={anyDownloading}
                      className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110"
                      style={{
                        background: isCurrentlyDownloading
                          ? `${info.cor}20`
                          : info.cor + '15',
                        color: info.cor,
                        border: `1px solid ${info.cor}30`,
                      }}
                    >
                      {isCurrentlyDownloading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          Baixando...
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          Baixar {traducao.toUpperCase()}
                        </>
                      )}
                    </button>
                  )}
                  {isDownloaded && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--content-muted)' }}>
                      <HardDrive size={12} />
                      <span>
                        {stats.translations[traducao]
                          ? `${stats.translations[traducao]} capítulos`
                          : 'Baixada'}
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Info size={20} style={{ color: 'var(--brand-default)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--content-primary)' }}>
                Por que baixar?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-5 text-center" style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
              }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                  <WifiOff size={22} />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--content-primary)' }}>
                  Leitura Sem Internet
                </h3>
                <p className="text-sm" style={{ color: 'var(--content-muted)' }}>
                  Acesse a Bíblia em qualquer lugar, mesmo sem sinal
                </p>
              </div>
              <div className="rounded-xl p-5 text-center" style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
              }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                  <ChevronRight size={22} />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--content-primary)' }}>
                  Carregamento Instantâneo
                </h3>
                <p className="text-sm" style={{ color: 'var(--content-muted)' }}>
                  Capítulos abrem em menos de 1 segundo
                </p>
              </div>
              <div className="rounded-xl p-5 text-center" style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
              }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'var(--brand-default)15', color: 'var(--brand-default)' }}>
                  <Shield size={22} />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--content-primary)' }}>
                  Economia de Dados
                </h3>
                <p className="text-sm" style={{ color: 'var(--content-muted)' }}>
                  Não consome sua franquia de internet
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
