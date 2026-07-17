export interface VoiceScore {
  voice: SpeechSynthesisVoice;
  score: number;
  reasons: string[];
}

const HIGH_QUALITY_PT_VOICES = [
  /^Microsoft\s+(Maria|Daniel|Francisco|Heloisa|Julio|Julio|Francisca|Antonio|Antonio)\b/i,
  /^Google\s+Português\s+do\s+Brasil$/i,
  /^Google\s+pt-BR$/i,
  /^Google\s+Portuguese/i,
  /^Google\s+brasil/i,
  /^Microsoft\s+Pt-PT/i,
  /^Luciana$/i,
  /^Joana$/i,
  /^Felipe$/i,
  /^pt-BR-.*Neural/i,
  /^pt-BR-Wavenet/i,
  /^pt-BR-Standard-/i,
  /^pt-PT-.*Neural/i,
];

const FEMININE_NAMES = [
  'maria', 'heloisa', 'francisca', 'luciana', 'joana', 'helena', 'claudia', 'beatriz',
  'alice', 'laura', 'sandra', 'paula', 'camila', 'amalia', 'raquel', 'sofia',
  'brenda', 'elena', 'juliana', 'carolina', 'cristina', 'monica', 'eliane', 'isabel',
  'vitoria', 'valentina', 'carla', 'renata', 'bianca', 'leticia', 'fernanda',
];

const MASCULINE_NAMES = [
  'daniel', 'francisco', 'antonio', 'julio', 'felipe', 'pedro', 'joao', 'lucas',
  'rafael', 'gabriel', 'miguel', 'bruno', 'carlos', 'ricardo', 'marcelo', 'thiago',
  'andre', 'rodrigo', 'tiago', 'gustavo', 'matheus', 'leonardo', 'eduardo', 'henrique',
  'paulo', 'marcos', 'diego', 'vinicius', 'caio', 'otavio', 'enzo', 'heitor',
];

const ROBOTIC_INDICATORS = [
  /espeak/i,
  /festival/i,
  /flite/i,
  /mbrola/i,
  /pico/i,
  /^robo/i,
  /sintet/i,
];

export function rankPortugueseVoices(
  voices: SpeechSynthesisVoice[],
  preferGender?: 'feminino' | 'masculino' | 'auto'
): VoiceScore[] {
  const ptVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('pt'));
  const candidates = ptVoices.length > 0 ? ptVoices : voices;

  const genderPref = preferGender || 'auto';

  const ranked: VoiceScore[] = candidates.map((voice) => {
    let score = 0;
    const reasons: string[] = [];
    const name = voice.name || '';
    const lang = (voice.lang || '').toLowerCase();

    if (lang === 'pt-br') {
      score += 50;
      reasons.push('pt-BR exato (+50)');
    } else if (lang.startsWith('pt-br')) {
      score += 45;
      reasons.push('pt-BR variante (+45)');
    } else if (lang.startsWith('pt')) {
      score += 25;
      reasons.push('pt genérico (+25)');
    } else {
      score -= 30;
      reasons.push('não-português (-30)');
    }

    for (const pattern of HIGH_QUALITY_PT_VOICES) {
      if (pattern.test(name)) {
        score += 40;
        reasons.push(`voz premium: ${name} (+40)`);
        break;
      }
    }

    if (/microsoft/i.test(name)) {
      score += 25;
      reasons.push('Microsoft (+25)');
    } else if (/google/i.test(name)) {
      score += 22;
      reasons.push('Google (+22)');
    } else if (/apple/i.test(name)) {
      score += 20;
      reasons.push('Apple (+20)');
    } else if (/amazon/i.test(name) || /polly/i.test(name)) {
      score += 18;
      reasons.push('Amazon Polly (+18)');
    } else if (/neural/i.test(name) || /wavenet/i.test(name) || /studio/i.test(name)) {
      score += 15;
      reasons.push('Neural/Wavenet (+15)');
    }

    if (voice.localService === false) {
      score += 12;
      reasons.push('voz de rede (+12)');
    } else if (voice.localService === true) {
      score += 4;
      reasons.push('voz local (+4)');
    }

    for (const pattern of ROBOTIC_INDICATORS) {
      if (pattern.test(name)) {
        score -= 50;
        reasons.push(`robótica: ${name} (-50)`);
        break;
      }
    }

    const nameLower = name.toLowerCase();
    const isFeminine = FEMININE_NAMES.some((n) => nameLower.includes(n));
    const isMasculine = MASCULINE_NAMES.some((n) => nameLower.includes(n));

    if (genderPref === 'feminino' && isFeminine) {
      score += 10;
      reasons.push('feminino preferido (+10)');
    } else if (genderPref === 'masculino' && isMasculine) {
      score += 10;
      reasons.push('masculino preferido (+10)');
    }

    if (nameLower.includes('female') || nameLower.includes('feminina')) score += 3;
    if (nameLower.includes('male') || nameLower.includes('masculino')) score += 3;

    return { voice, score, reasons };
  });

  return ranked.sort((a, b) => b.score - a.score);
}

export function selecionarMelhorVoz(
  voices: SpeechSynthesisVoice[],
  preferGender?: 'feminino' | 'masculino' | 'auto'
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const ranked = rankPortugueseVoices(voices, preferGender);
  return ranked.length > 0 ? ranked[0].voice : voices[0];
}

