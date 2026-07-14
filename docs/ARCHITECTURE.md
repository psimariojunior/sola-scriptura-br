# System Architecture - Sola Scriptura BR

## Overview

A comprehensive biblical study platform built with Next.js 14, designed to provide academic-level biblical resources with a modern web experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + ShadCN UI |
| Animations | Framer Motion |
| Maps | Leaflet |
| Charts | Recharts |
| i18n | i18next (PT/EN) |
| Themes | next-themes (4 themes) |
| AI | Groq API + OpenRouter |
| Audio | Edge TTS (Cloudflare Workers) + Web Speech API + ElevenLabs (optional) |
| Auth | Client-side localStorage (no backend dependency) |
| Testing | Jest (unit) + Playwright (E2E) |

## Project Structure

```
sola-scriptura-br/
├── src/
│   ├── app/           # Next.js App Router pages (49 routes)
│   ├── components/    # React components (85+ files)
│   ├── data/          # Static data files (bible, lexicon, commentaries)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── locales/       # i18n translations (PT/EN)
├── e2e/               # Playwright E2E tests (34 spec files)
├── cloudflare/        # Cloudflare Worker for Edge TTS
├── backend/           # NestJS backend (optional, not required)
├── mobile/            # Flutter mobile app (not yet implemented)
└── infra/             # Infrastructure configs
```

## Frontend Architecture

### Pages (49 Routes)

**Core Pages:**
- `/` — Landing page
- `/biblia` — Multi-translation Bible reader
- `/pesquisa` — Advanced search
- `/idiomas` — Greek and Hebrew lexicon
- `/exegese` — AI-powered exegesis
- `/teologia` — Systematic theology (13 categories)
- `/historia` — Historical context
- `/personagens` — Biblical biographies
- `/cronologia` — Interactive timeline
- `/ia` — AI assistant (Groq/OpenRouter)
- `/estudos` — Saved studies + biblical manuals

**Study Tools:**
- `/ferramentas/concordancia` — Biblical concordance
- `/ferramentas/critica-textual` — Textual criticism
- `/ferramentas/introducoes` — Book introductions

**Study Books:**
- `/estudos/[livro]` — Dynamic route for all 66 books
- `/estudos/genesis`, `/estudos/romanos`, `/estudos/joao`, etc.

**Extra Features:**
- `/devocional` — Daily devotional
- `/flashcards` — Biblical flashcards
- `/quiz` — Biblical quiz (5 modes)
- `/comparar` — Compare translations
- `/harmonia` — Synoptic harmony
- `/parabolas` — Parables of Jesus
- `/milagres` — Miracles of Jesus
- `/literatura` — Biblical literature
- `/sermoes` — Sermons
- `/planos` — Reading plans
- `/estatisticas` — Study statistics
- `/compartilhar` — Share verses
- `/pericopes` — Pericopes
- `/topicos` — Theological topics
- `/estudo` — Detailed verse study
- `/admin` — Admin panel
- `/auth/login`, `/auth/cadastro` — Authentication
- `/conta` — User account

### Components (85+ files)

**Bible Components (`src/components/Biblia/`):**
- `VerseCard.tsx` — Individual verse display
- `VerseActions.tsx` — Verse actions menu
- `TranslationDropdown.tsx` — Translation selector
- `ToolsDropdown.tsx` — Study tools menu
- `SidePanel.tsx` — Side panel for notes/comments
- `SettingsPanel.tsx` — Display settings
- `QuickSearchModal.tsx` — Quick search dialog
- `ProgressBar.tsx` — Reading progress
- `ModoLeitura.tsx` — Reading mode
- `MobileBookMenu.tsx` — Mobile book selector
- `ComparisonTable.tsx` — Parallel translations
- `ChapterHeader.tsx` — Chapter header with info
- `AudioPlayers.tsx` — Audio playback controls
- `AnnotationModal.tsx` — Verse annotations

**AI Components:**
- `AIChat.tsx` — Main chat interface
- `AIPainelLateral.tsx` — AI side panel
- `AIMiniPainel.tsx` — Compact AI panel

**Audio Components:**
- `AudioNeural.tsx` — Edge TTS neural audio
- `AudioNaturalPlayer.tsx` — Natural voice player
- `NarradorSelector.tsx` — Voice selection
- `NarracaoDramatica.tsx` — Dramatic narration
- `VerseAudio.tsx` — Verse-level audio
- `VersiculoAudioNatural.tsx` — Natural verse audio
- `PainelQualidadeAudio.tsx` — Audio quality settings

