# Sola Scriptura BR

## Objetivo
Plataforma de estudo biblico academico completa, melhor que o Logos e YouVersion. Site + App mobile. **Tudo gratuito, sem paywall.**

## Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN, Framer Motion, Leaflet (mapas), Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL + pgvector + Elasticsearch, Redis, RabbitMQ
- **Mobile**: Flutter WebView (mobile_app/) — carrega o site com splash screen dourada
- **IA**: Groq (llama-3.3-70b-versatile, gratuito) + RAG vetorial (pgvector)
- **Deploy**: Vercel (frontend), Oracle VM (backend)
- **Auth**: Supabase (email/senha + Google OAuth) — cookie `ssb_token` no middleware
- **Audio**: Edge TTS gratuito (via /api/audio/edge) + ElevenLabs (premium) + Web Speech API fallback
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
- **Config Nginx**: `/etc/nginx/conf.d/api.conf`
- **SSL**: Let's Encrypt via certbot, renovação automática
- **Frontend .env.local**: `NEXT_PUBLIC_API_URL=https://api.solascripturabr.com.br/api/v1`
- **Backend .env (docker)**: `/opt/sola-scriptura/backend/docker/.env`
- **Deploy backend**: GitHub Actions (push em `backend/` → SCP + Docker build na VM)
- **Chaves SSH**: `~/.ssh/oracle-vm-new` (privada), `~/.ssh/deploy_key` (GitHub Actions)
- **Firewall UFW**: Portas 22, 80, 443, 4000 abertas
- **Groq API Key**: Ver `src/.env.local` (variavel OPENAI_API_KEY)

## Arquitetura
- Frontend Next.js na raiz do repositorio (`src/` — App Router)
- Backend em `backend/` (NestJS)
- Mobile app em `mobile_app/` (Flutter WebView)
- Mobile nativo (abandonado) em `mobile/` (Flutter)
- Infra em `infra/` (Docker, K8s)
- Supabase em `supabase/`
- Dados em `src/data/` (Biblia 10 traducoes, lexico, comentarios, estudos)

## Paginas (Frontend — src/app/)
### Principais
- `/` — Pagina inicial (versiculo do dia + continuar leitura + onboarding tour)
- `/biblia` — Leitura biblica multi-traducao (ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV)
  - **Interlinear** — vista palavra-a-palavra com hebraico/grego + Strong's
  - **Karaoke** — sincronizacao audio-versiculo (verso atual destacado em dourado)
  - **Comentarios inline** — badges de comentários expandiveis em cada verso
  - **Referências cruzadas visuais** — grid com cards clicaveis por tipo
- `/pesquisa` — Pesquisa avancada com **busca semantica** (50 grupos de sinonimos)
- `/idiomas` — Grego (5526 palavras) e Hebraico (8674 palavras) lexico Strong's
- `/exegese` — Exegese automatica com IA
- `/teologia` — Teologia sistematica (13 categorias)
- `/historia` — Contexto historico
- `/personagens` — Biografias biblicas (lazy-loaded)
- `/cronologia` — Linha do tempo interativa
- `/ia` — Assistente IA (Groq + RAG)
- `/estudos` — Estudos salvos + manuais biblicos (lazy-loaded)
- `/ferramentas` — Concordancia, Critica Textual, Introducoes
- `/admin` — Painel administrativo (requer auth)
- `/auth` — Autenticacao (login/cadastro)
- `/conta` — Conta do usuario (requer auth)
- `/ofertas` — Ofertas voluntarias via PIX (QR Code + copiar chave)

### Novas (sessao atual)
- `/favoritos` — Versiculos favoritos com cores, filtros por cor/livro
- `/notas` — Anotacoes pessoais por versiculo
- `/colecoes` — Listas customizadas de versiculos
- `/atlas` — Atlas biblico interativo (20 locais + mapa OpenStreetMap)
- `/harmonia` — Harmonia sinotica interativa (4 colunas: Mateus, Marcos, Lucas, Joao)
- `/planos` — Planos de leitura personalizados (progresso + sugestoes)

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
- `/parabolas` — Parabolas de Jesus
- `/milagres` — Milagres de Jesus
- `/literatura` — Literatura biblica
- `/sermoes` — Sermoes
- `/estatisticas` — Estatisticas de estudo (recharts lazy-loaded)
- `/compartilhar` — Compartilhar versulos + **criador de imagem social** (Canvas 1080x1080)
- `/pericopes` — Pericopes
- `/topicos` — Topicos teologicos
- `/estudo` — Estudo detalhado do versiculo

