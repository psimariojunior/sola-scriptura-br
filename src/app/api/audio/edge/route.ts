import { NextRequest } from 'next/server';
import { EdgeTTS } from 'node-edge-tts';
import { unlink } from 'fs/promises';
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

  const { texto, voz = 'feminina', vozCustom, rate = '+0%', pitch = '+0Hz', volume = '+0%' } = body;

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

  const vozFinal = vozCustom || (voz === 'masculina' ? 'pt-BR-AntonioNeural' : 'pt-BR-FranciscaNeural');

  const tempId = randomUUID();
  const tempFile = path.join(tmpdir(), `edge-tts-${tempId}.mp3`);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        controller.enqueue(encoder.encode(JSON.stringify(data) + '\n'));
      };

      try {
        send({ tipo: 'status', mensagem: 'Conectando ao Edge TTS...', voz: vozFinal });

        const tts = new EdgeTTS({
          voice: vozFinal,
          lang: 'pt-BR',
          outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
          rate,
          pitch,
          volume,
          timeout: 25000,
        });

        const startTime = Date.now();

        const ttsPromise = Promise.race([
          tts.ttsPromise(texto, tempFile),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout ao gerar áudio (serviço TTS indisponível)')), 20000)
          ),
        ]);

        let lastSize = 0;
        const pollInterval = setInterval(() => {
          try {
            const stats = require('fs').statSync(tempFile);
            if (stats.size > lastSize) {
              lastSize = stats.size;
              send({ tipo: 'progresso', bytes: stats.size });
            }
          } catch {}
        }, 200);

        await ttsPromise;
        clearInterval(pollInterval);

        const duracaoMs = Date.now() - startTime;
        send({ tipo: 'status', mensagem: 'Áudio gerado, enviando...', bytes: lastSize, duracaoMs });

        const fs = await import('fs');
        const fileBuffer = fs.readFileSync(tempFile);
        const base64Audio = fileBuffer.toString('base64');

        send({ tipo: 'audio', formato: 'mp3', base64: base64Audio, voz: vozFinal });

        await unlink(tempFile).catch(() => {});

        send({ tipo: 'fim', duracaoMs, bytes: lastSize });
        controller.close();
      } catch (erro: any) {
        await unlink(tempFile).catch(() => {});
        send({ tipo: 'erro', mensagem: erro?.message || 'Erro desconhecido' });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      servico: 'Microsoft Edge TTS (Streaming)',
      descricao: 'TTS neural de alta qualidade em PT-BR, com streaming SSE',
      vozes: {
        feminina: VOZES_PT.feminina,
        masculina: VOZES_PT.masculina,
      },
      parametros: {
        texto: 'string (obrigatório, máx 5000 chars)',
        voz: "'feminina' | 'masculina'",
        vozCustom: 'string (ex: "pt-BR-FranciscaNeural")',
        rate: 'string (ex: "+10%", "-20%")',
        pitch: 'string (ex: "+5Hz", "-10Hz")',
        volume: 'string (ex: "+10%", "-50%")',
      },
      formato_resposta: 'text/event-stream com eventos: status, progresso, audio, fim, erro',
      gratuito: true,
      nota: 'Usa as vozes neurais do Microsoft Edge. Sem chave de API.',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
