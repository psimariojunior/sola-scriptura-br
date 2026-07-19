'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, QrCode, Gift, BookOpen } from 'lucide-react';
import QRCode from 'qrcode';
import Link from 'next/link';

const PIX_KEY = 'contato@solascripturabr.com.br';
const PIX_QR_DATA = `00020126580014br.gov.bcb.pix0136${PIX_KEY}52040000530398654040.005802BR5925SOLA SCRIPTURA BR6009SAO PAULO62070503***6304`;

export default function OfertasPage() {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [valor, setValor] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, PIX_QR_DATA, {
      width: 240,
      margin: 2,
      color: {
        dark: '#F5F1E8',
        light: '#0A0908',
      },
      errorCorrectionLevel: 'L',
    }).catch(console.error);

    QRCode.toDataURL(PIX_QR_DATA, {
      width: 240,
      margin: 2,
      color: {
        dark: '#F5F1E8',
        light: '#0A0908',
      },
      errorCorrectionLevel: 'L',
    })
      .then((url) => setQrDataUrl(url))
      .catch(console.error);
  }, []);

  const copiarChave = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = PIX_KEY;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const compartilharWhatsApp = () => {
    const texto = encodeURIComponent(
      `Supporte o Sola Scriptura BR! 🙏\n\nOferta via PIX:\nChave: ${PIX_KEY}\n\nTodo valor ajuda a manter este estudo bíblico gratuito para todos.\n\nhttps://solascripturabr.com.br/ofertas`
    );
    window.open(`https://wa.me/?text=${texto}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0908]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A843]/10 mb-6">
              <Heart className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F5F1E8] mb-4">
              Ofereça Voluntariamente
            </h1>
            <p className="text-[#B8B0A4] text-lg leading-relaxed max-w-lg mx-auto">
              Se este estudo tem abençoado a sua vida, considere fazer uma oferta
              para ajudar a manter esta plataforma gratuita para todos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1A1814] border border-[#D4A843]/20 rounded-2xl p-6 md:p-8 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="w-5 h-5 text-[#D4A843]" />
              <h2 className="text-xl font-semibold text-[#F5F1E8]">
                PIX — QR Code
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="bg-[#0A0908] p-4 rounded-xl border border-[#D4A843]/10">
                <canvas ref={canvasRef} className="block" />
              </div>

              <div className="text-center">
                <p className="text-[#B8B0A4] text-sm mb-2">
                  Chave PIX (Email):
                </p>
                <p className="text-[#D4A843] font-mono text-lg font-medium tracking-wide">
                  {PIX_KEY}
                </p>
              </div>

              <button
                onClick={copiarChave}
                className="flex items-center gap-2 px-6 py-3 bg-[#D4A843] text-[#0A0908] font-semibold rounded-xl hover:bg-[#E0B558] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Chave PIX
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1A1814] border border-[#D4A843]/20 rounded-2xl p-6 md:p-8 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-5 h-5 text-[#D4A843]" />
              <h2 className="text-xl font-semibold text-[#F5F1E8]">
                Valor Voluntário
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {['R$ 10', 'R$ 25', 'R$ 50', 'R$ 100'].map((v) => (
                <button
                  key={v}
                  onClick={() => setValor(v.replace('R$ ', ''))}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    valor === v.replace('R$ ', '')
                      ? 'bg-[#D4A843] text-[#0A0908]'
                      : 'bg-[#0A0908] text-[#B8B0A4] border border-[#D4A843]/20 hover:border-[#D4A843]/50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B0A4] font-medium">
                R$
              </span>
              <input
                type="number"
                placeholder="Outro valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#0A0908] border border-[#D4A843]/20 rounded-xl text-[#F5F1E8] placeholder-[#666] focus:border-[#D4A843]/50 focus:outline-none transition-colors"
              />
            </div>

            {valor && Number(valor) > 0 && (
              <p className="text-center text-[#B8B0A4] text-sm mt-3">
                Abra o aplicativo do banco, escaneie o QR Code ou copie a chave,
                e envie <span className="text-[#D4A843] font-semibold">R$ {Number(valor).toFixed(2)}</span>
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <button
              onClick={compartilharWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1da851] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Compartilhar via WhatsApp
            </button>

            <div className="border-t border-[#D4A843]/10 pt-6 mt-6">
              <p className="text-[#B8B0A4] text-sm leading-relaxed max-w-md mx-auto">
                <span className="text-[#D4A843] font-semibold">2 Coríntios 9:7</span>
                <br />
                &ldquo;Cada um contribua como propôs em seu coração, não tristemente ou por obrigação,
                porque Deus ama o que dá com alegria.&rdquo;
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#D4A843] hover:text-[#E0B558] transition-colors text-sm mt-4"
            >
              <BookOpen className="w-4 h-4" />
              Voltar ao estudo
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
