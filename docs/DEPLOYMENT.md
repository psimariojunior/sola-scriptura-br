# Deployment Guide - Sola Scriptura BR

## Overview

The Sola Scriptura BR project is deployed across multiple platforms:

- **Frontend**: Vercel (automatic deployment from GitHub)
- **Edge TTS**: Cloudflare Workers (free tier)
- **Backend**: Railway (optional, currently broken)

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
OPENROUTER_API_KEY=your_key_here
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-4o

# Backend API (optional - leave empty if not using backend)
NEXT_PUBLIC_API_URL=
BACKEND_URL=

# Supabase (optional - leave empty for client-side localStorage auth)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# ElevenLabs (optional - for premium voice narration)
NEXT_PUBLIC_ELEVENLABS_API_KEY=

# Cloudflare Edge TTS (set your worker URL)
NEXT_PUBLIC_CLOUDFLARE_TTS_URL=https://sola-scriptura-edge-tts.<subdomain>.workers.dev
```

**Important**: All `NEXT_PUBLIC_` variables are exposed to the client. Never put secrets in these.

### Custom Domain Setup

1. In Vercel Dashboard → Project → Settings → Domains
2. Enter your custom domain (e.g., `sola-scriptura.com.br`)
3. Add the DNS records provided by Vercel:
   - For apex domain: Add an `A` record pointing to `76.76.21.21`
   - For subdomain: Add a `CNAME` record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (can take up to 48 hours)
5. SSL certificate is auto-provisioned by Vercel

### Performance Optimization

- **Static Generation**: Pages with bible content are statically generated at build time
- **Code Splitting**: Next.js App Router automatically splits code by route
- **Image Optimization**: Use `next/image` for any images
- **Bundle Size**: Run `npm run build` locally to check bundle sizes
- **Lighthouse**: Aim for 90+ scores on all metrics

**Build optimization tips:**

```bash
# Analyze bundle size
ANALYZE=true npm run build

# Check for build errors
npm run build 2>&1 | grep -i "error"
```

---

## 2. Cloudflare Workers (Edge TTS)

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
ALLOWED_ORIGIN = "https://your-production-domain.vercel.app"
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

### Update Frontend Config

After deploying, update the frontend environment variable:

```
NEXT_PUBLIC_CLOUDFLARE_TTS_URL=https://sola-scriptura-edge-tts.<your-subdomain>.workers.dev
```

---

## 3. Backend (Railway) — Optional / Broken

> **Note**: The NestJS backend is currently not required. The frontend operates fully with client-side localStorage for user data and Groq/OpenRouter API for AI chat. The backend was originally designed for PostgreSQL, Elasticsearch, and pgvector but is not deployed.

### If you want to set up the backend:

```bash
cd backend
npm install
# Create .env with database URLs
npx prisma migrate deploy
npm run start:prod
```

### Railway deployment:

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Init project: `railway init`
4. Add PostgreSQL plugin
5. Deploy: `railway up`

**Current status**: Backend code exists in `backend/` but is not actively maintained. The frontend works independently.

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

- [ ] Environment variables set in Vercel
- [ ] Cloudflare Worker deployed and URL configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All pages loading correctly
- [ ] AI chat working (requires API key)
- [ ] Edge TTS audio working
- [ ] No console errors in production
