# Modelagem do Banco de Dados - Sola Scriptura BR

## PostgreSQL + pgvector

### Estratégia de Dados

```
Banco Relacional (PostgreSQL)
├── Dados Mestres
│   ├── testamentos
│   ├── livros
│   ├── capitulos
│   └── versiculos
├── Dados Linguísticos
│   ├── palavras_gregas (com vetor_embedding)
│   ├── palavras_hebraicas (com vetor_embedding)
│   └── gramatica_grega
├── Dados Teológicos
│   ├── categorias_doutrina
│   ├── doutrinas
│   └── doutrinas_versiculos
├── Dados Históricos
│   ├── contextos_historicos
│   ├── eventos_historicos
│   └── personagens
├── Dados Geográficos
│   ├── localizacoes (com coordenadas)
│   └── rotas
├── Dados Arqueológicos
│   ├── arte_fatos
│   ├── escavacoes
│   └── manuscritos
├── Dados de Usuário
│   ├── usuarios
│   ├── perfis_usuario
│   └── preferencias_usuario
├── Dados de Estudo
│   ├── notas
│   ├── favoritos
│   ├── planos_leitura
│   └── progressos_leitura
└── Dados de IA
    ├── analises_exegeticas
    ├── analises_hermeneuticas
    └── referencias_cruzadas

Banco Vetorial (pgvector)
├── palavras_gregas.vetor_embedding
├── palavras_hebraicas.vetor_embedding
├── localizacoes.vetor_embedding
├── personagens.vetor_embedding
└── versiculos (via Elasticsearch)
```

### Índices Principais

```sql
-- Índices para busca textual
CREATE INDEX idx_versiculos_texto_gin ON versiculos USING gin(to_tsvector('portuguese', texto));
CREATE INDEX idx_versiculos_livro_capitulo ON versiculos(livro_id, capitulo_numero, numero);

-- Índices vetoriais (pgvector)
CREATE INDEX idx_palavras_gregas_vetor ON palavras_gregas USING ivfflat (vetor_embedding vector_cosine_ops);
CREATE INDEX idx_palavras_hebraicas_vetor ON palavras_hebraicas USING ivfflat (vetor_embedding vector_cosine_ops);

-- Índices geoespaciais
CREATE INDEX idx_localizacoes_coord ON localizacoes USING gist (ll_to_earth(latitude, longitude));

-- Índices de busca
CREATE INDEX idx_doutrinas_nome ON doutrinas USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(definicao, '')));
CREATE INDEX idx_personagens_nome ON personagens USING gin(to_tsvector('portuguese', nome_portugues));
```

### Embeddings

Todas as entidades textuais possuem colunas `vetor_embedding` (float8[] com 1536 dimensões)
para busca semântica usando o modelo text-embedding-3-large da OpenAI.
