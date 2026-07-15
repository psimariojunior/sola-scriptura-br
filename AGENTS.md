# Sola Scriptura BR

## Objetivo
Plataforma de estudo biblico academico completa, melhor que o Logos. Site + App mobile.

## Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN, Framer Motion, Leaflet (mapas), Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL + pgvector + Elasticsearch, Redis, RabbitMQ
- **Mobile**: Flutter
- **IA**: Groq (llama-3.3-70b-versatile, gratuito) + RAG vetorial (pgvector)
- **Deploy**: Vercel (frontend), Oracle VM (backend)
- **Auth**: Supabase (email/senha + Google OAuth)
- **Audio**: Cloudflare Worker (Edge TTS gratuito) + Web Speech API fallback
- **DNS/Proxy**: Cloudflare (solascripturabr.com.br)

## Infraestrutura (PRODUCAO)
- **VM Oracle**: IP `137.131.184.53`, usuario `ubuntu`, chave SSH em `~/.ssh/oracle-vm-new`
- **Frontend**: Vercel em `https://solascripturabr.com.br`
- **Backend API**: Oracle VM, Nginx reverse proxy em `http://api.solascripturabr.com.br` → `:4000`
- **Banco**: PostgreSQL 16 + pgvector no Docker (porta 5432)
- **Cache**: Redis 7 no Docker (porta 6379)
- **TTS**: Cloudflare Worker `sola-scriptura-edge-tts` (Edge TTS gratuito)
- **Diretorio backend na VM**: `/opt/sola-scriptura/backend/`
- **Docker compose**: `/opt/sola-scriptura/backend/docker/docker-compose.yml`
- **Config Nginx**: `/etc/nginx/conf.d/api.conf` (bloco 443 ssl + proxy `:4000`, bloco 80 só p/ acme-challenge de renovação)
- **SSL**: Certificado Let's Encrypt emitido via `certbot` (webroot `/var/www/api.solascripturabr.com.br`), cert em `/etc/letsencrypt/live/api.solascripturabr.com.br/`, renovação automática (certbot.timer). Se a API der timeout, checar se a porta 443 está escutando (`ss -tlnp | grep 443`).
- **Frontend .env.local**: `NEXT_PUBLIC_API_URL=https://api.solascripturabr.com.br/api/v1`
- **Backend .env (docker)**: `/opt/sola-scriptura/backend/docker/.env`
- **Deploy backend**: GitHub Actions (push em `backend/` → SCP + Docker build na VM)
- **Chaves SSH**: `~/.ssh/oracle-vm-new` (privada), `~/.ssh/deploy_key` (GitHub Actions)
- **Firewall UFW**: Portas 22, 80, 443, 4000 abertas
- **Groq API Key**: Ver `src/.env.local` (variavel OPENAI_API_KEY)

## Arquitetura
- Frontend Next.js na raiz do repositorio (`src/` — App Router)
- Backend em `backend/` (NestJS)
- Mobile em `mobile/` (Flutter)
- Infra em `infra/` (Docker, K8s)
- Supabase em `supabase/`
- Dados em `src/data/` (Biblia 6 traducoes, lexico, comentarios, estudos)

