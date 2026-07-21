'use client';

import { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle, X, ExternalLink, Download, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { CompartilharEstudo } from '@/components/CompartilharEstudo';
import { versiculosDestaque } from '@/data/versiculosDestaque';

const versiculosPredefinidos = versiculosDestaque.map((v) => v.referencia);

const textosVersiculos: Record<string, { texto: string; referencia: string }> = Object.fromEntries(
  versiculosDestaque.map((v) => [v.referencia.toLowerCase(), { texto: v.texto, referencia: v.referencia }])
);

export default function CompartilharPage() {
  const [inputVersiculo, setInputVersiculo] = useState('');
  const [versiculoAtual, setVersiculoAtual] = useState<{ texto: string; referencia: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const buscarVersiculo = useCallback(() => {
    const chave = inputVersiculo.toLowerCase().trim();
    if (textosVersiculos[chave]) {
      setVersiculoAtual(textosVersiculos[chave]);
    } else {
      setVersiculoAtual({
        texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.',
        referencia: inputVersiculo || 'João 3:16',
      });
    }
  }, [inputVersiculo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') buscarVersiculo();
  };

  const copiarTexto = async () => {
    if (!versiculoAtual) return;
    const texto = `"${versiculoAtual.texto}" — ${versiculoAtual.referencia}\n\nvia Sola Scriptura`;
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compartilharWhatsApp = () => {
    if (!versiculoAtual) return;
    const texto = encodeURIComponent(`"${versiculoAtual.texto}" — ${versiculoAtual.referencia}\n\nvia Sola Scriptura`);
    window.open(`https://wa.me/?text=${texto}`, '_blank');
  };

  const compartilharTwitter = () => {
    if (!versiculoAtual) return;
    const texto = encodeURIComponent(`"${versiculoAtual.texto}" — ${versiculoAtual.referencia}\n\nvia Sola Scriptura`);
    window.open(`https://twitter.com/intent/tweet?text=${texto}`, '_blank');
  };

  const gerarImagem = async () => {
    if (!versiculoAtual || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 1080;
    const h = 1080;
    canvas.width = w;
    canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#1a1612');
    grad.addColorStop(0.5, '#2d2319');
    grad.addColorStop(1, '#1a1612');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const goldGrad = ctx.createLinearGradient(0, 0, w, 0);
    goldGrad.addColorStop(0, '#8B6914');
    goldGrad.addColorStop(0.5, '#D4A843');
    goldGrad.addColorStop(1, '#8B6914');

    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 380, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 400, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '16px serif';
    ctx.fillStyle = '#D4A843';
    ctx.textAlign = 'center';
    const aspasTopoY = h / 2 - 220;
    ctx.fillText('❝', w / 2 - 320, aspasTopoY);
    ctx.fillText('❞', w / 2 + 300, aspasTopoY + 340);

    ctx.font = 'italic 42px Georgia, serif';
    ctx.fillStyle = '#F5F0E8';
    ctx.textAlign = 'center';
    const palavras = versiculoAtual.texto.split(' ');
    let linha = '';
    const linhas: string[] = [];
    const maxWidth = 800;

    for (const palavra of palavras) {
      const testLine = linha + (linha ? ' ' : '') + palavra;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && linha) {
        linhas.push(linha);
        linha = palavra;
      } else {
        linha = testLine;
      }
    }
    linhas.push(linha);

    const lineHeight = 60;
    const startY = h / 2 - (linhas.length * lineHeight) / 2;
    linhas.forEach((l, i) => {
      ctx.fillText(l, w / 2, startY + i * lineHeight);
    });

    ctx.font = '600 28px Georgia, serif';
    ctx.fillStyle = '#D4A843';
    ctx.fillText(`— ${versiculoAtual.referencia}`, w / 2, startY + linhas.length * lineHeight + 50);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = 'rgba(212, 168, 67, 0.5)';
    ctx.fillText('Sola Scriptura', w / 2, h - 80);

    const link = document.createElement('a');
    link.download = `versiculo-${versiculoAtual.referencia.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-light">Compartilhar</h1>
                <p className="text-sm text-muted-foreground">Compartilhe versículos com formatos bonitos</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Digite um versículo
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputVersiculo}
                    onChange={(e) => setInputVersiculo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ex: João 3:16"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-display text-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={buscarVersiculo}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all"
                  >
                    Buscar
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {versiculosPredefinidos.map((v) => (
                    <button
                      key={v}
                      onClick={() => { setInputVersiculo(v); setVersiculoAtual(textosVersiculos[v.toLowerCase()]); }}
                      className="px-3 py-1.5 text-xs rounded-full border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {versiculoAtual && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, #1a1612, #2d2319, #1a1612)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212, 168, 67, 0.3), transparent 60%)' }} />
                    <div className="relative p-10 text-center">
                      <div className="inline-block w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mb-6" />
                      <p className="font-display italic text-2xl leading-relaxed text-amber-50/95 mb-6">
                        &ldquo;{versiculoAtual.texto}&rdquo;
                      </p>
                      <p className="font-display text-lg text-amber-400/80 font-medium">
                        — {versiculoAtual.referencia}
                      </p>
                      <div className="inline-block w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mt-6" />
                      <p className="text-xs text-amber-600/40 mt-4 tracking-widest uppercase">Sola Scriptura</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={copiarTexto}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/50 transition-all text-sm font-medium"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiado!' : 'Copiar Texto'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={compartilharWhatsApp}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={compartilharTwitter}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-all text-sm font-medium"
                    >
                      <X className="w-4 h-4" />
                      Twitter / X
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={gerarImagem}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Instagram (PNG)
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={gerarImagem}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-amber-600/30 bg-amber-600/10 hover:bg-amber-600/20 text-amber-500 transition-all text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Baixar como Imagem PNG
                  </motion.button>
                </motion.div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10">
              <Link
                href="/compartilhar/versiculo?livro=gn&capitulo=1&versiculo=1&t=arc"
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 hover:bg-muted/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-light text-foreground">Compartilhar Versículo (Imagem)</h2>
                  <p className="text-sm text-muted-foreground">Gere uma imagem personalizada de qualquer versículo para redes sociais.</p>
                </div>
                <Share2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto mt-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-light">Compartilhar Estudo</h2>
                  <p className="text-sm text-muted-foreground">Compartilhe estudos bíblicos com link, QR code, embed e mais</p>
                </div>
              </div>

              <CompartilharEstudo
                estudoId="geral"
                titulo="Estudo Bíblico Sola Scriptura"
                descricao="Plataforma completa de estudo bíblico"
                autor="Sola Scriptura"
                referencia="Bíblia Sagrada"
              />
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
