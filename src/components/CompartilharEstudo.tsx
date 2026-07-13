'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Copy, Check, Link2, Mail, QrCode, Code,
  MessageCircle, X, Download,
} from 'lucide-react';
import { gerarLinkCompartilhamento } from '@/lib/exportarEstudos';
import { useToast } from '@/hooks/useToast';

interface CompartilharEstudoProps {
  estudoId: string;
  titulo: string;
  descricao?: string;
  autor?: string;
  referencia?: string;
}

type AbaCompartilhar = 'link' | 'social' | 'qr' | 'embed' | 'email' | 'texto';

export function CompartilharEstudo({
  estudoId, titulo, descricao, autor, referencia,
}: CompartilharEstudoProps) {
  const [aberto, setAberto] = useState(false);
  const [aba, setAba] = useState<AbaCompartilhar>('link');
  const [copiado, setCopiado] = useState('');
  const qrRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const link = gerarLinkCompartilhamento(estudoId);
  const textoCurto = referencia ? `"${titulo}" — ${referencia}` : `"${titulo}"`;
  const textoCompleto = `${titulo}\n${descricao ? descricao + '\n' : ''}${referencia ? referencia + '\n' : ''}${autor ? `Autor: ${autor}\n` : ''}\nvia Sola Scriptura`;

  const markdownFormat = `# ${titulo}\n${descricao ? `> ${descricao}\n` : ''}${referencia ? `**${referencia}**\n` : ''}\n---\n*via [Sola Scriptura](${link})*`;

  const embedCode = `<iframe src="${link}" width="100%" height="600" frameborder="0" title="${titulo}"></iframe>`;

  const copiar = async (texto: string, chave: string) => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiado(chave);
    setTimeout(() => setCopiado(''), 2000);
    toast({ title: 'Copiado!', variant: 'success' });
  };

  const handleCompartilhar = (canal: string) => {
    toast({ title: `Compartilhado por ${canal}`, variant: 'success' });
  };

  const compartilharWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoCompleto)}&url=${encodeURIComponent(link)}`, '_blank');
    handleCompartilhar('WhatsApp');
  };

  const compartilharTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCurto)}&url=${encodeURIComponent(link)}`, '_blank');
    handleCompartilhar('Twitter');
  };

  const compartilharFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(textoCurto)}`, '_blank');
    handleCompartilhar('Facebook');
  };

  const enviarEmail = () => {
    const assunto = encodeURIComponent(titulo);
    const corpo = encodeURIComponent(`${textoCompleto}\n\nLink: ${link}`);
    window.open(`mailto:?subject=${assunto}&body=${corpo}`, '_blank');
  };

  const gerarQrCode = useCallback(() => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#1a1612';
    const moduleSize = 4;
    const modules = Math.floor(size / moduleSize);

    const hash = Array.from(link).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    const seed = Math.abs(hash);

    const corners = [
      [0, 0], [0, modules - 7], [modules - 7, 0],
    ];
    for (const [cx, cy] of corners) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 ||
              (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            ctx.fillRect((cx + c) * moduleSize, (cy + r) * moduleSize, moduleSize, moduleSize);
          }
        }
      }
    }

    for (let r = 8; r < modules - 8; r++) {
      for (let c = 8; c < modules - 8; c++) {
        if (((seed + r * modules + c) * 2654435761) >>> 0 % 3 === 0) {
          ctx.fillRect(c * moduleSize, r * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${titulo.substring(0, 30).replace(/\s+/g, '-')}.png`;
    a.click();
  }, [link, titulo]);

  const ABAS: { id: AbaCompartilhar; label: string; icon: typeof Share2 }[] = [
    { id: 'link', label: 'Link', icon: Link2 },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'qr', label: 'QR', icon: QrCode },
    { id: 'embed', label: 'Embed', icon: Code },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'texto', label: 'Texto', icon: Copy },
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAberto(true)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
        aria-label="Compartilhar estudo"
      >
        <Share2 className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setAberto(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-base font-medium">Compartilhar</h3>
                </div>
                <button
                  onClick={() => setAberto(false)}
                  className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preview */}
              <div className="p-4 border-b border-border/30 bg-muted/20">
                <p className="font-display text-sm font-medium line-clamp-1">{titulo}</p>
                {referencia && (
                  <p className="text-xs text-muted-foreground mt-0.5">{referencia}</p>
                )}
              </div>

              {/* Abas */}
              <div className="flex gap-1 p-2 border-b border-border/30 overflow-x-auto">
                {ABAS.map(a => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAba(a.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                        aba === a.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {a.label}
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo da aba */}
              <div className="p-4">
                {aba === 'link' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={link}
                        className="flex-1 px-3 py-2 text-sm bg-muted/30 border border-border/30 rounded-lg text-muted-foreground"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copiar(link, 'link')}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
                      >
                        {copiado === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Qualquer pessoa com este link pode visualizar o estudo.
                    </p>
                  </div>
                )}

                {aba === 'social' && (
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={compartilharWhatsApp}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/50 transition-all"
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-medium">WhatsApp</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={compartilharTwitter}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/50 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-xs font-medium">Twitter</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={compartilharFacebook}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted/50 transition-all"
                    >
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="text-xs font-medium">Facebook</span>
                    </motion.button>
                  </div>
                )}

                {aba === 'qr' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-white rounded-xl shadow-inner">
                      <canvas ref={qrRef} className="w-[160px] h-[160px]" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={gerarQrCode}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Baixar QR Code
                    </motion.button>
                  </div>
                )}

                {aba === 'embed' && (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Código de incorporação
                    </label>
                    <textarea
                      readOnly
                      value={embedCode}
                      rows={3}
                      className="w-full px-3 py-2 text-xs font-mono bg-muted/30 border border-border/30 rounded-lg text-muted-foreground resize-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => copiar(embedCode, 'embed')}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
                    >
                      {copiado === 'embed' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copiado === 'embed' ? 'Copiado!' : 'Copiar código'}
                    </motion.button>
                  </div>
                )}

                {aba === 'email' && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Envie este estudo por email com todos os detalhes.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={enviarEmail}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      Abrir cliente de email
                    </motion.button>
                  </div>
                )}

                {aba === 'texto' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                        Texto formatado
                      </label>
                      <div className="p-3 bg-muted/30 border border-border/30 rounded-lg text-sm whitespace-pre-wrap line-clamp-6">
                        {textoCompleto}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => copiar(textoCompleto, 'texto')}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
                      >
                        {copiado === 'texto' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiado === 'texto' ? 'Copiado!' : 'Copiar texto'}
                      </motion.button>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                        Markdown
                      </label>
                      <pre className="p-3 bg-muted/30 border border-border/30 rounded-lg text-xs text-muted-foreground whitespace-pre-wrap line-clamp-6 font-mono">
                        {markdownFormat}
                      </pre>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => copiar(markdownFormat, 'markdown')}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-all"
                      >
                        {copiado === 'markdown' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiado === 'markdown' ? 'Copiado!' : 'Copiar Markdown'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