## Paginas (Frontend — src/app/)
### Principais
- `/` — Pagina inicial
- `/biblia` — Leitura biblica multi-traducao (ARC, ARA, ACF, KJV, NVI, WEB)
- `/pesquisa` — Pesquisa avancada (Elasticsearch + pgvector)
- `/idiomas` — Grego e Hebraico (lexico Strong's)
- `/exegese` — Exegese automatica com IA
- `/teologia` — Teologia sistematica (13 categorias)
- `/historia` — Contexto historico
- `/personagens` — Biografias biblicas
- `/cronologia` — Linha do tempo interativa
- `/ia` — Assistente IA (OpenAI GPT-4 + RAG)
- `/estudos` — Estudos salvos + manuais biblicos
- `/ferramentas` — Concordancia, Critica Textual, Introducoes
- `/admin` — Painel administrativo
- `/auth` — Autenticacao (login/cadastro)
- `/conta` — Conta do usuario

### Ferramentas
- `/ferramentas/concordancia` — Concordancia biblica
- `/ferramentas/critica-textual` — Critica textual
- `/ferramentas/introducoes` — Introducoes por livro

### Estudos
- `/estudos/[livro]` — Estudo por livro (rota dinamica)
- `/estudos/genesis`, `/estudos/romanos`, `/estudos/joao`, etc.

### Extras
- `/devocional` — Devocional diario
- `/flashcards` — Flashcards biblicos
- `/quiz` — Quiz biblico
- `/comparar` — Comparar traducoes
- `/harmonia` — Harmonia sinotica
- `/parabolas` — Parabolas de Jesus
- `/milagres` — Milagres de Jesus
- `/literatura` — Literatura biblica
- `/sermoes` — Sermoes
- `/planos` — Planos de leitura
- `/estatisticas` — Estatisticas de estudo
- `/compartilhar` — Compartilhar versiculos
- `/pericopes` — Pericopes
- `/topicos` — Topicoss teologicos
- `/estudo` — Estudo detalhado do versiculo

### Rotas da API
- `/api/ia/perguntar` — Rota de IA (proxy para backend NestJS)
- `/api/ia/stream` — Streaming de respostas IA

## Modulos do Backend (NestJS — backend/src/modules/)
- `biblia` — Livros, Capitulos, Versiculos, Palavras, Traducoes
- `pesquisa` — Pesquisa avancada (Elasticsearch + pgvector)
- `exegese` — Analise exegetica
- `hermeneutica` — Analise hermeneutica
- `teologia` — Doutrinas, Categorias
- `historia` — Contextos historicos
- `geografia` — Localizacoes biblicas
- `arqueologia` — Artefatos e escavacoes
- `grego` — Palavras gregas (Strong's)
- `hebraico` — Palavras hebraicas (Strong's)
- `cronologia` — Eventos cronologicos
- `personagens` — Personagens biblicos
- `referencias` — Referencias cruzadas
- `comentarios` — Comentarios de teologos
- `ia` — RAG + LLM + Knowledge Graph
- `autenticacao` — JWT + MFA + OAuth
- `usuario` — Perfis e preferencias
- `admin` — Painel administrativo
- `plano-leitura` — Planos de leitura
- `favoritos` — Favoritos do usuario
- `notas` — Anotacoes pessoais
- `dicionario` — Dicionario biblico

## Infraestrutura do Backend (backend/src/infra/)
- `database/` — Config TypeORM, migrations, seed
- `seguranca/` — JWT, criptografia, MFA
- `ia/` — RAG (pgvector), LLM (OpenAI), Knowledge Graph
- `busca/` — Elasticsearch full-text + semantico
- `observabilidade/` — OpenTelemetry
- `mensageria/` — RabbitMQ
- `graphql/` — Apollo GraphQL
- `cache/` — Redis
- `armazenamento/` — S3/Supabase Storage

## Dados (src/data/)
- `biblia/` — 6 traducoes completas (ACF, ARA, ARC, KJV, NVI, WEB)
- `lexicon/` — Grego (~5000 palavras), Hebraico (~5000 palavras), Aramaico
- `comentarios.ts` — Comentarios versiculo a versiculo
- `estudosTeologicos.ts` — Estudos teologicos por versiculo
- `estudosPorLivro.ts` — Estudos por livro
- `crossReferences.ts` — Referencias cruzadas
- `planosLeitura.ts` — Planos de leitura
- `quiz.ts` — Perguntas de quiz
- `teologos.ts` — Lista de teologos

## Testes
- **Unitarios**: Jest 30 + React Testing Library (`src/__tests__/`)
- **E2E**: Playwright (Chromium + Mobile Chrome) (`e2e/`)
- **Backend**: Jest + supertest (`backend/src/**/*.spec.ts`)

## Decisoes Importantes
- GraphQL (Apollo) para queries complexas
- i18next para PT/EN
- next-themes para dark mode (4 temas: light, dark, sepia, noturno)
- Leaflet para mapas interativos
- Zustand para state management
- ElevenLabs para TTS profissional
- pgvector para busca semantica

## Arquivos Relevantes
- `src/app/layout.tsx` — Layout raiz
- `src/app/page.tsx` — Pagina inicial
- `src/app/globals.css` — Estilos globais (740 linhas, 4 temas)
- `src/app/biblia/` — Leitura biblica
- `src/app/pesquisa/` — Pesquisa avancada
- `src/app/teologia/` — Teologia sistematica
- `src/app/ia/` — Assistente IA
- `src/components/` — 34 componentes
- `src/data/` — Dados biblicos
- `src/hooks/` — Custom hooks
- `src/lib/` — Utilitarios
- `src/locales/` — Traducoes (PT/EN)
- `src/__tests__/` — Testes unitarios
- `e2e/` — Testes E2E
- `backend/src/` — Backend NestJS
- `supabase/` — Config Supabase
- `vercel.json` — Config de deploy
