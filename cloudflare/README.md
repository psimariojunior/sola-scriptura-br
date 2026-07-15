# Cloudflare Worker - Edge TTS (Microsoft Neural Voices)

Serviço de Text-to-Speech (TTS) neural hospedado em Cloudflare Workers, utilzando as vozes gratuitas do Microsoft Edge.

## Pré-requisitos

- Node.js 18+ instalado
- npm
- Conta no [Cloudflare](https://dash.cloudflare.com/sign-up) (plano gratuito é suficiente)

## Setup

```bash
cd cloudflare
npm install
npx wrangler login        # Autentica com sua conta Cloudflare
npm run deploy            # Faz deploy do worker
```

## Variáveis de Ambiente

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `ALLOWED_ORIGIN` | `https://solascripturabr.com.br` | Domínio autorizado para CORS |

Definida em `wrangler.toml`. Para alterar, edite o arquivo e faça deploy novamente.

## Uso

### Service Info (GET)

```bash
curl https://<worker-url>/api/audio/edge
```

Retorna JSON com informações do serviço, vozes disponíveis e configurações.

### Gerar Áudio (POST)

```bash
curl -X POST https://<worker-url>/api/audio/edge \
  -H "Content-Type: application/json" \
  -d '{"texto": "Porque Deus amou o mundo de tal maneira", "voz": "feminina"}'
```

**Request body:**

| Campo | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|--------|-----------|
| `texto` | string | Sim | - | Texto para sintetizar (max 5000 chars) |
| `voz` | string | Não | `feminina` | `feminina` ou `masculina` |
| `vozCustom` | string | Não | - | Nome da voz neural (ex: `pt-BR-FranciscaNeural`) |
| `rate` | string | Não | `+0%` | Velocidade da fala (ex: `+20%`, `-10%`) |
| `pitch` | string | Não | `+0Hz` | Tom da voz (ex: `+2Hz`, `-1Hz`) |
| `volume` | string | Não | `+0%` | Volume (ex: `+50%`, `-20%`) |

**Response:** Áudio MP3 binário (`Content-Type: audio/mpeg`)

**Headers de resposta úteis:**
- `X-TTS-Voice`: Voz utilizada
- `X-TTS-Duration`: Tempo de geração em ms

## Vozes Disponíveis

| Tipo | Vozes |
|------|-------|
| Feminina | `pt-BR-FranciscaNeural`, `pt-BR-ThalitaNeural` |
| Masculina | `pt-BR-AntonioNeural`, `pt-BR-DonatoNeural` |

## Análise de Custo

| Item | Detalhe |
|------|---------|
| Plano gratuito | 100.000 requisições/dia |
| CPU por request | ~0.5s de tempo CPU |
| Capacidade estimada | ~50.000 reproduções de áudio/dia |
| Chave de API | Não necessária (usa TTS gratuito do Edge) |
| Plano pago | $5/mês por 10 milhões de requisições |

O plano gratuito cobre tranquilamente uso acadêmico/bíblico.

## Troubleshooting

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `400 - JSON inválido` | Body da requisição malformado | Verifique o Content-Type e o JSON |
| `400 - Texto vazio` | Campo `texto` não enviado ou vazio | Envie texto com pelo menos 1 caractere |
| `400 - Texto muito longo` | Texto > 5000 caracteres | Divida o texto em partes menores |
| `500 - Falha ao gerar áudio` | Edge TTS indisponível ou timeout | Tente novamente em alguns segundos |
| `500 - Timeout` | Resposta do Edge TTS > 25s | Texto muito longo, reduza o tamanho |
| `404 - Not found` | Rota incorreta | Use `/api/audio/edge` ou `/` |

### Ver Logs do Worker

```bash
# Logs em tempo real
npx wrangler tail

# Últimos logs
npx wrangler pages deployment list
```

### Verificar Status

```bash
npx wrangler status
```

### Testar Localmente

```bash
npm run dev
# Worker disponível em http://localhost:8787
```

## Deploy

```bash
# Deploy normal
npm run deploy

# Deploy com diagnósticos
npx wrangler deploy --verbose
```

O worker será disponibilizado em:
`https://sola-scriptura-edge-tts.<seu-subdominio>.workers.dev`