export interface VozConfig {
  rate: number;
  pitch: number;
  volume: number;
  preferGender: 'feminino' | 'masculino' | 'auto';
  pausaEntreVersiculos: number;
  anunciarNumeros: boolean;
  motor: 'auto' | 'edge-tts' | 'elevenlabs' | 'speech-api';
  vozElevenLabs: string;
  vozEdgeTTS: string;
}

const CONFIG_KEY = 'ssb_audio_voz_config';
const VOZ_SELECIONADA_KEY = 'ssb_audio_voz_selecionada';

const DEFAULT_VOZ_CONFIG: VozConfig = {
  rate: 0.85,
  pitch: 1.0,
  volume: 1.0,
  preferGender: 'feminino',
  pausaEntreVersiculos: 1.0,
  anunciarNumeros: true,
  motor: 'auto',
  vozElevenLabs: '21m00Tcm4TlvDq8ikWAM',
  vozEdgeTTS: 'pt-BR-FranciscaNeural',
};

export function obterConfigVoz(): VozConfig {
  if (typeof window === 'undefined') return DEFAULT_VOZ_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return DEFAULT_VOZ_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_VOZ_CONFIG, ...parsed };
  } catch {
    return DEFAULT_VOZ_CONFIG;
  }
}

export function salvarConfigVoz(config: Partial<VozConfig>): void {
  if (typeof window === 'undefined') return;
  const current = obterConfigVoz();
  const merged = { ...current, ...config };
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
}

export function obterVozSelecionada(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(VOZ_SELECIONADA_KEY);
}

export function salvarVozSelecionada(voiceName: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VOZ_SELECIONADA_KEY, voiceName);
  } catch {
    // ignore
  }
}

export function aplicarConfigVoz(
  utterance: SpeechSynthesisUtterance,
  voice: SpeechSynthesisVoice | null,
  config: VozConfig
): void {
  if (voice) utterance.voice = voice;
  utterance.lang = 'pt-BR';
  utterance.rate = Math.max(0.5, Math.min(2.0, config.rate));
  utterance.pitch = Math.max(0.5, Math.min(2.0, config.pitch));
  utterance.volume = Math.max(0, Math.min(1, config.volume));
}

export function prepararTextoParaVoz(texto: string, config: VozConfig): string {
  if (!texto) return '';
  let limpo = texto
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  limpo = limpo
    .replace(/(\d+)\s*\.\s*/g, '$1. ')
    .replace(/—/g, ', ')
    .replace(/–/g, ', ')
    .replace(/…/g, '...')
    .replace(/\(/g, ', ')
    .replace(/\)/g, ', ')
    .replace(/\[/g, ', ')
    .replace(/\]/g, ', ')
    .replace(/«/g, '')
    .replace(/»/g, '')
    .replace(/"/g, '')
    .replace(/"/g, '')
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/;/g, ',')
    .replace(/:/g, ',')
    .replace(/\s+/g, ' ')
    .trim();

  if (config.anunciarNumeros) {
    limpo = limpo.replace(/^(\d+)\.\s*/, 'Versículo $1. ');
  }

  return limpo;
}

export function dividirEmFrasesParaPausa(texto: string, duracaoMs: number = 600): string[] {
  if (!texto) return [];
  const sentencas = texto
    .replace(/([.!?])\s+/g, '$1\n')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (sentencas.length === 0) return [texto];
  return sentencas;
}

export function criarUtteranceComPausa(
  synth: SpeechSynthesis,
  texto: string,
  voice: SpeechSynthesisVoice | null,
  config: VozConfig,
  onFim?: () => void
): void {
  const sentencas = dividirEmFrasesParaPausa(texto);
  if (sentencas.length === 0) {
    onFim?.();
    return;
  }

  const tocarEmCadeia = (indice: number) => {
    if (indice >= sentencas.length) {
      onFim?.();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(sentencas[indice]);
    aplicarConfigVoz(utterance, voice, config);
    utterance.onend = () => {
      if (indice < sentencas.length - 1 && config.pausaEntreVersiculos > 0) {
        setTimeout(() => tocarEmCadeia(indice + 1), config.pausaEntreVersiculos * 250);
      } else {
        tocarEmCadeia(indice + 1);
      }
    };
    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        onFim?.();
      }
    };
    synth.speak(utterance);
  };

  tocarEmCadeia(0);
}

export function listarVozesDisponiveis(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined') return [];
  return window.speechSynthesis.getVoices();
}

export function esperarVozesCarregarem(timeoutMs: number = 2000): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve([]);
      return;
    }
    const synth = window.speechSynthesis;
    const initial = synth.getVoices();
    if (initial.length > 0) {
      resolve(initial);
      return;
    }
    const timer = setTimeout(() => {
      resolve(synth.getVoices());
    }, timeoutMs);
    const onChange = () => {
      clearTimeout(timer);
      synth.removeEventListener?.('voiceschanged', onChange);
      resolve(synth.getVoices());
    };
    try {
      synth.addEventListener?.('voiceschanged', onChange);
    } catch {
      // ignore
    }
  });
}
