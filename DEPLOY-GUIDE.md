# Guia de Deploy - Sola Scriptura BR

## Arquitetura Atual
- **Frontend**: Vercel (Next.js 14) — deploy automático do GitHub
- **Backend**: Oracle Cloud VM (NestJS + Docker Compose)
- **Banco**: PostgreSQL 16 + pgvector (Docker na VM)
- **Cache**: Redis 7 (Docker na VM)
- **Edge TTS**: Cloudflare Workers (plano gratuito)
- **IA**: Groq API (llama-3.3-70b-versatile, gratuito)

### URLs de Produção
| Serviço | URL |
|---------|-----|
| Frontend | https://solascripturabr.com |
| Backend API | https://api.solascripturabr.com.br/api/v1 |
| API Docs | https://api.solascripturabr.com.br/api/docs |
| Health Check | https://api.solascripturabr.com.br/api/v1/health |

---

## Deploy do Backend (Oracle Cloud VM)

### Pré-requisitos
- Oracle Cloud Free Tier (VM.Standard.A1.Flex: 4 OCPU, 24GB RAM)
- Docker + Docker Compose instalados na VM
- Domínio `solascripturabr.com` configurado com DNS apontando para a VM
- SSL via Let's Encrypt (Certbot)

### Setup Inicial da VM

```bash
# Conectar na VM
ssh -i sua-chave.pem ubuntu@SEU_IP_ORACLE

# Clonar o repositório
cd /opt/sola-scriptura
git clone https://github.com/psimariojunior/sola-scriptura-br.git backend

# Configurar variáveis de ambiente
cd backend/docker
cp .env.example .env
# Editar .env com as credenciais reais

# Iniciar serviços
docker-compose up -d --build

# Verificar health
curl https://api.solascripturabr.com.br/api/v1/health
```

### Docker Compose (Oracle VM)

O arquivo `backend/docker/docker-compose.yml` inclui:
- **backend** — NestJS app (porta 4000)
- **postgres** — PostgreSQL 16 + pgvector
- **redis** — Redis 7
- **nginx** — Reverse proxy com TLS
- **certbot** — SSL Let's Encrypt automático

### Deploy via GitHub Actions

O workflow `.github/workflows/deploy-backend.yml` faz deploy automático:
1. Detecta mudanças na pasta `backend/`
2. Faz rsync dos arquivos via SSH para a VM
3. Roda `docker-compose down` + `up -d --build`
4. Executa migrations e seed
5. Verifica health check

### Secrets Necessários no GitHub

| Secret | Descrição |
|--------|-----------|
| `VM_SSH_KEY` | Chave SSH privada para acessar a VM |
| `VM_IP` | IP público da Oracle VM |
| `VM_USER` | Usuário da VM (geralmente `ubuntu`) |

### Variáveis de Ambiente do Backend

```bash
# backend/.env (produção)
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://sola_scriptura:SOLAScriptura2024!@postgres:5432/sola_scriptura
DB_HOST=postgres
DB_PORT=5432
DB_USER=sola_scriptura
DB_PASSWORD=SOLAScriptura2024!
DB_NAME=sola_scriptura
DB_SSL=false  # Internal Docker network
JWT_SECRET=seu_jwt_secret_aqui
FRONTEND_URL=https://solascripturabr.com
CORS_ORIGINS=https://solascripturabr.com,https://www.solascripturabr.com
OPENAI_API_KEY=sua_openai_key
```

---

## Deploy do Frontend (Vercel)

### Configuração Automática

1. Conecte o repositório ao Vercel
2. Vercel detecta Next.js automaticamente
3. Deploy automático a cada push no `main`

### Variáveis de Ambiente no Vercel

```
# IA (obrigatório)
OPENAI_API_KEY=gsk_...  # Groq API key
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile

# Backend API
NEXT_PUBLIC_API_URL=https://api.solascripturabr.com.br/api/v1
BACKEND_URL=https://api.solascripturabr.com.br/api/v1

# Cloudflare TTS
NEXT_PUBLIC_CLOUDFLARE_TTS_URL=https://sola-scriptura-edge-tts.<subdomain>.workers.dev
```

### Domínio Customizado

1. No Vercel Dashboard → Settings → Domains
2. Adicione `solascripturabr.com` e `www.solascripturabr.com`
3. Configure DNS conforme instruções do Vercel
4. SSL é provisionado automaticamente

---

## Cloudflare Workers (Edge TTS)

```bash
cd cloudflare
npm install
npx wrangler login
npm run deploy
```

O worker fornece TTS neural gratuito (Microsoft Edge voices).

---

## Troubleshooting

### Backend não responde
```bash
# Verificar logs na VM
ssh ubuntu@SEU_IP
cd /opt/sola-scriptura/backend/docker
docker-compose logs --tail=50 backend

# Reiniciar serviços
docker-compose restart

# Verificar containers
docker-compose ps
```

### Frontend não conecta ao backend
- Verifique se `NEXT_PUBLIC_API_URL` está correto no Vercel
- Verifique se o backend retorna 200 no `/api/v1/health`
- Verifique CORS: `FRONTEND_URL` deve ser `https://solascripturabr.com`

### SSL não funciona
```bash
# Renovar certificado na VM
docker-compose run --rm certbot renew
docker-compose restart nginx
```

### Banco de dados
```bash
# Acessar PostgreSQL na VM
docker exec -it sola-scriptura-postgres psql -U sola_scriptura -d sola_scriptura

# Rodar migrations manualmente
docker exec sola-scriptura-backend npm run migration:run
```
