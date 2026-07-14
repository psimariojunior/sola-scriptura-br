# Sola Scriptura BR

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?style=flat-square)

> Plataforma de estudo bíblico acadêmico completa em português — Integrando IA, exegese, hermenêutica, teologia sistemática e idiomas bíblicos.

---

<!-- TODO: Adicionar screenshots do site aqui -->
<!-- ![Screenshot](./docs/screenshot.png) -->

---

## Funcionalidades

### Estudo Bíblico

- **9 Traduções** — ARC, ARA, ACF, KJV, NVI, WEB, e mais comparações lado a lado
- **Estudo Versículo a Versículo** — Análise completa de cada versículo
- **Referências Cruzadas** — Grafo de conexões entre passagens bíblicas
- **Harmonia Sinótica** — Sincronização dos Evangelhos

### Idiomas Bíblicos

- **Grego (1100+ termos)** — Léxico Strong's com morfologia completa
- **Hebraico (1500+ termos)** — Análise morfológica e raízes
- **Aramaico** — Termos aramaicos do Antigo Testamento

### Teologia

- **405 Estudos Teológicos** — Doutrinas organizadas por categoria
- **1150+ Entradas de Dicionário** — Definições de termos teológicos
- **13 Categorias** — Soteriologia, Cristologia, Escatologia, etc.

### Assistente IA

- **Groq (Llama 3.3 70B)** — Modelo de linguagem para respostas rápidas
- **Fallback Local** — LLM local quando Groq indisponível
- **RAG com pgvector** — Busca semântica em documentos teológicos

### Áudio

- **Edge TTS Neural** — Vozes de alta qualidade em português
- **397 Arquivos Pré-gerados** — Versículos e passagens em áudio
- **Web Speech API** — Fallback para leitura em tempo real

### Modo de Apresentação

- **Projeção para Igrejas** — Modo apresentação otimizado para telas grandes
- **Controle Remoto** — Navegação via QR code
- **Múltiplos Temas** — Light, Dark, Sepia e Nocturno

### Quiz Bíblico

- **100+ Perguntas** — Banco de questões variadas
- **5 Categorias** — Gênero, Livro, Tema, Personagem, Evento
- **Ranking** — Acompanhamento de progresso

### Ferramentas de Estudo

- **Concordância** — Busca por palavras-chave em toda a Bíblia
- **Crítica Textual** — Variantes manuscritas e análise
- **Introduções por Livro** — Contexto histórico e literário
- **Cronologia** — Linha do tempo interativa
- **Mapas Interativos** — Leaflet com localizações bíblicas

---

## Stack Tecnológica

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | [Next.js 14](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), [ShadCN](https://ui.shadcn.com/) |
| **State** | [Zustand](https://zustand-demo.pmnd.rs/), [React Context](https://react.dev/reference/react/createContext) |
| **Animações** | [Framer Motion](https://www.framer.com/motion/) |
| **Gráficos** | [Recharts](https://recharts.org/) |
| **Mapas** | [Leaflet](https://leafletjs.com/) |
| **i18n** | [i18next](https://www.i18next.com/) |
| **Áudio** | [Edge TTS](https://github.com/rany2/edge-tts), Web Speech API |
| **Testes** | [Jest](https://jestjs.io/), [Playwright](https://playwright.dev/) |
| **Deploy** | [Vercel](https://vercel.com/) |

---

## Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/sola-scriptura/plataforma.git
cd plataforma

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

### Comandos Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar servidor de produção
npm run lint         # Verificar linting
npm run typecheck    # Verificar tipos TypeScript
```

---

## Estrutura do Projeto

```
src/
├── app/                    # App Router (páginas)
│   ├── biblia/             # Leitura bíblica
│   ├── pesquisa/           # Pesquisa avançada
│   ├── idiomas/            # Grego e Hebraico
│   ├── exegese/            # Exegese com IA
│   ├── teologia/           # Teologia sistemática
│   ├── ia/                 # Assistente IA
│   ├── ferramentas/        # Concordância, Crítica Textual
│   └── api/                # Rotas de API
├── components/             # Componentes React
├── data/                   # Dados bíblicos (traduções, léxico)
├── hooks/                  # Custom hooks
├── lib/                    # Utilitários
└── locales/                # Traduções (PT/EN)
```

---

## Testes

### Testes Unitários

```bash
npm test                   # Executar todos os testes
npm run test:watch         # Modo watch
npm run test:coverage      # Com cobertura de código
```

### Testes E2E

```bash
npm run test:e2e           # Executar testes E2E
npm run test:e2e:ui        # Interface gráfica Playwright
npm run test:e2e:report    # Relatório HTML
```

---

## Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sola-scriptura/plataforma)

1. Clique no botão acima
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Deploy automático a cada push

### Build de Produção

```bash
npm run build
npm run start
```

---

## Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Diretrizes

- Siga o padrão de código existente
- Escreva testes para novas funcionalidades
- Documente mudanças significativas
- Mantenha o commit messages claro

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Agradecimentos

- [Next.js](https://nextjs.org/) — Framework React
- [TailwindCSS](https://tailwindcss.com/) — Utilitários CSS
- [ShadCN](https://ui.shadcn.com/) — Componentes UI
- [Leaflet](https://leafletjs.com/) — Mapas interativos
- [Edge TTS](https://github.com/rany2/edge-tts) — Síntese de voz
- [OpenAI](https://openai.com/) — Modelos de linguagem
- [Vercel](https://vercel.com/) — Hospedagem

---

*Sola Scriptura — Soli Deo Gloria*
