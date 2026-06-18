# 📖 Bible Scholar AI Enterprise

A mais avançada plataforma de estudo bíblico acadêmico em língua portuguesa, unificando Inteligência Artificial, Exegese, Hermenêutica, Teologia Sistemática e Análise Linguística.

## 🎯 Missão

Transformar cada palavra da Bíblia em uma porta de entrada para linguística, exegese, teologia, história, geografia, arqueologia e IA. O usuário não lê apenas a Bíblia — ele navega por um ecossistema completo de conhecimento bíblico acadêmico conectado por inteligência artificial.

## ✨ Funcionalidades

### 📖 Bíblia Digital
- Múltiplas versões (ARA, NVI, ARC)
- Texto original em grego, hebraico e aramaico
- Busca textual avançada
- Navegação por livro, capítulo e versículo

### 🔬 Central de Estudos
- **Exegese**: Contexto imediato, literário, histórico e cultural
- **Teologia Sistemática**: 11 categorias doutrinárias
- **Hermenêutica**: Identificação de gêneros literários e princípios de interpretação
- **Linguística**: Análise morfológica e semântica (Strong, lemma, parsing)
- **Referências Cruzadas**: Paralelos, profecias e cumprimentos

### 🤖 IA Teológica (RAG)
- Retrieval Augmented Generation
- Busca vetorial + semântica + contextual
- Knowledge Graph integration
- Respostas com citação de fontes
- Suporte a 5 tradições teológicas

### 🗺️ Mapas Interativos
- Locais bíblicos com coordenadas
- Rotas históricas (Paulo, Êxodo, Abraão)
- Atlas completo

### 📅 Cronologia
- Patriarcas, Juízes, Reis, Profetas
- Vida de Jesus, Igreja Primitiva
- Período Intertestamentário

### 🏛️ Arqueologia
- Descobertas arqueológicas
- Inscrições e manuscritos
- Artefatos bíblicos

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, ShadCN UI |
| Backend | NestJS, TypeScript, DDD |
| Banco Principal | PostgreSQL + pgvector |
| Busca | Elasticsearch |
| Cache | Redis |
| Mensageria | RabbitMQ |
| Grafo de Conhecimento | Neo4j |
| IA | OpenAI GPT-4o, LangChain |
| Storage | MinIO / S3 |
| Container | Docker, Kubernetes |
| Monitoramento | Prometheus, Grafana |
| Documentação | OpenAPI / Swagger |

## 🚀 Começando

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- NPM

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bible-scholar-ai.git
cd bible-scholar-ai

# Instale as dependências
npm install

# Inicie os serviços (PostgreSQL, Redis, Elasticsearch, Neo4j)
npm run docker:up

# Execute as migrações
npm run migration:run

# Popule o banco de dados
npm run seed

# Inicie o desenvolvimento
npm run dev
```

### Configuração da IA

1. Copie `.env.example` para `.env`
2. Adicione sua chave da OpenAI em `OPENAI_API_KEY`
3. Reinicie o servidor

## 📚 Documentação da API

Com o servidor rodando, acesse:
- Swagger UI: http://localhost:4000/api/docs

## 🌐 Idioma

O sistema é desenvolvido em **Português Brasileiro (pt-BR)** com suporte a internacionalização (i18n) para idiomas futuros.

### Padrões Regionais
- Data: DD/MM/AAAA
- Número: 1.000,00
- Fuso Horário: America/Sao_Paulo
- Moeda: BRL (R$)

## 📁 Estrutura do Projeto

```
bible-scholar/
├── packages/
│   ├── frontend/          # Next.js (Web)
│   ├── backend/           # NestJS (API)
│   │   └── src/
│   │       ├── modules/   # Módulos DDD
│   │       │   ├── bible/
│   │       │   ├── exegesis/
│   │       │   ├── theology/
│   │       │   ├── hermeneutics/
│   │       │   ├── linguistics/
│   │       │   ├── geography/
│   │       │   ├── archaeology/
│   │       │   ├── knowledge-graph/
│   │       │   ├── rag/
│   │       │   ├── ai/
│   │       │   ├── chat/
│   │       │   ├── reference/
│   │       │   ├── lexicon/
│   │       │   ├── history/
│   │       │   ├── chronology/
│   │       │   ├── atlas/
│   │       │   ├── map/
│   │       │   └── user/
│   │       ├── common/    # Código compartilhado
│   │       └── infrastructure/ # Banco, cache, filas
│   └── shared/            # Tipos e constantes
├── k8s/                   # Manifestos Kubernetes
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes com cobertura
npm run test:cov

# Lint
npm run lint

# TypeScript check
npm run typecheck
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

## 🙏 Suporte

Para suporte, reporte issues em https://github.com/seu-usuario/bible-scholar-ai/issues
