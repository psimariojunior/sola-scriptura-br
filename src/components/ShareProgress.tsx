'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check, Download, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareProgressProps {
  stats: {
    chaptersRead: number;
    booksCompleted: number;
    streak: number;
    memorized: number;
  };
  onClose?: () => void;
}

export function ShareProgress({ stats, onClose }: ShareProgressProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `📚 Meu progresso no Sola Scriptura BR:

📖 ${stats.chaptersRead} capítulos lidos
📚 ${stats.booksCompleted} livros concluídos
🔥 ${stats.streak} dias de sequência
🧠 ${stats.memorized} versículos memorizados

Estude a Bíblia em profundidade gratuitamente em solascripturabr.com.br`;

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareText]);

  const shareWhatsApp = useCallback(() => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  }, [shareText]);

  const downloadImage = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d')!;

    // Background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 1080, 1080);

    // Gradient overlay
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, 'rgba(245, 205, 107, 0.1)');
    grad.addColorStop(1, 'rgba(184, 138, 48, 0.05)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Title
    ctx.fillStyle = '#f5cd6b';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Meu Progresso Bíblico', 540, 120);

    // Stats
    const items = [
      { label: 'Capítulos Lidos', value: stats.chaptersRead, icon: '📖' },
      { label: 'Livros Concluídos', value: stats.booksCompleted, icon: '📚' },
      { label: 'Dias de Sequência', value: stats.streak, icon: '🔥' },
      { label: 'Versículos Memorizados', value: stats.memorized, icon: '🧠' },
    ];

    items.forEach((item, i) => {
      const y = 250 + i * 180;
      ctx.fillStyle = '#ffffff20';
      ctx.beginPath();
      ctx.roundRect(100, y, 880, 140, 20);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '60px serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${item.icon} ${item.value}`, 150, y + 85);

      ctx.fillStyle = '#ffffffaa';
      ctx.font = '24px sans-serif';
      ctx.fillText(item.label, 150, y + 120);
    });

    // Footer
    ctx.fillStyle = '#ffffff60';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('solascripturabr.com.br', 540, 1020);

    const link = document.createElement('a');
    link.download = 'meu-progresso-biblico.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [stats]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-border/50 bg-card/50 p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-medium flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" /> Compartilhar Progresso
        </h3>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted/50"><X className="w-4 h-4" /></button>
        )}
      </div>

      <div className="rounded-xl bg-muted/30 p-4 mb-4">
        <pre className="text-sm whitespace-pre-wrap font-sans">{shareText}</pre>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <motion.button onClick={shareWhatsApp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 hover:bg-green-500/20 transition-all">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium">WhatsApp</span>
        </motion.button>
        <motion.button onClick={copyText} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className={cn('flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all',
            copied ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-muted/50 border-border hover:bg-muted')}>
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          <span className="text-xs font-medium">{copied ? 'Copiado!' : 'Copiar'}</span>
        </motion.button>
        <motion.button onClick={downloadImage} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all">
          <Download className="w-5 h-5" />
          <span className="text-xs font-medium">Imagem</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
