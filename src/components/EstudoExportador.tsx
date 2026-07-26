'use client';

import { useState, useCallback } from 'react';
import { FileDown, FileText, Loader2, Check, BookOpen, MessageSquare, Tag, Download } from 'lucide-react';
import { listarFavoritos, type MarcaBiblia } from '@/lib/estudos';
import { listarMarcadores, CORES, type CorMarcador } from '@/lib/marcadores';

interface ExportItem {
  titulo: string;
  conteudo: string;
  tipo: 'versiculo' | 'nota' | 'anotacao' | 'colecao' | 'favorito';
  cor?: string;
  referencia?: string;
  data?: string;
}

const CORES_LABELS: Record<string, string> = {
  yellow: 'Amarelo',
  green: 'Verde',
  blue: 'Azul',
  pink: 'Rosa',
  orange: 'Laranja',
  purple: 'Roxo',
};

function carregarNotas(): ExportItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ssb_notas_rich');
    if (!raw) return [];
    const notas = JSON.parse(raw);
    return notas.map((n: { titulo: string; conteudo: string; tags: string[]; dataAtualizacao: string }) => ({
      titulo: n.titulo || 'Sem título',
      conteudo: n.conteudo || '',
      tipo: 'nota' as const,
      cor: undefined,
      referencia: n.tags?.join(', '),
      data: n.dataAtualizacao,
    }));
  } catch { return []; }
}

function carregarFavoritos(): ExportItem[] {
  const favs = listarFavoritos();
  return favs.map((f: MarcaBiblia) => ({
    titulo: `${f.livro} ${f.capitulo}:${f.versiculo}`,
    conteudo: f.texto || '',
    tipo: 'favorito' as const,
    cor: f.cor || undefined,
    referencia: `${f.livro} ${f.capitulo}:${f.versiculo} (${f.traducao})`,
    data: new Date(f.dataCriacao).toISOString(),
  }));
}

function carregarMarcadores(): ExportItem[] {
  const marks = listarMarcadores();
  return marks.map((m) => ({
    titulo: `${m.livro} ${m.capitulo}:${m.versiculo}`,
    conteudo: `Marcado em ${CORES_LABELS[m.cor] || m.cor}`,
    tipo: 'versiculo' as const,
    cor: m.cor,
    referencia: `${m.livro} ${m.capitulo}:${m.versiculo} (${m.traducao})`,
    data: new Date(m.data).toISOString(),
  }));
}

function carregarAnotacoes(): ExportItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('sola-estudos');
    if (!raw) return [];
    const data = JSON.parse(raw);
    const items: ExportItem[] = [];
    if (data?.marcas) {
      for (const [, marca] of Object.entries(data.marcas)) {
        const m = marca as { livro?: string; capitulo?: number; versiculo?: number; traducao?: string; anotacao?: { texto: string; data: number } };
        if (m.anotacao?.texto) {
          items.push({
            titulo: `Nota: ${m.livro} ${m.capitulo}:${m.versiculo}`,
            conteudo: m.anotacao.texto,
            tipo: 'anotacao',
            referencia: `${m.livro} ${m.capitulo}:${m.versiculo} (${m.traducao})`,
            data: new Date(m.anotacao.data).toISOString(),
          });
        }
      }
    }
    return items;
  } catch { return []; }
}

function carregarColecoes(): ExportItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ssb_colecoes');
    if (!raw) return [];
    const colecoes = JSON.parse(raw);
    return colecoes.map((c: { nome: string; descricao: string; versiculos: { referencia: string; texto: string }[] }) => ({
      titulo: `Coleção: ${c.nome}`,
      conteudo: c.versiculos?.map((v: { referencia: string; texto: string }) => `${v.referencia} — ${v.texto}`).join('\n') || c.descricao || '',
      tipo: 'colecao' as const,
      referencia: c.descricao,
    }));
  } catch { return []; }
}

