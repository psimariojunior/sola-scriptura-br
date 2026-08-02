'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileDown, FileText, Copy, Check, BookOpen, Users, MapPin, Calendar, Sparkles, Layers, Link2, MessageSquare } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';
import { getCrossReferencesByVerse, formatReference } from '@/data/biblia/crossReferences';

interface SecaoRelatorio {
  titulo: string;
  icone: typeof BookOpen;
  conteudo: string;
  itens?: string[];
}

export default function RelatorioExegesePage() {
  const [referencia, setReferencia] = useState('');
  const [livro, setLivro] = useState('');
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [traducao, setTraducao] = useState('nvi');
  const [gerado, setGerado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [secoes, setSecoes] = useState<SecaoRelatorio[]>([]);
  const conteudoRef = useRef<HTMLDivElement>(null);

  const gerarRelatorio = useCallback(async () => {
    if (!livro) return;

    const ref = `${livro} ${capitulo}:${versiculo}`;

    // Buscar referências cruzadas
    const refs = getCrossReferencesByVerse(livro, capitulo, versiculo);

    const novasSecoes: SecaoRelatorio[] = [
      {
        titulo: 'Dados da Passagem',
        icone: BookOpen,
        conteudo: `Referência: ${ref} (${traducao.toUpperCase()})`,
        itens: [
          `Livro: ${livro}`,
          `Capítulo: ${capitulo}`,
          `Versículo: ${versiculo}`,
          `Tradução: ${traducao.toUpperCase()}`,
        ],
      },
      {
        titulo: 'Contexto Histórico',
        icone: Calendar,
        conteudo: `Análise do contexto histórico e cultural da passagem ${ref}. Esta passagem precisa ser entendida no contexto do autor original, seu público, e o período histórico em que foi escrita.`,
        itens: [
          'Período de composição',
          'Audiência original',
          'Contexto político e social',
          'Tradições literárias',
        ],
      },
      {
        titulo: 'Análise Literária',
        icone: FileText,
        conteudo: `Identificação do gênero literário, estrutura do texto, figuras de linguagem e recursos retóricos utilizados pelo autor.`,
        itens: [
          'Gênero literário',
          'Estrutura do texto',
          'Figuras de linguagem',
          'Repetições e paralelismos',
        ],
      },
      {
        titulo: 'Exegese do Texto Original',
        icone: Layers,
        conteudo: `Análise das palavras-chave no original hebraico/grego. Consideração das nuances semânticas, uso em outros contextos bíblicos, e implicações para a interpretação.`,
        itens: [
          'Palavras-chave no original',
          'Análise semântica',
          'Uso em outros textos',
          'Variações textuais',
        ],
      },
      {
        titulo: 'Referências Cruzadas',
        icone: Link2,
        conteudo: `Passagens bíblicas relacionadas a ${ref}. Estas referências ajudam a compreender o tema em todo o cânon bíblico.`,
        itens: refs.length > 0
          ? refs.slice(0, 8).map(r => `${formatReference(r.to)} — ${r.description || r.type}`)
          : ['Nenhuma referência cruzada encontrada para este versículo.'],
      },
      {
        titulo: 'Teologia Sistemática',
        icone: Sparkles,
        conteudo: `Conexões com as grandes doutrinas da fé cristã. Esta passagem contribui para a compreensão de qual área da teologia sistemática?`,
        itens: [
          'Teologia Própria (Deus)',
          'Antropologia (ser humano)',
          'Hamartiologia (pecado)',
          'Soteriologia (salvação)',
          'Escatologia (últimas coisas)',
        ],
      },
      {
        titulo: 'Aplicação Prática',
        icone: Users,
        conteudo: `Como esta passagem se aplica à vida do crente hoje? Princípios práticos derivados da exegese fiel do texto.`,
        itens: [
          'Para a vida cristã individual',
          'Para a igreja local',
          'Para a missão cristã',
          'Para o discipulado',
        ],
      },
      {
        titulo: 'Comentários Clássicos',
        icone: MessageSquare,
        conteudo: `Resumo das principais interpretações de teólogos e exegetas ao longo da história da igreja.`,
        itens: [
          'Comentários patrísticos',
          'Reforma Protestante',
          'Exegese moderna',
          'Consenso contemporâneo',
        ],
      },
    ];

    setSecoes(novasSecoes);
    setGerado(true);
  }, [livro, capitulo, versiculo, traducao]);

  const handleCopiar = useCallback(() => {
    let texto = `RELATÓRIO EXEGÉTICO\n${'='.repeat(50)}\n\n`;
    for (const s of secoes) {
      texto += `${s.titulo.toUpperCase()}\n${'-'.repeat(30)}\n`;
      texto += `${s.conteudo}\n\n`;
      if (s.itens) {
        for (const item of s.itens) {
          texto += `  • ${item}\n`;
        }
        texto += '\n';
      }
    }
    texto += `\nGerado por Sola Scriptura BR — ${new Date().toLocaleDateString('pt-BR')}`;
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }, [secoes]);

  const handleExportarHTML = useCallback(() => {
    let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório Exegético — ${livro} ${capitulo}:${versiculo}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; line-height: 1.8; }
    h1 { color: #8b6914; border-bottom: 2px solid #8b6914; padding-bottom: 10px; }
    h2 { color: #2c2416; margin-top: 30px; }
    .meta { color: #666; font-style: italic; margin-bottom: 20px; }
    .section { margin-bottom: 25px; padding: 15px; background: #faf8f5; border-radius: 8px; border-left: 3px solid #8b6914; }
    .items { margin-top: 10px; }
    .items li { margin-bottom: 5px; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #ddd; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <h1>Relatório Exegético</h1>
  <p class="meta">${livro} ${capitulo}:${versiculo} (${traducao.toUpperCase()}) — ${new Date().toLocaleDateString('pt-BR')}</p>\n`;

    for (const s of secoes) {
      html += `  <div class="section">\n    <h2>${s.titulo}</h2>\n    <p>${s.conteudo}</p>\n`;
      if (s.itens) {
        html += `    <ul class="items">\n`;
        for (const item of s.itens) {
          html += `      <li>${item}</li>\n`;
        }
        html += `    </ul>\n`;
      }
      html += `  </div>\n`;
    }

    html += `  <div class="footer">Gerado por Sola Scriptura BR — solascripturabr.com.br</div>\n</body>\n</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exegese-${livro}-${capitulo}-${versiculo}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [secoes, livro, capitulo, versiculo, traducao]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-semibold mb-4">
              <FileDown className="w-3.5 h-3.5" />
              Relatório Exegético
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-3">
              Gere seu <span className="text-[var(--brand-default)]">Relatório</span>
            </h1>
            <p className="text-[var(--content-secondary)] max-w-lg mx-auto">
              Crie um relatório exegético completo para qualquer versículo. Inclui contexto histórico,
              análise literária, referências cruzadas, teologia e aplicações práticas.
            </p>
          </div>
        </ScrollReveal>

        {/* Input */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">Livro (abreviação)</label>
                <input
                  type="text"
                  value={livro}
                  onChange={e => setLivro(e.target.value.toLowerCase())}
                  placeholder="ex: jo, rm, gn"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">Tradução</label>
                <select
                  value={traducao}
                  onChange={e => setTraducao(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                >
                  <option value="nvi">NVI</option>
                  <option value="arc">ARC</option>
                  <option value="ara">ARA</option>
                  <option value="acf">ACF</option>
                  <option value="kjv">KJV</option>
                  <option value="web">WEB</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">Capítulo</label>
                <input
                  type="number"
                  min={1}
                  value={capitulo}
                  onChange={e => setCapitulo(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--content-secondary)] mb-1.5 block">Versículo</label>
                <input
                  type="number"
                  min={1}
                  value={versiculo}
                  onChange={e => setVersiculo(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
                />
              </div>
            </div>

            <button
              onClick={gerarRelatorio}
              disabled={!livro}
              className={cn(
                'w-full py-3 rounded-xl font-semibold text-sm transition-all',
                livro
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]'
                  : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] cursor-not-allowed'
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Gerar Relatório Exegético
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* Resultado */}
        {gerado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Botões de exportação */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleCopiar}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--brand-subtle)] transition-colors text-sm font-medium text-[var(--content-secondary)]"
              >
                {copiado ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copiado ? 'Copiado!' : 'Copiar Texto'}
              </button>
              <button
                onClick={handleExportarHTML}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--brand-subtle)] hover:bg-[var(--brand-default)] transition-colors text-sm font-medium text-[var(--brand-default)] hover:text-white"
              >
                <FileDown className="w-4 h-4" />
                Exportar HTML
              </button>
            </div>

            {/* Conteúdo do relatório */}
            <div ref={conteudoRef} className="space-y-4">
              {secoes.map((s, i) => {
                const Icon = s.icone;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-5 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--brand-subtle)] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[var(--brand-default)]" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--content-primary)]">{s.titulo}</h3>
                    </div>
                    <p className="text-sm text-[var(--content-secondary)] leading-relaxed font-serif mb-3">
                      {s.conteudo}
                    </p>
                    {s.itens && (
                      <div className="space-y-1.5">
                        {s.itens.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-[var(--content-secondary)]">
                            <span className="text-[var(--brand-default)] mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-[10px] text-[var(--content-muted)]">
              Gerado por Sola Scriptura BR — {new Date().toLocaleDateString('pt-BR')}
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
