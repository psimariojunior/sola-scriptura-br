# Deployment Guide - Sola Scriptura BR

## Overview

The Sola Scriptura BR project is deployed across multiple platforms:

- **Frontend**: Vercel (automatic deployment from GitHub)
- **Backend**: Oracle Cloud VM (Docker Compose)
- **Edge TTS**: Cloudflare Workers (free tier)
- **AI**: Groq API (llama-3.3-70b-versatile, free)

---

## 1. Vercel Deployment (Frontend)

### Automatic Deployment

The project deploys automatically from GitHub via Vercel.

**Steps to enable:**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select the `sola-scriptura-br` repository
4. Vercel auto-detects Next.js — no framework configuration needed
5. Click "Deploy"

Every push to `main` triggers a production deployment. Pull requests get preview deployments.

### Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```
# AI Chat (required)
OPENAI_API_KEY=gsk_...  # Groq API key
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile

# Backend API
NEXT_PUBLIC_API_URL=https://api.solascripturabr.com.br/api/v1
BACKEND_URL=https://api.solascripturabr.com.br/api/v1

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Cloudflare Edge TTS
NEXT_PUBLIC_CLOUDFLARE_TTS_URL=https://sola-scriptura-edge-tts.<subdomain>.workers.dev
```

**Important**: All `NEXT_PUBLIC_` variables are exposed to the client. Never put secrets in these.

### Custom Domain Setup

1. In Vercel Dashboard → Project → Settings → Domains
2. Enter `solascripturabr.com`
3. Add DNS records:
   - Apex domain: `A` record pointing to `76.76.21.21`
   - www: `CNAME` record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)
5. SSL is auto-provisioned by Vercel

### Performance Optimization

- **Static Generation**: Pages with bible content are statically generated at build time
- **Code Splitting**: Next.js App Router automatically splits code by route
- **Image Optimization**: Use `next/image` for any images
- **Bundle Size**: Run `npm run build` locally to check bundle sizes

---

## 2. Oracle Cloud VM (Backend)

### Architecture

- **VM**: VM.Standard.A1.Flex (ARM, 4 OCPU, 24GB RAM) — Free Tier
- **OS**: Ubuntu 22.04
- **Stack**: Docker Compose (NestJS, PostgreSQL 16, Redis 7, Nginx, Certbot)
- **Domain**: `api.solascripturabr.com.br`

### Setup

```bash
# Connect to VM
ssh -i your-key.pem ubuntu@YOUR_VM_IP

# Clone repository
cd /opt/sola-scriptura
git clone https://github.com/psimariojunior/sola-scriptura-br.git backend

# Configure environment
cd backend/docker
cp .env.example .env
# Edit .env with real credentials

# Start services
docker-compose up -d --build

# Verify
curl https://api.solascripturabr.com.br/api/v1/health
```

### Docker Compose Services

| Service | Port | Description |
|---------|------|-------------|
| backend | 4000 | NestJS API |
| postgres | 5432 | PostgreSQL 16 + pgvector |
| redis | 6379 | Cache |
| nginx | 80/443 | Reverse proxy + TLS |
| certbot | — | SSL renewal |

### GitHub Actions Deploy

Workflow `.github/workflows/deploy-backend.yml`:
1. Triggers on changes to `backend/` folder
2. Rsync files via SSH to VM
3. Runs `docker-compose down` + `up -d --build`
4. Executes migrations and seed
5. Health check

**Required GitHub Secrets:**

| Secret | Description |
|--------|-----------|
| `VM_SSH_KEY` | SSH private key for VM access |
| `VM_IP` | Oracle VM public IP |
| `VM_USER` | VM user (usually `ubuntu`) |

### SSL/SSL Setup

Certbot auto-renews SSL certificates. Manual renewal:

```bash
docker-compose run --rm certbot renew
docker-compose restart nginx
```

---

## 3. Cloudflare Workers (Edge TTS)

The Edge TTS worker provides free Microsoft Neural voice synthesis.

### Setup

```bash
cd cloudflare
npm install
npx wrangler login
npm run deploy
```

### Configuration

Edit `cloudflare/wrangler.toml`:

```toml
name = "sola-scriptura-edge-tts"
main = "src/worker.ts"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[vars]
ALLOWED_ORIGIN = "https://solascripturabr.com"
```

### Available Voices

| Type | Voices |
|------|--------|
| Feminina | `pt-BR-FranciscaNeural`, `pt-BR-ThalitaNeural` |
| Masculina | `pt-BR-AntonioNeural`, `pt-BR-DonatoNeural` |

### Limits

- Free tier: 100,000 requests/day
- CPU time: 30s per request
- No API key required (uses free Edge TTS)

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test
npm run test:e2e

# Build for production
npm run build
```

---

## 5. Post-Deployment Checklist

- [ ] Backend responding at `https://api.solascripturabr.com.br/api/v1/health`
- [ ] Frontend deployed at `https://solascripturabr.com`
- [ ] Cloudflare Worker deployed and URL configured
- [ ] SSL certificates active (Vercel auto + Certbot auto)
- [ ] All pages loading correctly
- [ ] AI chat working (Groq API)
- [ ] Edge TTS audio working
- [ ] No console errors in production

---

## 6. Monitoring

- **Health Check**: `GET /api/v1/health`
- **API Docs**: `GET /api/docs` (Swagger)
- **Backend Logs**: `docker-compose logs -f backend` (on VM)
- **Nginx Logs**: `docker-compose logs -f nginx` (on VM)