function gerarHTML(items: ExportItem[], titulo: string): string {
  const grouped = items.reduce<Record<string, ExportItem[]>>((acc, item) => {
    const key = item.tipo;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    versiculo: 'Versículos Marcados',
    favorito: 'Favoritos',
    anotacao: 'Anotações Pessoais',
    nota: 'Notas',
    colecao: 'Coleções',
  };

  let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${titulo}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 3px solid #d4a843; }
    .header h1 { font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #2d2319; margin-bottom: 8px; }
    .header .subtitle { color: #8b7355; font-size: 14px; }
    .section { margin-bottom: 40px; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #2d2319; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #d4a843; display: flex; align-items: center; gap: 8px; }
    .item { background: #fafaf7; border: 1px solid #e8e0d0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .item-title { font-weight: 600; color: #2d2319; font-size: 14px; }
    .item-ref { font-size: 12px; color: #8b7355; }
    .item-content { font-family: 'Cormorant Garamond', serif; font-size: 18px; line-height: 1.7; color: #3d3024; }
    .item-note { font-family: 'Inter', sans-serif; font-size: 14px; color: #5a4d3e; background: #f5f0e5; padding: 12px; border-radius: 6px; margin-top: 8px; }
    .color-badge { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 6px; }
    .footer { text-align: center; margin-top: 48px; padding-top: 24px; border-top: 2px solid #e8e0d0; color: #8b7355; font-size: 12px; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
    .stat { text-align: center; padding: 16px; background: linear-gradient(135deg, #d4a84315, #d4a84308); border-radius: 8px; }
    .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: #d4a843; }
    .stat-label { font-size: 11px; color: #8b7355; text-transform: uppercase; letter-spacing: 0.5px; }
    @media print { body { padding: 20px; } .item { break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>📖 ${titulo}</h1>
    <p class="subtitle">Exportado em ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
  </div>
  <div class="stats">
    <div class="stat"><div class="stat-value">${items.length}</div><div class="stat-label">Total</div></div>
    <div class="stat"><div class="stat-value">${items.filter(i => i.tipo === 'favorito').length}</div><div class="stat-label">Favoritos</div></div>
    <div class="stat"><div class="stat-value">${items.filter(i => i.tipo === 'anotacao').length}</div><div class="stat-label">Anotações</div></div>
    <div class="stat"><div class="stat-value">${items.filter(i => i.tipo === 'nota').length}</div><div class="stat-label">Notas</div></div>
  </div>`;

  const order: ExportItem['tipo'][] = ['favorito', 'anotacao', 'nota', 'colecao', 'versiculo'];
  const icons: Record<string, string> = { versiculo: '🖍️', favorito: '❤️', anotacao: '📝', nota: '📋', colecao: '📚' };

  for (const tipo of order) {
    const group = grouped[tipo];
    if (!group || group.length === 0) continue;

    html += `<div class="section"><h2 class="section-title">${icons[tipo]} ${typeLabels[tipo]} (${group.length})</h2>`;
    for (const item of group) {
      const colorBadge = item.cor ? `<span class="color-badge" style="background: var(--mark-${item.cor}, #d4a843)"></span>` : '';
      html += `<div class="item">
        <div class="item-header">
          <span class="item-title">${colorBadge}${item.titulo}</span>
          ${item.referencia ? `<span class="item-ref">${item.referencia}</span>` : ''}
        </div>
        <div class="item-content">"${item.conteudo}"</div>
        ${item.tipo === 'anotacao' ? `<div class="item-note">${item.conteudo}</div>` : ''}
      </div>`;
    }
    html += `</div>`;
  }

  html += `<div class="footer"><p>Gerado por Sola Scriptura BR — solascripturabr.com.br</p><p>"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho." — Salmos 119:105</p></div></body></html>`;

  return html;
}

function gerarTextoPlano(items: ExportItem[], titulo: string): string {
  let text = `${titulo}\n${'='.repeat(60)}\nExportado em ${new Date().toLocaleDateString('pt-BR')}\n\n`;

  const typeLabels: Record<string, string> = {
    versiculo: 'VERSÍCULOS MARCADOS',
    favorito: 'FAVORITOS',
    anotacao: 'ANOTAÇÕES PESSOAIS',
    nota: 'NOTAS',
    colecao: 'COLEÇÕES',
  };

  const order: ExportItem['tipo'][] = ['favorito', 'anotacao', 'nota', 'colecao', 'versiculo'];

  for (const tipo of order) {
    const group = items.filter(i => i.tipo === tipo);
    if (group.length === 0) continue;

    text += `\n${typeLabels[tipo]} (${group.length})\n${'-'.repeat(40)}\n\n`;

    for (const item of group) {
      text += `• ${item.titulo}`;
      if (item.referencia) text += ` — ${item.referencia}`;
      text += `\n  "${item.conteudo}"\n\n`;
    }
  }

  text += `\n${'='.repeat(60)}\nGerado por Sola Scriptura BR\n`;
  return text;
}

export interface ExportOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EstudoExportador({ open, onOpenChange }: ExportOptions) {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    favoritos: true,
    anotacoes: true,
    notas: true,
    colecoes: true,
    marcadores: true,
  });

  const toggleType = useCallback((key: string) => {
    setSelectedTypes(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const coletarItens = useCallback((): ExportItem[] => {
    const items: ExportItem[] = [];
    if (selectedTypes.favoritos) items.push(...carregarFavoritos());
    if (selectedTypes.anotacoes) items.push(...carregarAnotacoes());
    if (selectedTypes.notas) items.push(...carregarNotas());
    if (selectedTypes.colecoes) items.push(...carregarColecoes());
    if (selectedTypes.marcadores) items.push(...carregarMarcadores());
    return items;
  }, [selectedTypes]);

  const exportarPDF = useCallback(async () => {
    setExporting(true);
    try {
      const items = coletarItens();
      if (items.length === 0) {
        setExporting(false);
        return;
      }

      const html = gerarHTML(items, 'Meus Estudos Bíblicos');
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      if (win) {
        win.onload = () => {
          win.print();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        };
      }
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  }, [coletarItens]);

  const exportarTexto = useCallback(async () => {
    setExporting(true);
    try {
      const items = coletarItens();
      if (items.length === 0) {
        setExporting(false);
        return;
      }

      const texto = gerarTextoPlano(items, 'Meus Estudos Bíblicos');
      const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `estudos-sola-scriptura-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  }, [coletarItens]);

  const exportarJSON = useCallback(async () => {
    setExporting(true);
    try {
      const items = coletarItens();
      if (items.length === 0) {
        setExporting(false);
        return;
      }

      const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `estudos-sola-scriptura-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  }, [coletarItens]);

  if (!open) return null;

  const types = [
    { key: 'favoritos', label: 'Favoritos', icon: '❤️' },
    { key: 'anotacoes', label: 'Anotações', icon: '📝' },
    { key: 'notas', label: 'Notas', icon: '📋' },
    { key: 'colecoes', label: 'Coleções', icon: '📚' },
    { key: 'marcadores', label: 'Marcadores', icon: '🖍️' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--content-primary)]">Exportar Estudos</h2>
                <p className="text-xs text-[var(--content-muted)]">Salve seus estudos localmente</p>
              </div>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
              <FileDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {types.map(t => (
              <label key={t.key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--surface-sunken)]/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedTypes[t.key] || false}
                  onChange={() => toggleType(t.key)}
                  className="w-4 h-4 rounded border-[var(--border)] text-amber-500 focus:ring-amber-500"
                />
                <span className="text-lg">{t.icon}</span>
                <span className="text-sm font-medium text-[var(--content-primary)]">{t.label}</span>
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <button
              onClick={exportarPDF}
              disabled={exporting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : exported ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              {exported ? 'Abrindo...' : 'Exportar para PDF/Imprimir'}
            </button>

            <button
              onClick={exportarTexto}
              disabled={exporting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] transition-all disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              Exportar como Texto (.txt)
            </button>

            <button
              onClick={exportarJSON}
              disabled={exporting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Exportar como JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
