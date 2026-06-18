# Arquitetura - Sola Scriptura BR

## Visão Geral

A plataforma Sola Scriptura BR é um sistema de estudo bíblico acadêmico empresarial,
construído sobre uma arquitetura de microsserviços com princípios de Clean Architecture, DDD e CQRS.

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend Web | Next.js 14, TypeScript, TailwindCSS, ShadCN |
| Mobile | Flutter |
| Backend | NestJS, TypeScript |
| Banco Relacional | PostgreSQL 16 |
| Banco Vetorial | pgvector |
| Busca | Elasticsearch 8 |
| Cache | Redis 7 |
| Mensageria | RabbitMQ |
| Storage | AWS S3 |
| API | REST + GraphQL (Apollo) |
| Containerização | Docker |
| Orquestração | Kubernetes |
| Monitoramento | Prometheus + Grafana |
| Rastreamento | OpenTelemetry |

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Web (Next.js)                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ Leitura  │ │ Pesquisa │ │  Estudo  │ │  Admin       │  │
│  │ Bíblica  │ │ Avançada │ │  IA      │ │  Dashboard   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS / WSS
┌──────────────────────▼──────────────────────────────────────┐
│              API Gateway (Kong / Nginx)                      │
│         TLS 1.3 · Rate Limiting · Autenticação              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Backend (NestJS)                          │
│                                                              │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐     │
│  │ REST API    │ │ GraphQL (Apollo) │ WebSocket/WSS   │     │
│  └─────────────┘ └──────────────┘ └──────────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 Módulos (DDD)                         │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐   │   │
│  │  │Bíblia│ │Grego │ │Hebra.│ │Teolo│ │Exegese │   │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └────────┘   │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐   │   │
│  │  │Hist. │ │Geog. │ │Arque.│ │IA/RAG│ │Pesquisa│   │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────┬──────────┬──────────┬──────────┬────────────────┘
           │          │          │          │
┌──────────▼─┐ ┌─────▼────┐ ┌──▼──────┐ ┌─▼──────────┐
│ PostgreSQL │ │Elastic   │ │  Redis  │ │  RabbitMQ  │
│ + pgvector │ │search    │ │         │ │            │
└────────────┘ └──────────┘ └─────────┘ └────────────┘
```

## Estrutura de Microsserviços (Módulos)

Cada módulo segue Clean Architecture com 4 camadas:

```
módulo/
├── domain/         # Entidades, Value Objects, Aggregates
├── application/    # Casos de uso, serviços, DTOs
├── infra/          # Repositórios, adaptadores externos
└── presentation/   # Controllers, Resolvers GraphQL
```

## Fluxo de Dados - Sistema RAG

```
Pergunta do Usuário
       │
       ▼
  Elasticsearch ───► Busca Textual + Vetorial
       │
       ▼
  PostgreSQL (pgvector) ───► Busca Semântica (embeddings)
       │
       ▼
  Knowledge Graph (Neo4j/em memória) ───► Entidades Relacionadas
       │
       ▼
  Montagem de Contexto (RAGService)
       │
       ▼
  LLM (OpenAI GPT-4) ───► Resposta + Fontes
```

## Segurança

- JWT (access + refresh tokens)
- OAuth2 (Google)
- MFA (TOTP via Speakeasy)
- TLS 1.3
- AES-256 (dados sensíveis)
- Helmet + Rate Limiting
- OWASP Top 10 compliance

## Modo Offline

- Service Workers para cache de conteúdo
- IndexedDB para notas e favoritos
- Sincronização via RabbitMQ quando online
- Conflitos resolvidos com Last-Write-Wins
