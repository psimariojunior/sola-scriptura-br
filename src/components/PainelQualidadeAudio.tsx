'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Volume2, Settings, Mic, Sparkles, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  listarVozesDisponiveis,
  esperarVozesCarregarem,
  selecionarMelhorVoz,
  obterConfigVoz,
  salvarConfigVoz,
  type VozConfig,
} from '@/lib/vozTTS';
import { gerarAudioEdge, edgeTTSDisponivel } from '@/lib/edgeTTS';

interface PainelQualidadeAudioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TEXTO_TESTE = 'No princípio, Deus criou os céus e a terra. A terra era sem forma e vazia, e o Espírito de Deus pairava sobre as águas.';

export function PainelQualidadeAudio({ open, onOpenChange }: PainelQualidadeAudioProps) {
  const [vozes, setVozes] = useState<SpeechSynthesisVoice[]>([]);
  const [vozSelecionada, setVozSelecionada] = useState<string>('');
  const [config, setConfig] = useState<VozConfig>(obterConfigVoz());
  const [tocando, setTocando] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    synthRef.current = window.speechSynthesis;

    esperarVozesCarregarem(3000).then((v) => {
      const ptVozes = v.filter((voice) => voice.lang.toLowerCase().startsWith('pt'));
      setVozes(ptVozes);

      const salva = localStorage.getItem('ssb_voz_selecionada');
      if (salva && ptVozes.find((x) => x.name === salva)) {
        setVozSelecionada(salva);
      } else {
        const melhor = selecionarMelhorVoz(v, config.preferGender);
        if (melhor) {
          setVozSelecionada(melhor.name);
          localStorage.setItem('ssb_voz_selecionada', melhor.name);
        }
      }
    });
  }, []);

  const testarVoz = useCallback(async () => {
    if (config.motor === 'edge-tts' || (config.motor === 'auto' && edgeTTSDisponivel())) {
      try {
        setTocando(true);
        const vozGenero = config.preferGender === 'masculino' ? 'masculina' : 'feminina';
        const rateStr = config.rate >= 1 ? `+${Math.round((config.rate - 1) * 100)}%` : `-${Math.round((1 - config.rate) * 100)}%`;
        const buffer = await gerarAudioEdge({
          texto: TEXTO_TESTE,
          voz: vozGenero,
          vozCustom: config.vozEdgeTTS !== 'pt-BR-FranciscaNeural' ? config.vozEdgeTTS : undefined,
          rate: rateStr,
        });
        const blob = new Blob([buffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => { setTocando(false); URL.revokeObjectURL(url); };
        audio.onerror = () => { setTocando(false); URL.revokeObjectURL(url); };
        await audio.play();
        return;
      } catch {
        setTocando(false);
      }
    }

    if (!synthRef.current) return;
    synthRef.current.cancel();

    const voz = vozes.find((v) => v.name === vozSelecionada) || null;
    const utter = new SpeechSynthesisUtterance(TEXTO_TESTE);
    if (voz) utter.voice = voz;
    utter.lang = 'pt-BR';
    utter.rate = config.rate;
    utter.pitch = config.pitch;
    utter.volume = config.volume;

    utter.onstart = () => setTocando(true);
    utter.onend = () => setTocando(false);
    utter.onerror = () => setTocando(false);

    synthRef.current.speak(utter);
  }, [vozSelecionada, config, vozes]);

  const parar = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setTocando(false);
    }
  }, []);

  const salvarConfig = useCallback((nova: Partial<VozConfig>) => {
    const merged = { ...config, ...nova };
    setConfig(merged);
    salvarConfigVoz(nova);
  }, [config]);

  const selecionarVoz = useCallback((nome: string) => {
    setVozSelecionada(nome);
    localStorage.setItem('ssb_voz_selecionada', nome);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onOpenChange(false)}
      >
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Qualidade do Áudio</h2>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <Mic className="w-4 h-4" />
                Motor de Áudio
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Escolha o engine de síntese de voz. Edge TTS é gratuito e de alta qualidade.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'auto' as const, label: 'Automático', desc: 'Melhor disponível' },
                  { value: 'edge-tts' as const, label: 'Edge TTS', desc: 'Gratuito, neural' },
                  { value: 'elevenlabs' as const, label: 'ElevenLabs', desc: 'Premium, pago' },
                  { value: 'speech-api' as const, label: 'Navegador', desc: 'Sem API' },
                ]).map((m) => (
                  <button
                    key={m.value}
                    onClick={() => salvarConfig({ motor: m.value })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      config.motor === m.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="text-sm font-medium">{m.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <Mic className="w-4 h-4" />
                Voz de Narração
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Selecione a melhor voz PT-BR disponível no seu navegador. Vozes neurais (Microsoft, Google) têm qualidade superior.
              </p>
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {vozes.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                    Carregando vozes disponíveis...
                  </p>
                ) : (
                  vozes.map((voz) => {
                    const isSelecionada = voz.name === vozSelecionada;
                    return (
                      <button
                        key={voz.name}
                        onClick={() => selecionarVoz(voz.name)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          isSelecionada
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/30 hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">{voz.name}</span>
                              {isSelecionada && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {voz.lang} {voz.localService ? '(local)' : '(rede)'}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                Ajustes de Áudio
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between text-sm mb-1.5">
                    <span>Velocidade</span>
                    <span className="text-xs text-muted-foreground font-mono">{config.rate.toFixed(2)}x</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={config.rate}
                    onChange={(e) => salvarConfig({ rate: parseFloat(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm mb-1.5">
                    <span>Tom (pitch)</span>
                    <span className="text-xs text-muted-foreground font-mono">{config.pitch.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={config.pitch}
                    onChange={(e) => salvarConfig({ pitch: parseFloat(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm mb-1.5">
                    <span>Volume</span>
                    <span className="text-xs text-muted-foreground font-mono">{Math.round(config.volume * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={config.volume}
                    onChange={(e) => salvarConfig({ volume: parseFloat(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1.5 block">Preferência de gênero</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['feminino', 'masculino', 'auto'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => salvarConfig({ preferGender: g })}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          config.preferGender === g
                            ? 'border-primary bg-primary/10 font-medium'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {(config.motor === 'edge-tts' || config.motor === 'auto') && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Voz Edge TTS (Neural)
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Vozes neurais Microsoft de alta qualidade, gratuitas.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'pt-BR-FranciscaNeural', label: 'Francisca', desc: 'Feminina, natural' },
                    { id: 'pt-BR-ThalitaNeural', label: 'Thalita', desc: 'Feminina, jovem' },
                    { id: 'pt-BR-AntonioNeural', label: 'Antonio', desc: 'Masculino, sereno' },
                    { id: 'pt-BR-DonatoNeural', label: 'Donato', desc: 'Masculino, formal' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => salvarConfig({ vozEdgeTTS: v.id })}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        config.vozEdgeTTS === v.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="text-sm font-medium">{v.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-100">
                  <strong>Dica:</strong> Para melhor qualidade, use <strong>Edge TTS</strong> (gratuito, vozes neurais Microsoft) ou <strong>ElevenLabs</strong> (pago, vozes ultra-realistas). O navegador funciona bem no Edge/Chrome Windows com vozes neurais.
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 border-t border-border bg-muted/30">
            <button
              onClick={tocando ? parar : testarVoz}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                tocando
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {tocando ? (
                <>
                  <Square className="w-4 h-4" fill="currentColor" />
                  Parar Teste
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" fill="currentColor" />
                  Testar Voz
                </>
              )}
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Concluído
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function usePainelQualidadeAudio() {
  const [open, setOpen] = useState(false);
  return { open, setOpen, Painel: () => <PainelQualidadeAudio open={open} onOpenChange={setOpen} /> };
}