### Rotas da API
- `/api/ia/perguntar` — Rota de IA (proxy para backend NestJS)
- `/api/ia/stream` — Streaming de respostas IA
- `/api/audio/edge` — Edge TTS (gera MP3 via node-edge-tts)
- `/api/notifications` — Push notifications (placeholder)

## Componentes Chave (src/components/)
- `VerseDoDia.tsx` — Versiculo do dia na home page
- `ContinuarLeitura.tsx` — Widget de continuar lendo na home
- `BottomNavBar.tsx` — Bottom tab bar mobile (5 tabs: Inicio, Biblia, Estudos, Pesquisa, Mais)
- `OnboardingTour.tsx` — Tour guiado 4 passos (primeira visita)
- `PageTransition.tsx` — Transicoes suaves entre paginas
- `VerseImageCreator.tsx` — Criador de imagem 1080x1080 para compartilhar
- `ShareVerseImageModal.tsx` — Modal wrapper para criador de imagem
- `InterlinearView.tsx` — Vista interlinear hebraico/grego
- `InterlinearModal.tsx` — Modal com entrada completa do lexico
- `CrossReferenceExplorer.tsx` — Explorador visual de referencias cruzadas
- `ComentarioInline.tsx` — Comentarios inline no verso
- `PlanoPersonalizado.tsx` — Plano de leitura personalizado
- `AdicionarAColecao.tsx` — Dropdown para adicionar verso a colecao
- `NotificationSetup.tsx` — Gerenciamento de push notifications
- `LayoutWrapper.tsx` — Wrapper com providers + SW registration + onboarding + bottom nav

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

