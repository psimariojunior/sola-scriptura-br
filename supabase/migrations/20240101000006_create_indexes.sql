-- ============================================================================
-- Sola Scriptura BR - Performance Indexes
-- ============================================================================
-- Creates indexes for:
--   1. Foreign key lookups (B-tree)
--   2. Full-text search on verse text (GIN with tsvector)
--   3. Vector similarity search (ivfflat for pgvector)
--   4. Composite indexes for common query patterns
--   5. Unique constraints for data integrity
-- ============================================================================

-- ============================================================================
-- 1. FOREIGN KEY INDEXES (B-tree)
-- ============================================================================

-- livros
CREATE INDEX IF NOT EXISTS idx_livros_testamento_id ON livros(testamento_id);
CREATE INDEX IF NOT EXISTS idx_livros_slug ON livros(slug);
CREATE INDEX IF NOT EXISTS idx_livros_ordem_testamento ON livros(ordem_testamento);
CREATE INDEX IF NOT EXISTS idx_livros_ordem_geral ON livros(ordem_geral);

-- capitulos
CREATE INDEX IF NOT EXISTS idx_capitulos_livro_id ON capitulos(livro_id);

-- versiculos
CREATE INDEX IF NOT EXISTS idx_versiculos_livro_id ON versiculos(livro_id);
CREATE INDEX IF NOT EXISTS idx_versiculos_capitulo_id ON versiculos(capitulo_id);
CREATE INDEX IF NOT EXISTS idx_versiculos_traducao_id ON versiculos(traducao_id);
CREATE INDEX IF NOT EXISTS idx_versiculos_testamento_id ON versiculos(testamento_id);
CREATE INDEX IF NOT EXISTS idx_versiculos_livro_capitulo ON versiculos(livro_id, capitulo_numero);

-- palavras
CREATE INDEX IF NOT EXISTS idx_palavras_versiculo_id ON palavras(versiculo_id);
CREATE INDEX IF NOT EXISTS idx_palavras_strong_grego ON palavras(strong_grego) WHERE strong_grego IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_palavras_strong_hebraico ON palavras(strong_hebraico) WHERE strong_hebraico IS NOT NULL;

-- doutrinas
CREATE INDEX IF NOT EXISTS idx_doutrinas_categoria_id ON doutrinas(categoria_id);
CREATE INDEX IF NOT EXISTS idx_doutrinas_slug ON doutrinas(slug);

-- doutrinas_versiculos
CREATE INDEX IF NOT EXISTS idx_doutrinas_versiculos_doutrina_id ON doutrinas_versiculos(doutrina_id);
CREATE INDEX IF NOT EXISTS idx_doutrinas_versiculos_versiculo_id ON doutrinas_versiculos(versiculo_id);

-- referencias_cruzadas
CREATE INDEX IF NOT EXISTS idx_ref_cruzadas_origem ON referencias_cruzadas(versiculo_origem_id);
CREATE INDEX IF NOT EXISTS idx_ref_cruzadas_destino ON referencias_cruzadas(versiculo_destino_id);
CREATE INDEX IF NOT EXISTS idx_ref_cruzadas_tipo ON referencias_cruzadas(tipo_relacao);

-- usuarios & auth
CREATE INDEX IF NOT EXISTS idx_usuarios_plano ON usuarios(plano);
CREATE INDEX IF NOT EXISTS idx_usuarios_ativo ON usuarios(ativo);

-- notas
CREATE INDEX IF NOT EXISTS idx_notas_usuario_id ON notas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notas_versiculo_id ON notas(versiculo_id);
CREATE INDEX IF NOT EXISTS idx_notas_usuario_versiculo ON notas(usuario_id, versiculo_id);

