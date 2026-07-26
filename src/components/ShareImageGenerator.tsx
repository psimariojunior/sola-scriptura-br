'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, Share2, Palette, Type, Sparkles } from 'lucide-react';

interface TemplateConfig {
  id: string;
  nome: string;
  descricao: string;
  bg1: string;
  bg2: string;
  textColor: string;
  accentColor: string;
  font: string;
  style: 'classic' | 'minimal' | 'bold' | 'serif' | 'modern';
}

const TEMPLATES: TemplateConfig[] = [
  { id: 'classico', nome: 'Clássico', descricao: 'Dourado e escuro', bg1: '#1a1612', bg2: '#2d2319', textColor: '#f5e6c8', accentColor: '#d4a843', font: 'Georgia, serif', style: 'classic' },
  { id: 'minimalista', nome: 'Minimalista', descricao: 'Limpo e moderno', bg1: '#ffffff', bg2: '#f8f8f8', textColor: '#1a1a1a', accentColor: '#333333', font: 'system-ui, sans-serif', style: 'minimal' },
  { id: 'pergaminho', nome: 'Pergaminho', descricao: 'Clássico e acolhedor', bg1: '#f4e8c1', bg2: '#e8d5a3', textColor: '#3d2b1f', accentColor: '#8b4513', font: 'Georgia, serif', style: 'serif' },
  { id: 'gradiente', nome: 'Gradiente', descricao: 'Vibrante e ousado', bg1: '#667eea', bg2: '#764ba2', textColor: '#ffffff', accentColor: '#ffd700', font: 'system-ui, sans-serif', style: 'bold' },
  { id: 'natureza', nome: 'Natureza', descricao: 'Verde e sereno', bg1: '#134e5e', bg2: '#2d6a4f', textColor: '#d4e7c5', accentColor: '#95d5b2', font: 'Georgia, serif', style: 'serif' },
  { id: 'noite', nome: 'Noite Estrelada', descricao: 'Azul profundo', bg1: '#0f0c29', bg2: '#302b63', textColor: '#e0d4ff', accentColor: '#a78bfa', font: 'Georgia, serif', style: 'classic' },
];

const FRASES_DESTAQUE = [
  'Palavra viva e eficaz',
  'Lâmpada para meus pés',
  'Renovarão as forças',
  'Buscai primeiro',
  'A fé é o firme fundamento',
  'Tudo posso naquele',
  'O Senhor é o meu pastor',
  'Misericórdias novas a cada manhã',
];

interface ShareImageGeneratorProps {
  open: boolean;
  onClose: () => void;
  verse?: { ref: string; text: string; traducao?: string } | null;
}

export function ShareImageGenerator({ open, onClose, verse }: ShareImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [fontSize, setFontSize] = useState(28);
  const [showLogo, setShowLogo] = useState(true);
  const [showFrase, setShowFrase] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const template = selectedTemplate;

  const gerarImagem = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setGenerating(true);

    const ctx = canvas.getContext('2d');
    if (!ctx) { setGenerating(false); return; }

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, template.bg1);
    grad.addColorStop(1, template.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    if (template.style === 'classic') {
      ctx.strokeStyle = template.accentColor + '40';
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        const s = 60 + i * 15;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, s, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    if (template.style === 'minimal') {
      ctx.fillStyle = template.accentColor + '10';
      ctx.fillRect(0, 0, 8, H);
    }

    ctx.fillStyle = template.accentColor;
    ctx.font = `bold 14px ${template.font}`;
    ctx.textAlign = 'center';
    if (template.style === 'classic') {
      ctx.fillText('✦', W / 2, 100);
    }

    ctx.fillStyle = template.textColor;
    ctx.font = `600 16px ${template.font}`;
    ctx.textAlign = 'center';

    const refText = verse?.ref || 'João 3:16';
    const tradText = verse?.traducao ? ` — ${(verse.traducao).toUpperCase()}` : '';
    ctx.fillText(refText + tradText, W / 2, 140);

    ctx.fillStyle = template.accentColor;
    ctx.fillRect(W / 2 - 40, 165, 80, 2);

    const text = verse?.text || 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.';

    ctx.fillStyle = template.textColor;
    const actualFontSize = fontSize;
    ctx.font = `${actualFontSize}px ${template.font}`;
    ctx.textAlign = 'center';

    const maxWidth = W - 140;
    const lineHeight = actualFontSize * 1.6;
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const totalTextHeight = lines.length * lineHeight;
    const startY = (H - totalTextHeight) / 2 - 20;

    lines.forEach((line, i) => {
      if (template.style === 'classic') {
        ctx.shadowColor = template.accentColor + '30';
        ctx.shadowBlur = 10;
      }
      ctx.fillText(line, W / 2, startY + i * lineHeight);
      ctx.shadowBlur = 0;
    });

    const fraseY = startY + lines.length * lineHeight + 40;

    if (showFrase) {
      const frase = FRASES_DESTAQUE[Math.floor(Math.random() * FRASES_DESTAQUE.length)];
      ctx.fillStyle = template.accentColor;
      ctx.font = `italic 18px ${template.font}`;
      ctx.fillText(`— ${frase}`, W / 2, fraseY);
    }

    if (showLogo) {
      ctx.fillStyle = template.accentColor + '80';
      ctx.font = `600 14px ${template.font}`;
      ctx.fillText('Sola Scriptura', W / 2, H - 60);

      ctx.fillStyle = template.accentColor + '40';
      ctx.font = `12px ${template.font}`;
      ctx.fillText('solascripturabr.com.br', W / 2, H - 40);
    }

    setGenerating(false);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  }, [template, fontSize, showLogo, showFrase, verse]);

  const downloadImagem = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `versiculo-sola-scriptura-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const compartilhar = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));
      const file = new File([blob], 'versiculo.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: verse?.ref || 'Versículo Bíblico' });
      }
    } catch {
      downloadImagem();
    }
  }, [verse, downloadImagem]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--content-primary)]">Criar Imagem Social</h2>
                <p className="text-xs text-[var(--content-muted)]">Escolha um template e compartilhe</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t)}
                className={`p-3 rounded-xl text-left transition-all ${template.id === t.id ? 'ring-2 ring-amber-500 shadow-md' : 'hover:bg-[var(--surface-sunken)]'}`}
              >
                <div className="w-full h-8 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, ${t.bg1}, ${t.bg2})` }} />
                <span className="text-xs font-medium text-[var(--content-primary)]">{t.nome}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-[var(--content-muted)]" />
              <input
                type="range"
                min={20}
                max={40}
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-xs text-[var(--content-muted)]">{fontSize}px</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showLogo} onChange={e => setShowLogo(e.target.checked)} className="w-3 h-3" />
              <span className="text-xs text-[var(--content-muted)]">Logo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showFrase} onChange={e => setShowFrase(e.target.checked)} className="w-3 h-3" />
              <span className="text-xs text-[var(--content-muted)]">Frase</span>
            </label>
          </div>

          <div className="flex justify-center mb-6">
            <canvas ref={canvasRef} className="rounded-xl shadow-lg max-w-full" style={{ maxWidth: '360px', aspectRatio: '1/1' }} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={gerarImagem}
              disabled={generating}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {generating ? '⏳ Gerando...' : generated ? '✅ Pronto!' : <><Sparkles className="w-4 h-4" /> Gerar Imagem</>}
            </button>
            <button
              onClick={downloadImagem}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] transition-all"
            >
              <Download className="w-4 h-4" /> Baixar
            </button>
            <button
              onClick={compartilhar}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] transition-all"
            >
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
