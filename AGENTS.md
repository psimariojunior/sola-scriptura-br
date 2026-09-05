# Sola Scriptura BR

## Objetivo
Plataforma de estudo biblico completa. Site + App mobile. **Acesso livre, sem anuncios.**

## Stack
- **Frontend**: Next.js 16, TypeScript, TailwindCSS, ShadCN, Framer Motion, Leaflet (mapas), Recharts
- **Backend**: NestJS, TypeORM, PostgreSQL + pgvector + Elasticsearch, Redis, RabbitMQ
- **Mobile**: Flutter WebView (mobile_app/) — carrega o site com splash screen dourada
- **IA**: Groq (llama-3.3-70b-versatile, gratuito) + RAG vetorial (pgvector)
- **Deploy**: Vercel (frontend), Oracle VM (backend)
- **Auth**: cookie `ssb_token` (httpOnly) + Google OAuth com state parameter CSRF — cookie `ssb_token` no middleware
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
  - **Passage Guide** — painel único com tudo sobre um versículo (comentários, refs, léxico, mapa, IA)
  - **Insights Sidebar** — painel lateral contextual com mini-insights automáticos
- `/pesquisa` — Pesquisa avancada com **busca semantica** (50 grupos de sinonimos) + **Busca com IA** (linguagem natural via Groq)
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

### Biblioteca Digital (NOVO — rivaliza com Logos Faithlife)
- `/biblioteca` — **Biblioteca Digital "Classicos da Fe"**: 15 obras-primas de dominio publico com textos integrais/selecoes, fichas academicas (contexto historico + importancia), capas CSS estilo editora classica, linha do tempo por seculo, filtros por categoria/nivel, busca, progresso de leitura (localStorage `ssb_bib_leitura`) e "continuar leitura"
- `/biblioteca/[obra]` — Pagina da obra: capa, citação destaque, contexto historico, importancia academica, sumario com checkmarks de capitulos lidos, ficha academica (autor, composicao, idioma original, edicao)
- `/biblioteca/[obra]/[capitulo]` — **Leitor imersivo premium**: barra de progresso de scroll, controle de tamanho de fonte (A-/A+), drop cap no primeiro paragrafo, blockquotes com borda dourada, notas historicas destacadas, sumario expansivel, navegacao anterior/proximo, marcar capitulo como lido
- **Obras** (15, ~9h de leitura): Didache (integral), Epistola a Diogneto (integral), Inacio aos Romanos (integral + trechos), Martirio de Policarpo, Justino Primeira Apologia (com o c.67 — culto dominical mais antigo), Credos Ecumenicos (4 credos com notas), Agostinho Confissoes (selecoes), Westminster Menor (107 perguntas INTEGRAIS), Heidelberg (selecoes), 95 Teses (INTEGRAIS), Lutero Liberdade do Cristao, Calvino Institutas (selecoes), Imitacao de Cristo, Irmão Lawrence, Josefo Queda de Jerusalem
- **Dados**: `src/data/biblioteca/` — `catalogo.ts` (metadados leves), `obras/<id>.ts` (conteudo lazy por rota), `index.ts` (loader dinamico), `types.ts`
- **Componentes**: `src/components/biblioteca/CapaLivro.tsx`, `ObraDetalhe.tsx`, `LeitorObra.tsx`