-- favoritos
CREATE INDEX IF NOT EXISTS idx_favoritos_usuario_id ON favoritos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_versiculo_id ON favoritos(versiculo_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_usuario_versiculo ON favoritos(usuario_id, versiculo_id);

-- planos_leitura
CREATE INDEX IF NOT EXISTS idx_planos_leitura_categoria ON planos_leitura(categoria);
CREATE INDEX IF NOT EXISTS idx_planos_leitura_publico ON planos_leitura(publico);

-- progressos_leitura
CREATE INDEX IF NOT EXISTS idx_progressos_usuario_id ON progressos_leitura(usuario_id);
CREATE INDEX IF NOT EXISTS idx_progressos_plano_id ON progressos_leitura(plano_id);
CREATE INDEX IF NOT EXISTS idx_progressos_usuario_plano ON progressos_leitura(usuario_id, plano_id);

-- refresh_tokens
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_usuario_id ON refresh_tokens(usuario_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_ativo ON refresh_tokens(usuario_id, ativo) WHERE ativo = true;

-- comentarios
CREATE INDEX IF NOT EXISTS idx_comentarios_livro_id ON comentarios(livro_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_autor ON comentarios(autor);

-- contextos_historicos
CREATE INDEX IF NOT EXISTS idx_contextos_historicos_entidade ON contextos_historicos(entidade_tipo, entidade_id);

-- manuscritos
CREATE INDEX IF NOT EXISTS idx_manuscritos_tipo ON manuscritos(tipo);

-- escavacoes
CREATE INDEX IF NOT EXISTS idx_escavacoes_local ON escavacoes(local);

-- arte_fatos
CREATE INDEX IF NOT EXISTS idx_artefatos_tipo ON arte_fatos(tipo);

-- search_analytics
CREATE INDEX IF NOT EXISTS idx_search_analytics_usuario_id ON search_analytics(usuario_id);
CREATE INDEX IF NOT EXISTS idx_search_analytics_criado_em ON search_analytics(criado_em);
CREATE INDEX IF NOT EXISTS idx_search_analytics_table_name ON search_analytics(table_name);

-- search_queries
CREATE INDEX IF NOT EXISTS idx_search_queries_usuario_id ON search_queries(usuario_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_created_at ON search_queries(created_at);

-- ============================================================================
-- 2. FULL-TEXT SEARCH INDEXES (GIN)
-- ============================================================================

-- Full-text search on verse text
CREATE INDEX IF NOT EXISTS idx_versiculos_texto_fts ON versiculos
  USING GIN (to_tsvector('portuguese', texto));

-- Full-text search on Greek word definitions
CREATE INDEX IF NOT EXISTS idx_palavras_gregas_definicao_fts ON palavras_gregas
  USING GIN (to_tsvector('portuguese', coalesce(definicao_curta, '') || ' ' || coalesce(definicao_completa, '')));

-- Full-text search on Hebrew word definitions
CREATE INDEX IF NOT EXISTS idx_palavras_hebraicas_definicao_fts ON palavras_hebraicas
  USING GIN (to_tsvector('portuguese', coalesce(definicao_curta, '') || ' ' || coalesce(definicao_completa, '')));

-- Full-text search on character biographies
CREATE INDEX IF NOT EXISTS idx_personagens_biografia_fts ON personagens
  USING GIN (to_tsvector('portuguese', coalesce(biografia, '')));

-- Full-text search on location descriptions
CREATE INDEX IF NOT EXISTS idx_localizacoes_descricao_fts ON localizacoes
  USING GIN (to_tsvector('portuguese', coalesce(descricao, '')));

-- Full-text search on dictionary entries
CREATE INDEX IF NOT EXISTS idx_verbetes_fts ON verbetes
  USING GIN (to_tsvector('portuguese', coalesce(titulo, '') || ' ' || coalesce(definicao, '')));

-- Full-text search on doctrine definitions
CREATE INDEX IF NOT EXISTS idx_doutrinas_fts ON doutrinas
  USING GIN (to_tsvector('portuguese', coalesce(nome, '') || ' ' || coalesce(definicao, '') || ' ' || coalesce(explicacao, '')));

-- ============================================================================
-- 3. VECTOR SIMILARITY INDEXES (ivfflat)
-- ============================================================================
-- NOTE: ivfflat indexes require data to exist in the table. Run these after
-- seeding data. The lists parameter should be sqrt(number_of_rows).
-- For <1M rows, lists=100 is a good default.

-- Create HNSW indexes (preferred for newer pgvector, better than ivfflat)
-- These will be created once data is seeded via a separate migration or script.

-- Versiculos embeddings
-- CREATE INDEX IF NOT EXISTS idx_versiculos_embedding_hnsw ON versiculos
--   USING hnsw ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- Greek words embeddings
-- CREATE INDEX IF NOT EXISTS idx_palavras_gregas_embedding_hnsw ON palavras_gregas
--   USING hnsw ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- Hebrew words embeddings
-- CREATE INDEX IF NOT EXISTS idx_palavras_hebraicas_embedding_hnsw ON palavras_hebraicas
--   USING hnsw ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- Characters embeddings
-- CREATE INDEX IF NOT EXISTS idx_personagens_embedding_hnsw ON personagens
--   USING hnsw ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- Locations embeddings
-- CREATE INDEX IF NOT EXISTS idx_localizacoes_embedding_hnsw ON localizacoes
--   USING hnsw ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- IVFFlat fallback (for pgvector < 0.5.0)
-- CREATE INDEX IF NOT EXISTS idx_versiculos_embedding_ivfflat ON versiculos
--   USING ivfflat ((vetor_embedding::vector(1536)) vector_cosine_ops)
--   WITH (lists = 100);

-- ============================================================================
-- 4. COMPOSITE INDEXES FOR COMMON QUERY PATTERNS
-- ============================================================================

-- Fetch verses by book + chapter + number (most common query)
CREATE UNIQUE INDEX IF NOT EXISTS idx_versiculos_livro_cap_num ON versiculos(livro_id, capitulo_numero, numero, traducao_id);

-- Fetch chapters by book (ordered)
CREATE INDEX IF NOT EXISTS idx_capitulos_livro_numero ON capitulos(livro_id, numero);

-- Search Greek words by Strong's number (exact lookup)
CREATE UNIQUE INDEX IF NOT EXISTS idx_palavras_gregas_strong ON palavras_gregas(strong);

-- Search Hebrew words by Strong's number (exact lookup)
CREATE UNIQUE INDEX IF NOT EXISTS idx_palavras_hebraicas_strong ON palavras_hebraicas(strong);

-- Favorites ordered by user
CREATE INDEX IF NOT EXISTS idx_favoritos_usuario_ordem ON favoritos(usuario_id, ordem);

-- Notes by user, most recent first
CREATE INDEX IF NOT EXISTS idx_notas_usuario_criado ON notas(usuario_id, criado_em DESC);

-- Doctrines by category
CREATE INDEX IF NOT EXISTS idx_doutrinas_categoria_slug ON doutrinas(categoria_id, slug);

-- Doctrine-verse relevance lookup
CREATE INDEX IF NOT EXISTS idx_doutrinas_versiculos_peso ON doutrinas_versiculos(doutrina_id, peso DESC);

-- Characters by mention count (for "most mentioned" queries)
CREATE INDEX IF NOT EXISTS idx_personagens_total_mencoes ON personagens(total_mencoes DESC NULLS LAST);

-- Locations by type and region
CREATE INDEX IF NOT EXISTS idx_localizacoes_tipo_regiao ON localizacoes(tipo, regiao);

-- Historical events by year range
CREATE INDEX IF NOT EXISTS idx_eventos_historicos_ano ON eventos_historicos(ano_inicio, ano_fim);

-- User preferences lookup
CREATE UNIQUE INDEX IF NOT EXISTS idx_preferencias_usuario_id ON preferencias_usuario(usuario_id);

-- Profile lookup
CREATE UNIQUE INDEX IF NOT EXISTS idx_perfis_usuario_id ON perfis_usuario(usuario_id);
