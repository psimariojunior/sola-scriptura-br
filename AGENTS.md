# Sola Scriptura BR

## Goal
Plataforma de estudo bíblico acadêmico completa, melhor que o Logos. Site + App mobile.

## Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN, Framer Motion, Leaflet (mapas), Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL + pgvector + Elasticsearch, Redis, RabbitMQ
- **Mobile**: Flutter
- **IA**: OpenAI GPT-4 + RAG
- **Deploy**: Vercel (frontend), Railway (backend)

## Architecture
- Frontend em `frontend/` (Next.js App Router)
- Backend em `backend/` (NestJS)
- Mobile em `mobile/` (Flutter)
- Infra em `infra/` (Docker, K8s)
- Supabase em `supabase/`

## Pages (Frontend)
- `/` — Landing page
- `/biblia` — Leitura bíblica multi-tradução
- `/pesquisa` — Pesquisa avançada
- `/idiomas` — Grego e Hebraico
- `/exegese` — Exegese automática
- `/teologia` — Teologia sistemática
- `/historia` — Contexto histórico
- `/personagens` — Biografias
- `cronologia` — Linha do tempo
- `/ia` — Assistente IA
- `/estudos` — Estudos salvos
- `/ferramentas` — Ferramentas extras
- `/admin` — Painel administrativo
- `/auth` — Autenticação
- `/conta` — Conta do usuário

## Key Decisions
- GraphQL (Apollo) para queries complexas
- i18next para PT/EN
- next-themes para dark mode
- Leaflet para mapas interativos
- Zustand para state management

## Status
- Frontend: Estrutura criada, componentes base
- Backend: NestJS com TypeORM
- Mobile: Flutter (estrutura inicial)
- Banco: PostgreSQL + pgvector
- Deploy: Vercel + Railway

## Relevant Files
- `frontend/src/app/page.tsx` — Landing page
- `frontend/src/app/biblia/` — Leitura bíblica
- `frontend/src/app/pesquisa/` — Pesquisa
- `frontend/src/app/idiomas/` — Grego/Hebraico
- `frontend/src/app/exegese/` — Exegese
- `frontend/src/app/teologia/` — Teologia
- `frontend/src/app/historia/` — História
- `frontend/src/app/personagens/` — Personagens
- `frontend/src/app/cronologia/` — Cronologia
- `frontend/src/app/ia/` — IA
- `frontend/src/components/` — Componentes
- `backend/src/` — Backend NestJS
- `vercel.json` — Deploy config
