// Cloudflare Worker: Edge TTS (Microsoft Neural Voices) for Sola Scriptura
// Free tier: 100,000 requests/day, 30s CPU time

export interface Env {
  ALLOWED_ORIGIN: string;
}

const VOZES_PT = {
  feminina: ['pt-BR-FranciscaNeural', 'pt-BR-ThalitaNeural'],
  masculina: ['pt-BR-AntonioNeural', 'pt-BR-DonatoNeural'],
};

interface TTSRequest {
  texto: string;
  voz?: 'feminina' | 'masculina';
  vozCustom?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

// Constrói a requisição SSML para o Edge TTS
function buildSSML(texto: string, voz: string, rate: string, pitch: string, volume: string): string {
  const escaped = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-BR'>
  <voice name='${voz}'>
    <prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>
      ${escaped}
    </prosody>
  </voice>
</speak>`;
}

// Conecta ao Edge TTS via WebSocket
async function generateTTS(texto: string, voz: string, rate: string, pitch: string, volume: string): Promise<ArrayBuffer> {
  const ssml = buildSSML(texto, voz, rate, pitch, volume);

  const wssUrl = 'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&Sec-MS-GEC=1&Sec-MS-GEC-Version=1-130.0.2849.39&ConnectionId=abc';
  const headers = [
    `Pragma: no-cache`,
    `Cache-Control: no-cache`,
    `Origin: chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold`,
    `Accept-Encoding: gzip, deflate, br`,
    `Accept-Language: pt-BR,pt;q=0.9`,
    `User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0`,
  ].join('\r\n');

  // Timestamp para Sec-MS-GEC (formato: RFC 1123 com 1h subtraída)
  const now = new Date();
  now.setHours(now.getHours() - 1);
  const timestamp = now.toUTCString();
  const enc = new TextEncoder();
  const key = enc.encode(`${timestamp}6A5AA1D4EAFF4E9FB37E23D68491D6F4`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', key);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();

  const fullUrl = `${wssUrl}&Sec-MS-GEC=${hash}`;

  const config = {
    context: {
      synthesis: {
        audio: {
          metadataoptions: {
            sentenceBoundaryEnabled: 'false',
            wordBoundaryEnabled: 'false',
          },
          outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
        },
      },
    },
  };

  const webSocketResponse = await fetch(fullUrl, {
    headers: {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
      'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ==',
      'Sec-WebSocket-Version': '13',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'pt-BR,pt;q=0.9',
      'X-Timestamp': timestamp,
    },
  });

  const ws = webSocketResponse.webSocket;
  if (!ws) throw new Error('Falha ao conectar WebSocket');

  return new Promise<ArrayBuffer>((resolve, reject) => {
    const audioChunks: Uint8Array[] = [];
    let timeoutHandle: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timeoutHandle);
      try { ws.close(); } catch {}
    };

    timeoutHandle = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout: Edge TTS não respondeu em 25s'));
    }, 25000);

    ws.addEventListener('open', () => {
      // Envia a configuração inicial
      ws.send(`X-Timestamp:${timestamp}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${JSON.stringify(config)}`);
      // Envia o SSML
      ws.send(`X-RequestId:abc\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${timestamp}\r\nPath:ssml\r\n\r\n${ssml}`);
    });

    ws.addEventListener('message', (event) => {
      try {
        const data = event.data as ArrayBuffer | string;
        if (typeof data === 'string') {
          // Mensagem de controle (ex: "Path:turn.end")
          if (data.includes('Path:turn.end')) {
            cleanup();
            const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
            const result = new Uint8Array(totalLength);
            let offset = 0;
            for (const chunk of audioChunks) {
              result.set(chunk, offset);
              offset += chunk.length;
            }
            resolve(result.buffer);
          }
        } else {
          // Dados de áudio binários
          const bytes = new Uint8Array(data);
          if (bytes.length > 0) {
            audioChunks.push(bytes);
          }
        }
      } catch (e: any) {
        cleanup();
        reject(e);
      }
    });

    ws.addEventListener('error', (event) => {
      cleanup();
      reject(new Error('WebSocket error: ' + (event as any).message || 'unknown'));
    });

    ws.addEventListener('close', () => {
      // Se ainda não resolveu e temos chunks, resolver
      if (audioChunks.length > 0) {
        const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of audioChunks) {
          result.set(chunk, offset);
          offset += chunk.length;
        }
        cleanup();
        resolve(result.buffer);
      }
    });
  });
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || env.ALLOWED_ORIGIN;
    const allowedOrigin = env.ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(allowedOrigin),
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/audio/edge' || url.pathname === '/') {
      if (request.method === 'GET') {
        return new Response(
          JSON.stringify({
            servico: 'Microsoft Edge TTS via Cloudflare Workers',
            descricao: 'TTS neural de alta qualidade em português brasileiro',
            vozes: {
              feminina: VOZES_PT.feminina,
              masculina: VOZES_PT.masculina,
            },
            gratuito: true,
            nota: 'Hospedado em Cloudflare Workers. Timeout 30s. Sem chave de API.',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders(allowedOrigin),
            },
          }
        );
      }

      if (request.method === 'POST') {
        let body: TTSRequest;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ erro: 'JSON inválido' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin) },
          });
        }

        const {
          texto,
          voz = 'feminina',
          vozCustom,
          rate = '+0%',
          pitch = '+0Hz',
          volume = '+0%',
        } = body;

        if (!texto || texto.trim().length < 1) {
          return new Response(JSON.stringify({ erro: 'Texto vazio' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin) },
          });
        }

        if (texto.length > 5000) {
          return new Response(JSON.stringify({ erro: 'Texto muito longo (máx 5000 caracteres)' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin) },
          });
        }

        const vozFinal = vozCustom || (voz === 'masculina' ? 'pt-BR-AntonioNeural' : 'pt-BR-FranciscaNeural');

        try {
          const startTime = Date.now();
          const audioBuffer = await generateTTS(texto, vozFinal, rate, pitch, volume);
          const duracaoMs = Date.now() - startTime;

          return new Response(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Length': audioBuffer.byteLength.toString(),
              'Cache-Control': 'public, max-age=86400, immutable',
              'X-TTS-Voice': vozFinal,
              'X-TTS-Duration': duracaoMs.toString(),
              ...corsHeaders(allowedOrigin),
            },
          });
        } catch (erro: any) {
          return new Response(
            JSON.stringify({
              erro: 'Falha ao gerar áudio',
              detalhes: erro?.message || 'Erro desconhecido',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin) },
            }
          );
        }
      }
    }

    return new Response(JSON.stringify({ erro: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(allowedOrigin) },
    });
  },
};
