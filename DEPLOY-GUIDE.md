# Guia de Deploy - Sola Scriptura BR

## Arquitetura
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (NestJS)
- **Banco**: Render PostgreSQL (gratuito)

---

## Passo 1: Push das alterações para o GitHub

```bash
cd sola-scriptura-br
git add .
git commit -m "feat: deploy on Render"
git push origin main
```

---

## Passo 2: Criar conta no Render

1. Acesse [render.com](https://render.com) e crie uma conta (pode usar GitHub login)
2. Verifique seu email

---

## Passo 3: Deploy Automático com Blueprint

1. No Render, clique em **"New +"** → **"Blueprint"**
2. Conecte seu GitHub (`psimariojunior/sola-scriptura-br`)
3. O Render vai detectar o `render.yaml` automaticamente
4. Ele vai criar:
   - Um **PostgreSQL** database gratuito
   - Um **Web Service** (backend NestJS)
5. Clique em **"Apply"** para criar tudo

**Pronto!** O render.yaml configura tudo automaticamente:
- Database PostgreSQL criado
- Variáveis de ambiente preenchidas
- JWT_SECRET gerado automaticamente
- Build e deploy do backend

---

## Passo 4: Esperar o Deploy

1. Vá em **"Dashboard"** para acompanhar
2. O Render vai:
   - Criar o PostgreSQL (~1 min)
   - Instalar dependências (`npm install`)
   - Compilar TypeScript (`npm run build`)
   - Rodar migrations (`npm run migration:run`)
   - Iniciar o servidor (`npm run start:prod`)
3. Aguarde o status ficar **"Live"**
4. Copie a URL (ex: `https://sola-scriptura-backend.onrender.com`)

---

## Passo 5: Verificar o Backend

Acesse:
```
https://SEU-BACKEND.onrender.com/api/v1/health
```

Deve retornar:
```json
{
  "status": "online",
  "database": { "status": "connected", "latencyMs": 5 }
}
```

> **NOTA**: O Render gratuito "dorme" após 15 min sem uso. Na primeira vez que acessar, pode demorar ~30 segundos para acordar.

---

## Passo 6: Configurar o Frontend no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório `psimariojunior/sola-scriptura-br`
3. Vercel detecta Next.js automaticamente
4. Na página de configuração, adicione as **Environment Variables**:

### Variáveis OBRIGATÓRIAS:
```
NEXT_PUBLIC_API_URL=https://SEU-BACKEND.onrender.com/api/v1
BACKEND_URL=https://SEU-BACKEND.onrender.com/api/v1
```

### Variáveis OPCIONAIS (para IA):
```
OPENROUTER_API_KEY=sua-chave-aqui
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-4o
```

5. Clique em **"Deploy"**
6. Aguarde o build (~2 min)
7. Copie a URL do Vercel (ex: `https://sola-scriptura-two.vercel.app`)

---

## Passo 7: Atualizar o Backend com a URL do Frontend

1. Volte ao Render
2. No serviço do backend, vá em **"Environment"**
3. Adicione:
```
FRONTEND_URL=https://sua-url.vercel.app
```
4. Clique em **"Save"** → Render vai redesploy automaticamente

---

## Passo 8: Verificar Tudo

1. Acesse `https://sua-url.vercel.app`
2. Teste a leitura da Bíblia
3. Teste o login/cadastro
4. Teste o assistente de IA (se configurou a chave)

---

## Variáveis de Ambiente (Referência)

### Backend (configuradas automaticamente pelo render.yaml):
| Variável | Valor | Obrigatória? |
|---|---|---|
| `NODE_ENV` | `production` | Sim |
| `PORT` | `4000` | Sim |
| `DATABASE_URL` | (auto do Render) | Sim |
| `DB_HOST` | (auto do Render) | Sim (migrations) |
| `DB_PORT` | (auto do Render) | Sim (migrations) |
| `DB_USER` | (auto do Render) | Sim (migrations) |
| `DB_PASSWORD` | (auto do Render) | Sim (migrations) |
| `DB_NAME` | `sola_scriptura` | Sim (migrations) |
| `DB_SSL` | `true` | Sim |
| `JWT_SECRET` | (auto-gerado) | Sim |
| `FRONTEND_URL` | (sua URL Vercel) | Sim (CORS) |

### Frontend (configurar no Vercel):
| Variável | Valor | Obrigatória? |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL do backend + `/api/v1` | Sim |
| `BACKEND_URL` | URL do backend + `/api/v1` | Sim |
| `OPENROUTER_API_KEY` | Sua chave | Para IA |
| `LLM_BASE_URL` | `https://openrouter.ai/api/v1` | Para IA |
| `LLM_MODEL` | `openai/gpt-4o` | Para IA |

---

## Render Gratuito - Limitações

- **Backend**: 750 horas/mês (spins down after 15 min idle)
- **PostgreSQL**: 90 dias grátis (depois precisa upgrade)
- **Build timeout**: 20 minutos
- **RAM**: 512 MB

> O backend "dorme" após 15 min sem tráfego. Na primeira requisição, leva ~30s para acordar. Para manter acordado, pode usar um cron job no [cron-job.org](https://cron-job.org) fazendo ping a cada 10 min.

---

## Troubleshooting

### Backend não sobe no Render
- Verifique os logs em Render → Logs
- Erro de migrations: verifique se o banco foi criado
- Timeout no build: pode ser falta de memória (upgrade de plano)

### Frontend não conecta ao backend
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Verifique se o backend retorna HTTP 200 no `/api/v1/health`
- Verifique o CORS: `FRONTEND_URL` deve bater com a URL do Vercel

### Backend demora a responder
- Normal no plano gratuito — o Render "dorme" após 15 min idle
- Use um cron job para manter acordado
- Ou faça upgrade para o plano pago ($7/mês)

### Health check retorna "degraded"
- O banco de dados não está acessível
- Verifique as credenciais do PostgreSQL
- Verifique se SSL está habilitado (`DB_SSL=true`)