**UI Components (`src/components/ui/`):**
- `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, etc. (24 ShadCN components)

**Other Components:**
- `Header.tsx`, `Footer.tsx` — Layout
- `BuscaGlobal.tsx` — Global search
- `BiblicalMap.tsx` — Interactive maps
- `QuizCard.tsx`, `QuizTimer.tsx`, `QuizResults.tsx`, `QuizProgress.tsx`
- `Flashcards/` — Flashcard components
- `Apresentacao/` — Presentation mode
- `ThemeProvider.tsx`, `PageTransition.tsx`, `LoadingStates.tsx`

## Data Layer

### Bible Text (`src/data/biblia/`)

- **9 translations**: ARC, NVI, NAA, ARA, ACF, AA, NTLH, KJV, WEB
- **31,102 verses** across 66 books
- **Languages**: Portuguese (7) + English (2)
- **File structure**: Each book has individual files per translation (e.g., `texto/arc/gn.ts`)

### Lexicon (`src/data/lexicon/`)

- **Greek**: 1,100+ terms with Strong's numbers, transliteration, definitions, morphology
- **Hebrew**: 1,500+ terms with Strong's numbers, transliteration, definitions
- **Aramaic**: Additional terms

### Commentaries (`src/data/comentarios.ts`)

- **546+ verse-by-verse commentaries**
- Authors: Calvino, Agostinho, Lutero, Matthew Henry, Tomás de Aquino, Orígenes, etc.
- Types: historical, theological, grammatical, cultural, application, eschatological

### Theological Studies (`src/data/estudosTeologicos.ts`)

- **405 studies** with multiple theological perspectives
- Coverage: Creation, sin, salvation, eschatology, etc.
- Theologians: Augustine, Aquinas, Calvin, Barth, Stott, etc.

### Dictionary (`src/data/dicionarioBiblico.ts`)

- **1,150+ entries** organized alphabetically
- Categories: persons, places, events, institutions, doctrines, objects, concepts, practices
- Includes etymology, Hebrew/Greek terms, theological significance

### Book Introductions (`src/data/estudosPorLivro.ts`)

- **66 complete introductions** (one per book)
- Context, genre, themes, key verses, study questions

### Sermons (`src/data/sermoes.ts`)

- **92 organized sermons**
- Categories: Salvation, Faith, Prayer, Love, Hope, Judgment, Grace, Holy Spirit, Church, Eschatology

### Quiz (`src/data/quiz.ts`)

- **100+ questions** across 5 categories
- Types: Multiple choice, true/false, fill-in, ordering, reference, citation
- Difficulty levels: Easy, Medium, Hard

### Reading Plans (`src/data/planosLeitura.ts`)

- Multiple reading plans for different goals
- Expanded plans with progress tracking

### Biblical Manuals (`src/data/manuais/`)

- 9 theological manuals: Bibliology, Christology, Pneumatology, Soteriology, Ecclesiology, Eschatology, Angelology, Anthropology, Hamartiology

## Authentication

Client-side only using localStorage:

- **No backend dependency** — works fully offline for user data
- **Data stored locally**: notes, favorites, reading progress, quiz scores
- **Supabase integration**: Optional for cloud sync (requires setup)
- **Google OAuth**: Optional for easy login (requires Supabase setup)

## AI Integration

### Primary: Groq API

- Fast inference with open-source models
- Used for AI chat, exegesis, and study assistance

### Fallback: OpenRouter

- Access to GPT-4o, Claude, etc.
- Configurable via environment variables

### Local Fallback

- If no API key is set, provides basic responses from local data

## Audio System

### Edge TTS (Primary)

- Cloudflare Worker provides free Microsoft Neural voices
- Portuguese Brazilian voices: Francisca, Thalita, Antonio, Donato
- No API key required

### Web Speech API (Fallback)

- Browser-native TTS when Edge TTS is unavailable
- Works offline

### ElevenLabs (Optional)

- Premium natural voice narration
- Requires API key

## Testing

### Unit Tests (Jest)

- **98 unit tests** in `src/__tests__/`
- Components, hooks, data validation, utilities
- Coverage reporting available

### E2E Tests (Playwright)

- **764 E2E tests** across 34 spec files
- Covers all major user flows
- Cross-browser testing (Chromium, Mobile Chrome)

```bash
npm test              # Unit tests
npm run test:e2e      # E2E tests
```

## Performance

- **Static Generation**: Bible pages pre-rendered at build time
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load on demand
- **CDN**: Vercel Edge Network for global distribution
- **Bundle Size**: Optimized with tree shaking and code splitting

## Future Considerations

- Backend (NestJS) with PostgreSQL for cloud sync
- Elasticsearch for advanced search
- pgvector for semantic search
- Redis for caching
- RabbitMQ for async processing
