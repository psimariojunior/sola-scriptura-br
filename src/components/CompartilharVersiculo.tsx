'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, ExternalLink } from 'lucide-react';

interface CompartilharVersiculoProps {
  livro: string;
  capítulo: number;
  versículo: number;
  texto: string;
}

const formatarReferencia = (livro: string, cap: number, ver: number) =>
  `${livro} ${cap}:${ver}`;

export function CompartilharVersiculo({ livro, capítulo, versículo, texto }: CompartilharVersiculoProps) {
  const [copiado, setCopiado] = useState(false);
  const [aberto, setAberto] = useState(false);

  const referência = formatarReferencia(livro, capítulo, versículo);
  const textoFormatado = `"${texto}"\n\n— ${referência} (Sola Scriptura)`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoFormatado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textoFormatado;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const compartilharWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${referência}\n\n${texto}\n\nEstude mais em Sola Scriptura`)}`;
    window.open(url, '_blank');
  };

  const compartilharTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${referência}\n\n${texto.slice(0, 200)}${texto.length > 200 ? '...' : ''}`)}&url=${encodeURIComponent('https://sola-scriptura-two.vercel.app')}`;
    window.open(url, '_blank');
  };

  const compartilharFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://sola-scriptura-two.vercel.app')}&quote=${encodeURIComponent(`${referência} — ${texto}`)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setAberto(!aberto)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
        aria-label="Compartilhar versículo"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            {/* Preview */}
            <div className="p-4 border-b border-border/30">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{referência}</p>
              <p className="text-sm text-foreground leading-relaxed font-serif-body italic line-clamp-4">{texto}</p>
            </div>

            {/* Ações */}
            <div className="p-2 space-y-1">
              <button
                onClick={copiar}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {copiado ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-green-500"
                    >
                      <Check className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {copiado ? 'Copiado!' : 'Copiar texto'}
              </button>

              <button
                onClick={compartilharWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>

              <button
                onClick={compartilharTwitter}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter / X
              </button>

              <button
                onClick={compartilharFacebook}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/50 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