### Novas (sessao atual)
- `/favoritos` — Versiculos favoritos com cores, filtros por cor/livro, export JSON, ordenacao
- `/notas` — Editor rico com formatacao, tags, historico de versoes
- `/colecoes` — Listas customizadas de versiculos
- `/atlas` — Atlas biblico interativo (20 locais + mapa OpenStreetMap)
- `/harmonia` — Harmonia sinotica interativa (4 colunas: Mateus, Marcos, Lucas, Joao)
- `/planos` — Planos de leitura personalizados (progresso + lembretes push)
- `/mapas` — Mapas biblicos interativos com Leaflet (20 locais, markers coloridos, filtros)
- `/palavras` — Estudo por palavra original (5526 gregos + 8674 hebraicos, Strong's, morfologia)
- `/referencias` — Cadeia de referencias cruzadas (29k+ refs TSK, arvore interativa)
- `/memorizacao` — Flashcards com repeticao espacada (SM-2), quality ratings, stats
- `/relacoes` — Mapa de relacoes biblicas (24 personagens, conexoes visuais)
- `/desafios` — Desafios comunitarios (6 desafios, progresso individual)
- `/comparar-comentarios` — Comparacao de comentarios lado a lado (8 teologos classicos)
- `/dashboard` — Dashboard de progresso pessoal (stats, grafico semanal, streak)
- `/estudo-split` — Modo estudo split view (Biblia + notas lado a lado)
- `/comunidade` — Chat comunitario via WebSocket (5 canais, usernames)
- `/quiz/multiplayer` — Quiz multiplayer com salas, WebSocket, leaderboard

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
- `/api/ia/pesquisa` — **Busca com IA** (linguagem natural, retorna JSON com versículos + explicação)
- `/api/audio/edge` — Edge TTS (gera MP3 via node-edge-tts)
- `/api/notifications` — Push notifications (placeholder)
- `/api/sync` — Sincronizacao de dados do usuario (favoritos, notas, colecoes)

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
- `BuscaGlobal.tsx` — Command Palette (Ctrl+K) com busca, navegacao, acoes tema/idioma
- `ErrorBoundary.tsx` — Tratamento de erros global com retry
- `ShareProgress.tsx` — Compartilhar progresso (WhatsApp, copiar, imagem)
- `CollaborativeStudy.tsx` — Sala de estudo compartilhado com apresentacao, chat, notas
- `PresentationInline.tsx` — Modo apresentacao com mood detection e font size
- `FlashcardSystem.tsx` — Flashcards com repeticao espacada
- `LiveQuiz.tsx` — Quiz com timer, scoring, ranking
- `SharedNotes.tsx` — Notas compartilhadas com cores
- `PassageGuide/` — **Guia da Passagem** (painel único com 13 seções: texto, comentários, léxico, refs, estudos, mapa, contexto, personagens, doutrinas, cronologia, perícope, crítica textual, IA)
- `InsightsPanel.tsx` — **Insights Sidebar** (painel lateral contextual com mini-insights automáticos)
- `InsightsToggle.tsx` — Botão flutuante para toggle dos insights
- `AISearchToggle.tsx` — Toggle para busca com IA na pesquisa
- `AISearchResults.tsx` — Resultados da busca com IA (explicação + cards de versículos)
- `BottomSheet.tsx` — Bottom sheet nativo com snap points
- `PullToRefresh.tsx` — Pull-to-refresh wrapper
- `RoomEntrance.tsx` — Animacao de entrada na sala
- `RoomThemes.tsx` — 7 temas visuais para salas
- `VideoCall.tsx` — Chamada de video/voz via WebRTC

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
- `user-data` — CRUD unificado (favoritos, notas, colecoes, progresso)
- `colaborativo` — WebSocket para salas, chat, apresentacao, videochamada

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
- **optimizePackageImports**: framer-motion + lucide-react + socket.io-client (30-50% menor bundle)
- **Fontes**: reduzidas de 5→2 pesos cada (Inter, Cormorant, Spectral)
- **LayoutWrapper**: framer-motion removido (FloatingDonateButton → CSS animations), Sentry/sync deferrados com requestIdleCallback
- **Removido preconnect** desnecessario (fontes sao locais), html transition, scroll-behavior duplicado

## i18n (Internacionalizacao)
- **Sistema**: react-i18next + LanguageDetector, fallback PT
- **Traducoes**: `src/locales/pt.json` (~600 linhas) + `src/locales/en.json` (~600 linhas)
- **Componentes traduzidos**: Header navLinks, BottomNavBar tabs+grupos, HomeClient (hero, features, stats, sections), Footer (3 colunas, newsletter)
- **Command Palette**: alternar tema (claro/escuro) e idioma (PT/EN) via Ctrl+K
- **Status**: ~150 chaves traduzidas. Home, nav e footer 100%. Paginas internas ainda hardcoded PT
- **Para completar**: traduzir paginas /biblia, /pesquisa, /estudos, /cursos, /ia, etc.

## PWA (Service Worker)
- **sw.js** v3: corrige SW que nao instalava (favicon.ico removido do precache)
- **offline.html**: agora servido em falha de navegacao
- **Precache**: /, /biblia, /pesquisa, /idiomas, etc + /offline.html
- **Cache strategies**: cacheFirst (static), networkFirst (API), staleWhileRevalidate (HTML)
- **Manifest**: shortcuts (Biblia, Pesquisa, IA), id, apple-status-bar-style

## Middleware (src/proxy.ts)
- `/admin` e `/conta` requerem cookie `ssb_token`
- **Tudo mais e publico** — sem auth para conteudo biblico
- Suporta token via cookie, query string (?token=), ou header (x-ssb-token)
- Next.js 16 usa `proxy.ts` em vez de `middleware.ts`

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
- IndexedDB para persistencia de dados do usuario (favoritos, notas, colecoes, flashcards, gamificacao) com localStorage como fallback
- `proxy.ts` (em vez de `middleware.ts`) para auth no Next.js 16
- `syncAll` em `requestIdleCallback` para nao bloquear a UI na inicializacao

## Arquivos Relevantes
- `src/app/layout.tsx` — Layout raiz (SEM force-dynamic, fontes reduzidas)
- `src/app/page.tsx` — Pagina inicial (versiculo do dia + continuar leendo)
- `src/app/globals.css` — Estilos globais (5 temas, glassmorphism, transicoes)
- `src/app/biblia/` — Leitura biblica (interlinear + karaoke + comentarios inline)
- `src/app/pesquisa/` — Pesquisa com busca semantica
- `src/app/harmonia/` — Harmonia sinotica interativa (4 colunas)
- `src/app/atlas/` — Atlas biblico (20 locais + mapa)
- `src/app/favoritos/` — Versiculos favoritos (IndexedDB + localStorage)
- `src/app/notas/` — Anotacoes pessoais (IndexedDB + localStorage)
- `src/app/colecoes/` — Listas de versiculos (IndexedDB + localStorage)
- `src/app/ofertas/` — Ofertas PIX
- `src/components/` — 120+ componentes
- `src/components/BottomNavBar.tsx` — Bottom tab bar mobile
- `src/components/LayoutWrapper.tsx` — Wrapper com providers + sync + skip links + bottom nav
- `src/components/SkipLinks.tsx` — Acessibilidade (skip navigation)
- `src/components/AnalyticsDashboard.tsx` — Dashboard de analytics local
- `src/components/ErrorBoundary.tsx` — Tratamento de erros global com retry
- `src/lib/analytics.ts` — Analytics local (privacy-first, IndexedDB + localStorage)
- `src/lib/supabaseSync.ts` — Sync unificado Supabase para favoritos/notas/colecoes/flashcards/progresso
- `src/lib/pushPlanReminder.ts` — Push notifications inteligentes (lembrete de plano atrasado)
- `src/lib/offlineStorage.ts` — Abstracao IndexedDB (capitulos, favoritos, notas, planos, configuracoes, colecoes, flashcards, gamificacao, marcas)
- `src/lib/offline.ts` — Cache offline de capítulos biblicos + download de traduções via API Midvash
- `src/lib/auth.ts` — Auth custom com cookie ssb_token + localStorage
- `src/lib/llm-config.ts` — Config Groq (server-only)
- `src/lib/rate-limit.ts` — Rate limiting (20/min IA)
- `src/hooks/usePersistenciaLocal.ts` — Hooks unificados IndexedDB-first com localStorage fallback
- `src/hooks/useFlashcards.ts` — Flashcards com repeticao espacada (SM-2) + IndexedDB sync
- `src/lib/gamificationTracker.ts` — Tracker unificado de eventos de gamificação
- `src/lib/pushNotifications.ts` — Notificações push (streak reminders, smart scheduling)
- `src/data/biblia/livros` — Import leve (6KB) para Header
- `src/data/biblia/texto/` — Textos bíblicos locais (6 traduções)
- `src/data/lexicon/hebraico.ts` — 8674 entradas hebraicas
- `src/data/lexicon/grego.ts` — 5526 entradas gregas
- `src/data/comentarios.ts` — 4911 comentarios
- `src/data/crossReferences.ts` — 29k refs cruzadas
- `public/sw.js` v6 — Service worker (visited pages cache, background sync, plan reminders)
- `public/offline.html` — Offline fallback page
- `public/manifest.json` — PWA manifest (shortcuts, id)
- `src/proxy.ts` — Auth middleware (Next.js 16, replaces middleware.ts)
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
| Biblioteca de classicos (Pais da Igreja, Reforma, credos) | 💰 | Parcial | ✅ 15 obras gratis |
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

## TODO (03/08/2026)
### Prioridade Alta
- [ ] **Build do APK** — Rodar `cd mobile_app && flutter build apk --release` para gerar o APK com as Fases 1-3
- [ ] **Testar no celular** — Instalar APK e verificar: widgets, streak, notificações, offline
- [ ] **iOS Widget** — Criar widget para iPhone/iPad (SwiftUI)
- [ ] **Apple Watch** — Complication de streak

### Prioridade Média
- [ ] **Siri Shortcuts** — "Hey Siri, qual o versículo do dia?"
- [ ] **App Clips** — Experiência leve sem instalar
- [ ] **Testes E2E** — Playwright para novas páginas (imersao, sermon-builder, etc)

### Features das Fases (resumo)
- **Fase 1**: Performance (Web Vitals), SEO (sitemap+robots), Acessibilidade, Offline (SW v12)
- **Fase 2**: Streak inteligente, Notificações motivacionais, Offline sync, Settings completo
- **Fase 3**: Widgets Android (versículo+progresso), Background fetch, Compartilhamento nativo

## Changelog Recente (05/09/2026)
### Melhorias de Qualidade e Segurança
- **ScrollReveal.tsx**: Implementado IntersectionObserver real com `whileInView` do framer-motion (antes era fake, sempre mostrava conteúdo)
- **OAuth**: Adicionado state parameter para CSRF protection + tokens via httpOnly cookies (não mais na URL)
- **CacheService**: `KEYS` substituído por `SCAN` (seguro para produção, não bloqueia Redis)
- **RAG Service**: Embeddings API agora usa `OPENAI_BASE_URL` configurável (não mais hardcoded para openai.com)
- **ExegeseService**: Expandido de 35 para 180+ linhas com prompt de exegese completa (12 dimensões)
- **CSS**: Removido color override `.text-blue-*` que forçava todas cores virarem dourado
- **CSS**: Consolidados 3 scrollbar duplicates e 2 ::selection duplicates

### Refatoração de Componentes
- **Pesquisa**: Quebrada de 881 para ~160 linhas com componentes extraídos
  - `useSearchEngine` hook (lógica de busca)
  - `SearchFilters` (sidebar de filtros)
  - `SearchResults` (resultados da busca)
  - `LexiconResults` (resultados do lexicon)
  - `highlightText` (utilitário de destaque)

### Novas Funcionalidades
- **Biblioteca Digital**: Expandida de 15 para 41 obras classicas da cristandade
  - Pais da Igreja: Origenes, Cipriano, Gregorio de Nissa, Basilio, Ambrósio, Jerônimo
  - Espiritualidade: Bunyan, Spurgeon, Baxter, Edwards, Wesley
  - Teologia: C.S. Lewis (2 obras), Bonhoeffer, Adam Clarke
- **Export de Notas**: Modal com export TXT/DOCX/PDF com filtros por tag e data
  - `exportNotes.ts` (utilitários de exportação)
  - `ExportNotesModal.tsx` (componente modal)

### Fase 1: Features que Superam o Logos (05/09/2026)
- **Passage Guide**: Painel único com tudo sobre um versículo
  - `src/components/Biblia/PassageGuide/` — 13 seções (texto, comentários, léxico, refs, estudos, mapa, contexto, personagens, doutrinas, cronologia, perícope, crítica textual, IA)
  - `PassageGuideSection.tsx` — Componente base expandível/colapsável
  - `sections/VerseTextSection.tsx` — Texto multi-tradução
  - `sections/ComentariosSection.tsx` — Comentários teológicos (4911)
  - `sections/CrossRefsSection.tsx` — Referências cruzadas (29k)
  - `sections/LexicoSection.tsx` — Léxico Strong's (8674 + 5526)
  - `sections/EstudoSection.tsx` — Estudos teológicos
  - `sections/MapaSection.tsx` — Mapa Leaflet
  - `sections/ContextoSection.tsx` — Contexto histórico
  - `sections/IASection.tsx` — Pergunta à IA (Groq)
  - Mobile: BottomSheet com snap points (50/75/95vh)
  - Web: Sidebar lateral (420px) com toggle tela cheia
  - Lazy loading granular por seção (evita carregar 14MB de uma vez)
- **Smart Search com IA**: Pesquisa em linguagem natural
  - `src/app/api/ia/pesquisa/route.ts` — Endpoint SSE streaming
  - `src/hooks/pesquisa/useAISearch.ts` — Hook de estado + streaming
  - `src/components/pesquisa/AISearchToggle.tsx` — Toggle "Buscar com IA"
  - `src/components/pesquisa/AISearchResults.tsx` — Resultados com cards de versículos
  - Respostas com explicação teológica + versículos relevantes
- **Insights Sidebar**: Painel lateral contextual
  - `src/hooks/biblia/useInsights.ts` — Hook de dados com cache + pre-computação
  - `src/components/Biblia/InsightsPanel.tsx` — Painel flutuante (web) / BottomSheet (mobile)
  - `src/components/Biblia/InsightsToggle.tsx` — Botão flutuante
  - 3 mini-insights: Comentário (amber), Referência Cruzada (cyan), Palavra-Chave (purple)
  - Pre-computação para 50 versículos comuns via requestIdleCallback