## Dados (src/data/)
- `biblia/` — 10 traducoes (ARC, ARA, ACF, KJV, NVI, WEB + NVT, KJA, AA, NBV via API Midvash)
- `lexicon/hebraico.ts` — **8674 entradas** hebraicas (expandido via Strong's)
- `lexicon/grego.ts` — **5526 entradas** gregas (expandido via Strong's)
- `comentarios.ts` — 4911 comentarios consolidados em PT-BR (lazy-loaded, 2.5MB)
- `crossReferences.ts` — 29k referencias cruzadas TSK (lazy-loaded, 7MB)
- `estudosTeologicos.ts` — Estudos teologicos por versiculo
- `estudosPorLivro.ts` — Estudos por livro
- `planosLeitura.ts` — Planos de leitura
- `quiz.ts` — Perguntas de quiz
- `teologos.ts` — Lista de teologos
- `sinopticos.ts` — 252 paralelos sinopticos

## Audio (Sistema TTS)
- **Edge TTS** (padrao, gratuito): gera MP3 via `/api/audio/edge`, Cache API, ~1-3s
- **ElevenLabs** (premium): gera MP3 direto, IndexedDB cache, ~2-6s
- **Web Speech API** (fallback): instantaneo, qualidade baixa
- **Preload**: 3 primeiros versiculos pre-gerados em background via `requestIdleCallback`
- **Karaoke**: versiculo atual destacado com scroll automatico enquanto audio toca
- **Cache**: `audioCache.ts` (IndexedDB) + Edge TTS Cache API (`ssb-edge-tts-cache-v1`)

## Performance
- **Removido `force-dynamic`** do layout raiz — paginas podem ser SSG
- **Lazy load**: recharts (200KB), estudos data (320KB), dicionario (570KB), personagens (76KB)
- **Header leve**: importa `@/data/biblia/livros` (6KB) em vez do barrel (314KB com lexico)
- **optimizePackageImports**: framer-motion + lucide-react (30-50% menor bundle)
- **Fontes**: reduzidas de 5→2 pesos cada (Inter, Cormorant, Spectral)

## PWA (Service Worker)
- **sw.js** v3: corrige SW que nao instalava (favicon.ico removido do precache)
- **offline.html**: agora servido em falha de navegacao
- **Precache**: /, /biblia, /pesquisa, /idiomas, etc + /offline.html
- **Cache strategies**: cacheFirst (static), networkFirst (API), staleWhileRevalidate (HTML)
- **Manifest**: shortcuts (Biblia, Pesquisa, IA), id, apple-status-bar-style

## Middleware (src/middleware.ts)
- `/admin` e `/conta` requerem cookie `ssb_token`
- **Tudo mais e publico** — sem auth para conteudo biblico
- Suporta token via cookie, query string (?token=), ou header (x-ssb-token)

## Temas (5)
- `claro` (light): premium dourado/creme
- `escuro` (dark): padrao, noite dourado escuro
- `dim`: entre light e dark (estilo GitHub) — NOVO
- `sepia`: leitura classica, pergaminho quente
- `noturno`: leitura OLED
- **Glassmorphism**: `.glass-card` com backdrop-blur em todos os temas
- **Transicoes**: `.theme-transition *` com 0.3s em background/color/border

## Onboarding
- Tour guiado 4 passos na primeira visita
- Verifica `localStorage('ssb_onboarding_tour_done')`
- Overlay escuro + highlight dourado + tooltip
- "Pular tour" e "Proximo" com gradiente dourado

## Busca Semantica
- `src/lib/sinonimos.ts` — 50 grupos de conceitos biblicos
- Toggle "Busca Semantica" na pagina de pesquisa
- Ex: "fé" expande para incluir "crer", "crença", "confiança"

## Testes
- **Unitarios**: Jest 30 + React Testing Library (`src/__tests__/`)
- **E2E**: Playwright (Chromium + Mobile Chrome) (`e2e/`)
- **Backend**: Jest + supertest (`backend/src/**/*.spec.ts`)

## Decisoes Importantes
- GraphQL (Apollo) para queries complexas
- i18next para PT/EN
- next-themes para dark mode (5 temas)
- Leaflet para mapas interativos
- Zustand para state management
- Edge TTS para audio gratuito
- pgvector para busca semantica
- Canvas API para criador de imagem social (sem biblioteca externa)

## Arquivos Relevantes
- `src/app/layout.tsx` — Layout raiz (SEM force-dynamic, fontes reduzidas)
- `src/app/page.tsx` — Pagina inicial (versiculo do dia + continuar leendo)
- `src/app/globals.css` — Estilos globais (5 temas, glassmorphism, transicoes)
- `src/app/biblia/` — Leitura biblica (interlinear + karaoke + comentarios inline)
- `src/app/pesquisa/` — Pesquisa com busca semantica
- `src/app/harmonia/` — Harmonia sinotica interativa (4 colunas)
- `src/app/atlas/` — Atlas biblico (20 locais + mapa)
- `src/app/favoritos/` — Versiculos favoritos
- `src/app/notas/` — Anotacoes pessoais
- `src/app/colecoes/` — Listas de versiculos
- `src/app/ofertas/` — Ofertas PIX
- `src/components/` — 120+ componentes
- `src/components/BottomNavBar.tsx` — Bottom tab bar mobile
- `src/components/OnboardingTour.tsx` — Tour guiado
- `src/components/VerseImageCreator.tsx` — Criador de imagem social
- `src/components/InterlinearView.tsx` — Vista interlinear
- `src/components/CrossReferenceExplorer.tsx` — Refs cruzadas visuais
- `src/components/ComentarioInline.tsx` — Comentarios inline
- `src/lib/audioCache.ts` — Cache de audio + preload
- `src/lib/sinonimos.ts` — Sinonimos para busca semantica
- `src/data/lexicon/hebraico.ts` — 8674 entradas hebraicas
- `src/data/lexicon/grego.ts` — 5526 entradas gregas
- `src/data/comentarios.ts` — 4911 comentarios
- `src/data/crossReferences.ts` — 29k refs cruzadas
- `src/lib/llm-config.ts` — Config Groq (server-only)
- `src/lib/rate-limit.ts` — Rate limiting (20/min IA)
- `src/lib/auth.ts` — Auth com cookie ssb_token
- `public/sw.js` v3 — Service worker (offline.html + precache correto)
- `public/manifest.json` — PWA manifest (shortcuts, id)
- `src/middleware.ts` — Auth apenas para /admin e /conta
- `next.config.js` — optimizePackageImports

## Scripts
- `scripts/expand-hebrew-lexicon.mjs` — Expande lexico hebraico via Strong's
- `scripts/build-greek-lexicon.mjs` — Expande lexico grego via Strong's
- `scripts/normalize-data.mjs` — Fix mojibake + normaliza crossReferences
- `scripts/merge-all-commentaries.mjs` — Rebuild comentarios.ts consolidado
- `scripts/add-translation.mjs` — Adiciona traducoes via API Midvash

## Comandos de Manutencao
- **Build+lint+typecheck:** `npm run build`
- **Typecheck only:** `npx tsc --noEmit`
- **Lint only:** `npx next lint`
- **Rebuild comentarios:** `node scripts/merge-all-commentaries.mjs`
- **Expandir hebraico:** `node scripts/expand-hebrew-lexicon.mjs`
- **Expandir grego:** `node scripts/build-greek-lexicon.mjs`
- **Build APK debug:** `cd mobile_app && flutter build apk --debug`
- **Instalar APK:** `cd mobile_app && flutter install --debug`

## Mobile App (mobile_app/)
- **Flutter WebView** que carrega `solascripturabr.com.br`
- Splash screen dourada com logo
- Package: `com.solascriptura.sola_scriptura_app`
- User agent Chrome Desktop para compatibilidade
- Offline indicator (connectivity_plus)
- Share integration (share_plus)
- Bottom navigation via site (BottomNavBar.tsx)
- **Auth funciona** via cookie ssb_token (middleware so pede em /admin e /conta)

## Limites e Rate Limits (PRODUCAO)
- **Groq API**: 100k tokens/dia (on_demand tier)
- **Rotas IA**: 20/min para chat/stream, 10/min para estudo (rate-limit.ts)
- **API midvash.com**: 8s timeout para NAA/NTLH, com fallback

## Comparativo vs Concorrentes
| Feature | Logos | YouVersion | Sola Scriptura |
|---------|:-----:|:----------:|:--------------:|
| Biblia 10 traducoes | ✅ | ✅ | ✅ |
| Lexico hebraico 8674 | 💰 | Basico | ✅ Gratis |
| Lexico grego 5526 | 💰 | Basico | ✅ Gratis |
| Interlinear palavra-a-palavra | 💰 | ❌ | ✅ |
| Versiculo do dia | ✅ | ✅ | ✅ |
| Criador de imagem social | 💰 | ✅ | ✅ |
| Atlas biblico interativo | 💰 | ❌ | ✅ |
| Favoritos / Notas / Colecoes | 💰 | ✅ | ✅ |
| Audio com preload + karaoke | ✅ | ✅ | ✅ |
| Busca semantica | 💰 | ❌ | ✅ |
| Comentarios inline (4911) | 💰 | ❌ | ✅ |
| Referencias cruzadas visuais | 💰 | ❌ | ✅ |
| Harmonia sinotica interativa | 💰 | ❌ | ✅ |
| IA para estudo biblico | 💰 | ❌ | ✅ Gratis |
| Exegese automatica | ❌ | ❌ | ✅ Unico |
| Teologia sistematica 13 cats | Parcial | ❌ | ✅ |
| Plano leitura personalizado | ✅ | ✅ | ✅ |
| Onboarding tour | ❌ | ❌ | ✅ |
| PWA offline | App nativo | App nativo | ✅ |
| Push notifications | ✅ | ✅ | ✅ |
| 5 temas (dim, sepia, noturno) | ❌ | ❌ | ✅ |
| Glassmorphism premium | ❌ | ❌ | ✅ |
| Bottom tab bar mobile | ✅ | ✅ | ✅ |
| Ofertas voluntarias PIX | ✅ | ✅ | ✅ |
