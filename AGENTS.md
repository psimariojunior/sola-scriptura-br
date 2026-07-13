# Sola Scriptura BR

## Goal
Plataforma de estudo bíblico acadêmico completa, melhor que o Logos. Site + App mobile.

## Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN, Framer Motion, Leaflet (mapas), Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL + pgvector + Elasticsearch, Redis, RabbitMQ
- **Mobile**: Flutter
- **IA**: OpenAI GPT-4 + RAG vetorial (pgvector)
- **Deploy**: Vercel (frontend), Railway (backend)
- **Auth**: Supabase (email/senha + Google OAuth)
- **Áudio**: ElevenLabs TTS + Web Speech API fallback

## Architecture
- Frontend Next.js na raiz do repo (`src/` — App Router)
- Backend em `backend/` (NestJS)
- Mobile em `mobile/` (Flutter)
- Infra em `infra/` (Docker, K8s)
- Supabase em `supabase/`
- Dados em `src/data/` (Bíblia 6 traduções, léxico, comentários, estudos)

## Pages (Frontend — src/app/)
### Principais
- `/` — Landing page
- `/biblia` — Leitura bíblica multi-tradução (ARC, ARA, ACF, KJV, NVI, WEB)
- `/pesquisa` — Pesquisa avançada (Elasticsearch + pgvector)
- `/idiomas` — Grego e Hebraico (léxico Strong's)
- `/exegese` — Exegese automática com IA
- `/teologia` — Teologia sistemática (13 categorias)
- `/historia` — Contexto histórico
- `/personagens` — Biografias bíblicas
- `/cronologia` — Linha do tempo interativa
- `/ia` — Assistente IA (OpenAI GPT-4 + RAG)
- `/estudos` — Estudos salvos + manuais bíblicos
- `/ferramentas` — Concordância, Crítica Textual, Introduções
- `/admin` — Painel administrativo
- `/auth` — Autenticação (login/cadastro)
- `/conta` — Conta do usuário

### Ferramentas
- `/ferramentas/concordancia` — Concordância bíblica
- `/ferramentas/critica-textual` — Crítica textual
- `/ferramentas/introducoes` — Introduções por livro

### Estudos
- `/estudos/[livro]` — Estudo por livro (rota dinâmica)
- `/estudos/genesis`, `/estudos/romanos`, `/estudos/joao`, etc.

### Extras
- `/devocional` — Devocional diário
- `/flashcards` — Flashcards bíblicos
- `/quiz` — Quiz bíblico
- `/comparar` — Comparar traduções
- `/harmonia` — Harmonia sinótica
- `/parabolas` — Parábolas de Jesus
- `/milagres` — Milagres de Jesus
- `/literatura` — Literatura bíblica
- `/sermoes` — Sermões
- `/planos` — Planos de leitura
- `/estatisticas` — Estatísticas de estudo
- `/compartilhar` — Compartilhar versículos
- `/pericopes` — Pericópes
- `/topicos` — Tópicos teológicos
- `/estudo` — Estudo detalhado do versículo

### API Routes
- `/api/ia/perguntar` — Rota de IA (proxy para backend NestJS)
- `/api/ia/stream` — Streaming de respostas IA

## Backend Modules (NestJS — backend/src/modules/)
- `biblia` — Livros, Capítulos, Versículos, Palavras, Traduções
- `pesquisa` — Busca avançada (Elasticsearch + pgvector)
- `exegese` — Análise exegética
- `hermeneutica` — Análise hermenêutica
- `teologia` — Doutrinas, Categorias
- `historia` — Contextos históricos
- `geografia` — Localizações bíblicas
- `arqueologia` — Artefatos e escavações
- `grego` — Palavras gregas (Strong's)
- `hebraico` — Palavras hebraicas (Strong's)
- `cronologia` — Eventos cronológicos
- `personagens` — Personagens bíblicos
- `referencias` — Referências cruzadas
- `comentarios` — Comentários de teólogos
- `ia` — RAG + LLM + Knowledge Graph
- `autenticacao` — JWT + MFA + OAuth
- `usuario` — Perfis e preferências
- `admin` — Painel administrativo
- `plano-leitura` — Planos de leitura
- `favoritos` — Favoritos do usuário
- `notas` — Anotações pessoais
- `dicionario` — Dicionário bíblico

## Infrastructure (backend/src/infra/)
- `database/` — TypeORM config, migrations, seed
- `seguranca/` — JWT, criptografia, MFA
- `ia/` — RAG (pgvector), LLM (OpenAI), Knowledge Graph
- `busca/` — Elasticsearch full-text + semântico
- `observabilidade/` — OpenTelemetry
- `mensageria/` — RabbitMQ
- `graphql/` — Apollo GraphQL
- `cache/` — Redis
- `armazenamento/` — S3/Supabase Storage

## Data (src/data/)
- `biblia/` — 6 traduções completas (ACF, ARA, ARC, KJV, NVI, WEB)
- `lexicon/` — Grego (~5000 palavras), Hebraico (~5000 palavras), Aramaico
- `comentarios.ts` — Comentários versículo a versículo
- `estudosTeologicos.ts` — Estudos teológicos por versículo
- `estudosPorLivro.ts` — Estudos por livro
- `crossReferences.ts` — Referências cruzadas
- `planosLeitura.ts` — Planos de leitura
- `quiz.ts` — Perguntas de quiz
- `teologos.ts` — Lista de teólogos

## Testing
- **Unit**: Jest 30 + React Testing Library (`src/__tests__/`)
- **E2E**: Playwright (Chromium + Mobile Chrome) (`e2e/`)
- **Backend**: Jest + supertest (`backend/src/**/*.spec.ts`)

## Key Decisions
- GraphQL (Apollo) para queries complexas
- i18next para PT/EN
- next-themes para dark mode (4 temas: light, dark, sepia, noturno)
- Leaflet para mapas interativos
- Zustand para state management
- ElevenLabs para TTS profissional
- pgvector para busca semântica

## Relevant Files
- `src/app/layout.tsx` — Root layout
- `src/app/page.tsx` — Landing page
- `src/app/globals.css` — Estilos globais (740 linhas, 4 temas)
- `src/app/biblia/` — Leitura bíblica
- `src/app/pesquisa/` — Pesquisa avançada
- `src/app/teologia/` — Teologia sistemática
- `src/app/ia/` — Assistente IA
- `src/components/` — 34 componentes
- `src/data/` — Dados bíblicos
- `src/hooks/` — Custom hooks
- `src/lib/` — Utilitários
- `src/locales/` — Traduções (PT/EN)
- `src/__tests__/` — Testes unitários
- `e2e/` — Testes E2E
- `backend/src/` — Backend NestJS
- `supabase/` — Supabase config
- `vercel.json` — Deploy config
