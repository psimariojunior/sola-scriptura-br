# API - Sola Scriptura BR

## REST API

Base URL: `/api/v1`

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/login | Login |
| POST | /auth/cadastrar | Cadastro |
| POST | /auth/refresh | Renovar token |
| POST | /auth/logout | Logout |

### Bíblia

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /biblia/testamentos | Listar testamentos |
| GET | /biblia/livros | Listar livros |
| GET | /biblia/livros/{slug} | Buscar livro |
| GET | /biblia/livros/{id}/capitulos/{numero} | Buscar capítulo |
| GET | /biblia/versiculos/{livroId}/{capitulo}/{versiculo} | Buscar versículo |
| GET | /biblia/passagem/{livroId}/{capitulo}/{inicio}/{fim} | Buscar passagem |
| GET | /biblia/traducoes | Listar traduções |
| GET | /biblia/pesquisar?q= | Pesquisar texto |
| GET | /biblia/palavras/{id} | Detalhes da palavra |

### Grego e Hebraico

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /grego/strong/{strong} | Buscar por Strong |
| GET | /grego/lemma/{lemma} | Buscar por lemma |
| GET | /grego/buscar?q= | Pesquisar |
| GET | /hebraico/strong/{strong} | Buscar por Strong |
| GET | /hebraico/buscar?q= | Pesquisar |

### Teologia

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /teologia/categorias | Categorias doutrinárias |
| GET | /teologia/doutrinas/{slug} | Doutrina específica |
| GET | /teologia/versiculo/{id} | Teologia do versículo |

### IA

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /ia/perguntar | Pergunta ao assistente |
| POST | /ia/exegese | Análise exegética |
| POST | /ia/grego | Análise de grego |
| POST | /ia/comparar | Comparar passagens |
| GET | /ia/grafo/{id} | Buscar no grafo |

### Outros Recursos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /historia/livro/{id} | Contexto histórico |
| GET | /geografia/localizacoes | Localizações bíblicas |
| GET | /geografia/rotas | Rotas bíblicas |
| GET | /arqueologia/artefatos | Artefatos |
| GET | /cronologia/linha-do-tempo | Linha do tempo |
| GET | /personagens | Personagens |
| GET | /comentarios/{livroId}/{capitulo} | Comentários |
| GET | /referencias/versiculo/{id} | Referências cruzadas |
| GET | /dicionario/buscar?q= | Dicionário bíblico |

## GraphQL

Endpoint: `/graphql`

```graphql
query BuscarVersiculo {
  versiculo(livroId: "id", capitulo: 1, versiculo: 1) {
    texto
    numero
    palavras {
      texto
      strongGrego
      transliteracao
    }
    referenciasOrigem {
      tipoRelacao
      versiculoDestino {
        texto
        capitulo { numero }
        livro { nome }
      }
    }
  }
}
```

## WebSocket

Para atualizações em tempo real de estudo e IA.
