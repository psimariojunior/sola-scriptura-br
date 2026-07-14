# Roadmap - Sola Scriptura BR

## Current Status

The project is fully functional as a web-based biblical study platform with:

- ✅ 9 Bible translations (31,102 verses)
- ✅ Greek and Hebrew lexicons (2,600+ terms)
- ✅ Verse-by-verse commentaries (546+)
- ✅ Theological studies (405)
- ✅ Biblical dictionary (1,150+ entries)
- ✅ AI assistant (Groq/OpenRouter)
- ✅ Edge TTS audio (Cloudflare Workers)
- ✅ Comprehensive testing (98 unit + 764 E2E)
- ✅ 49 routes with full functionality
- ✅ 85+ React components

---

## Phase 5: Real-time Collaboration

**Goal**: Enable multiple users to study together in real-time.

### Features

- **Real-time Notes**: Share notes with study partners
- **Collaborative Studies**: Create and edit studies together
- **Chat Integration**: In-study messaging
- **Presence Indicators**: See who's online
- **Shared Annotations**: Collaborative verse highlighting

### Technical Implementation

- **WebSockets**: Socket.io or native WebSocket
- **State Synchronization**: CRDTs (Yjs) for conflict resolution
- **Backend Required**: NestJS with WebSocket gateway
- **Database**: PostgreSQL for persistent state
- **Redis**: PubSub for real-time events

### Prerequisites

- Backend deployment (NestJS + PostgreSQL)
- Authentication system (Supabase)
- WebSocket infrastructure

### Timeline

- Design: 2 weeks
- Backend: 4 weeks
- Frontend: 3 weeks
- Testing: 2 weeks
- **Total**: ~11 weeks

---

## Phase 6: Mobile App (React Native)

**Goal**: Native mobile experience for iOS and Android.

### Features

- **Offline Access**: Download Bible translations for offline use
- **Push Notifications**: Daily verse, reading reminders
- **Biometric Auth**: Face ID / fingerprint login
- **Background Audio**: Continue listening while app is backgrounded
- **Share Extensions**: Share verses directly to social media
- **Widgets**: Home screen widgets for daily verse

### Technical Implementation

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State**: Zustand (shared logic with web)
- **Storage**: SQLite for offline data
- **Audio**: expo-av for background playback
- **Notifications**: expo-notifications

### Prerequisites

- Shared data layer (TypeScript types)
- API design for mobile consumption
- App Store / Play Store developer accounts

### Timeline

- Setup & Architecture: 2 weeks
- Core Features: 6 weeks
- Offline Support: 3 weeks
- Testing: 3 weeks
- App Store Submission: 2 weeks
- **Total**: ~16 weeks

---

## Phase 7: Offline Support (PWA)

**Goal**: Full offline functionality as a Progressive Web App.

### Features

- **Service Worker**: Cache all static assets
- **IndexedDB**: Store Bible text, lexicon, commentaries
- **Offline AI**: Basic responses without API
- **Sync on Reconnect**: Upload notes when online
- **Install Prompt**: Add to home screen
- **Background Sync**: Queue actions for later

### Technical Implementation

- **Service Worker**: Workbox (Google)
- **Storage**: IndexedDB via Dexie.js
- **Caching Strategy**: Cache-first for static, network-first for API
- **Background Sync**: BackgroundSync API
- **Manifest**: Web App Manifest with icons

### Prerequisites

- Service worker already partially implemented
- Data normalization for efficient caching
- Storage quota management

### Timeline

- Service Worker: 2 weeks
- IndexedDB Storage: 3 weeks
- Sync Logic: 2 weeks
- Testing: 2 weeks
- **Total**: ~9 weeks

---

## Phase 8: Multi-language (EN/ES)

**Goal**: Full English and Spanish support.

### Features

- **UI Translation**: All interface elements
- **Bible Text**: Already has KJV and WEB
- **Localized Content**: Commentaries, studies in EN/ES
- **Date/Time**: Locale-aware formatting
- **RTL Support**: Future-proof for Hebrew/Greek display
- **i18n Infrastructure**: Already using i18next

### Technical Implementation

