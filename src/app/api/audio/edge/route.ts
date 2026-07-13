import { NextRequest } from 'next/server';
import { EdgeTTS } from 'node-edge-tts';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

export const maxDuration = 60;
export const runtime = 'nodejs';

const VOZES_PT = {
  feminina: [
    'pt-BR-FranciscaNeural',
    'pt-BR-ThalitaNeural',
  ],
  masculina: [
    'pt-BR-AntonioNeural',
    'pt-BR-DonatoNeural',
  ],
};

interface AudioEdgeRequest {
  texto: string;
  voz?: 'feminina' | 'masculina';
  vozCustom?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
  formato?: 'mp3' | 'opus' | 'wav';
}

export async function POST(request: NextRequest) {
  let body: AudioEdgeRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ erro: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { texto, voz = 'feminina', vozCustom, rate = '+0%', pitch = '+0Hz', volume = '+0%', formato = 'mp3' } = body;

  if (!texto || texto.trim().length < 1) {
    return new Response(JSON.stringify({ erro: 'Texto vazio' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (texto.length > 5000) {
    return new Response(JSON.stringify({ erro: 'Texto muito longo (máx 5000 caracteres)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let vozFinal = vozCustom;
  if (!vozFinal) {
    const lista = VOZES_PT[voz] || VOZES_PT.feminina;
    vozFinal = lista[0];
  }

  const tempId = randomUUID();
  const tempFile = path.join(tmpdir(), `edge-tts-${tempId}.${formato}`);

  try {
    const tts = new EdgeTTS({
      voice: vozFinal,
      lang: 'pt-BR',
      outputFormat: `audio-24khz-48kbitrate-mono-mp3`,
      rate,
      pitch,
      volume,
      timeout: 30000,
    });

    await tts.ttsPromise(texto, tempFile);

    const fs = await import('fs/promises');
    const audioBuffer = await fs.readFile(tempFile);

    await unlink(tempFile).catch(() => {});

    const contentType = formato === 'mp3' ? 'audio/mpeg' : formato === 'wav' ? 'audio/wav' : 'audio/ogg';

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, immutable',
        'X-TTS-Voice': vozFinal,
      },
    });
  } catch (erro: any) {
    await unlink(tempFile).catch(() => {});

    return new Response(
      JSON.stringify({
        erro: 'Falha ao gerar áudio',
        detalhes: erro?.message || 'Erro desconhecido',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      servico: 'Microsoft Edge TTS',
      descricao: 'TTS neural de alta qualidade em português brasileiro',
      vozes: {
        feminina: VOZES_PT.feminina,
        masculina: VOZES_PT.masculina,
      },
      parametros: {
        rate: 'string (ex: "+10%", "-20%")',
        pitch: 'string (ex: "+5Hz", "-10Hz")',
        volume: 'string (ex: "+10%", "-50%")',
        formato: 'mp3 | opus | wav',
      },
      gratuito: true,
      nota: 'Usa as vozes neurais do Microsoft Edge. Sem necessidade de chave de API.',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