- **i18next**: Already configured
- **Translation Files**: JSON in `src/locales/`
- **Content Translation**: AI-assisted translation
- **Locale Detection**: Browser language detection
- **URL Strategy**: `/en/biblia`, `/es/biblia`

### Prerequisites

- Complete PT translations first
- Translation review process
- Native speaker review

### Timeline

- UI Translation: 3 weeks
- Content Translation: 6 weeks
- Testing: 3 weeks
- **Total**: ~12 weeks

---

## Phase 9: API for Third-party Apps

**Goal**: Public API for other apps to consume biblical data.

### Features

- **REST API**: Full CRUD for all resources
- **GraphQL API**: Flexible queries
- **Rate Limiting**: Fair usage policies
- **Documentation**: OpenAPI/Swagger docs
- **SDKs**: JavaScript/TypeScript SDK
- **Webhooks**: Event notifications

### API Endpoints

```
GET  /api/v1/bible/books
GET  /api/v1/bible/verses/:book/:chapter
GET  /api/v1/lexicon/greek/:strong
GET  /api/v1/lexicon/hebrew/:strong
GET  /api/v1/commentaries/:book/:chapter/:verse
GET  /api/v1/studies/:book/:chapter/:verse
GET  /api/v1/dictionary/:term
GET  /api/v1/search?q=query
POST /api/v1/ai/ask
```

### Technical Implementation

- **Framework**: NestJS (existing backend)
- **Documentation**: Swagger/OpenAPI
- **Authentication**: API keys
- **Rate Limiting**: Redis-based
- **Caching**: CDN + Redis
- **Versioning**: URI versioning (v1, v2)

### Prerequisites

- Backend deployment
- Database with all content
- Documentation generation
- Developer portal

### Timeline

- API Design: 2 weeks
- Implementation: 4 weeks
- Documentation: 2 weeks
- Developer Portal: 2 weeks
- Testing: 2 weeks
- **Total**: ~12 weeks

---

## Future Phases (Backlog)

### Phase 10: Advanced AI Features

- **RAG (Retrieval-Augmented Generation)**: Vector search for context-aware answers
- **Knowledge Graph**: Graph database for relationships
- **Study Recommendations**: AI-suggested studies
- **Sermon Generator**: AI-assisted sermon preparation
- **Translation Comparison AI**: AI-powered translation analysis

### Phase 11: Community Features

- **User Profiles**: Public study profiles
- **Study Groups**: Create and join groups
- **Discussion Forums**: Verse-by-verse discussions
- **Content Sharing**: Share studies, notes, highlights
- **Leaderboards**: Study engagement rankings

### Phase 12: Advanced Study Tools

- **Original Language Tools**: Inline Greek/Hebrew parsing
- **Word Studies**: Deep dives into key terms
- **Biblical Maps**: Interactive historical maps
- **Timeline Builder**: Create custom timelines
- **Cross-reference Explorer**: Visual reference networks

---

## Priority Matrix

| Phase | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Phase 5: Real-time Collaboration | High | High | Medium |
| Phase 6: Mobile App | High | High | High |
| Phase 7: Offline PWA | High | Medium | High |
| Phase 8: Multi-language | Medium | Medium | Medium |
| Phase 9: Public API | Medium | High | Low |

---

## Technical Debt

### Current Issues

1. **Backend Not Deployed**: NestJS backend exists but not active
2. **No Cloud Sync**: User data only in localStorage
3. **No Offline Support**: Requires internet connection
4. **No Mobile App**: Web only
5. **Single Language**: Portuguese only (partial English in Bible text)

### Recommended First Steps

1. Deploy backend (Railway or Vercel)
2. Implement user authentication (Supabase)
3. Add cloud sync for user data
4. Convert to PWA for offline support
5. Then proceed to mobile app

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Bible Translations | 9 | 15+ |
| Lexicon Terms | 2,600+ | 5,000+ |
| Commentaries | 546+ | 1,000+ |
| User Base | - | 10,000 MAU |
| Mobile Users | 0% | 40% |
| Offline Usage | 0% | 30% |
| API Consumers | 0 | 100+ apps |
