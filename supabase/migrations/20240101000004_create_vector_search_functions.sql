-- ============================================================================
-- Sola Scriptura BR - Vector Search Functions (pgvector)
-- ============================================================================
-- PostgreSQL functions for semantic similarity search using pgvector.
-- The existing tables store embeddings as float8[] columns; these functions
-- cast them to the vector type at query time for compatibility.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: Cast float8[] to vector(1536)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION to_vector1536(arr float8[])
RETURNS vector(1536)
LANGUAGE sql IMMUTABLE PARALLEL SAFE
AS $$
  SELECT arr::vector(1536);
$$;

-- ---------------------------------------------------------------------------
-- Search verses by semantic similarity
-- Returns the most similar verses to a query embedding.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_versiculos(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  numero int,
  texto text,
  texto_formatado text,
  livro_id uuid,
  capitulo_id uuid,
  capitulo_numero int,
  traducao_id uuid,
  testamento_id uuid,
  similarity float
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    v.id,
    v.numero,
    v.texto,
    v.texto_formatado,
    v.livro_id,
    v.capitulo_id,
    v.capitulo_numero,
    v.traducao_id,
    v.testamento_id,
    1 - (v.embedding <=> query_embedding) AS similarity
  FROM (
    SELECT
      *,
      (SELECT vetor_embedding FROM versiculos WHERE id = versiculos.id)::vector(1536) AS embedding
    FROM versiculos
    WHERE vetor_embedding IS NOT NULL
  ) v
  WHERE 1 - (v.embedding <=> query_embedding) > match_threshold
  ORDER BY v.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ---------------------------------------------------------------------------
-- Search Greek words by semantic similarity
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_palavras_gregas(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  strong varchar(50),
  palavra_original text,
  lemma text,
  transliteracao text,
  definicao_curta text,
  definicao_completa text,
  classe_gramatical text,
  frequencia_at int,
  frequencia_nt int,
  similarity float
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    pg.id,
    pg.strong,
    pg.palavra_original,
    pg.lemma,
    pg.transliteracao,
    pg.definicao_curta,
    pg.definicao_completa,
    pg.classe_gramatical,
    pg.frequencia_at,
    pg.frequencia_nt,
    1 - ((pg.vetor_embedding)::vector(1536) <=> query_embedding) AS similarity
  FROM palavras_gregas pg
  WHERE pg.vetor_embedding IS NOT NULL
    AND 1 - ((pg.vetor_embedding)::vector(1536) <=> query_embedding) > match_threshold
  ORDER BY (pg.vetor_embedding)::vector(1536) <=> query_embedding
  LIMIT match_count;
$$;

-- ---------------------------------------------------------------------------
-- Search Hebrew words by semantic similarity
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_palavras_hebraicas(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  strong varchar(10),
  palavra_original text,
  lemma text,
  transliteracao text,
  definicao_curta text,
  definicao_completa text,
  classe_gramatical text,
  raiz text,
  frequencia_at int,
  similarity float
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    ph.id,
    ph.strong,
    ph.palavra_original,
    ph.lemma,
    ph.transliteracao,
    ph.definicao_curta,
    ph.definicao_completa,
    ph.classe_gramatical,
    ph.raiz,
    ph.frequencia_at,
    1 - ((ph.vetor_embedding)::vector(1536) <=> query_embedding) AS similarity
  FROM palavras_hebraicas ph
  WHERE ph.vetor_embedding IS NOT NULL
    AND 1 - ((ph.vetor_embedding)::vector(1536) <=> query_embedding) > match_threshold
  ORDER BY (ph.vetor_embedding)::vector(1536) <=> query_embedding
  LIMIT match_count;
$$;

-- ---------------------------------------------------------------------------
-- Search biblical characters by semantic similarity
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_personagens(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  nome_portugues varchar(100),
  nome_original varchar(100),
  nome_hebraico varchar(100),
  nome_grego varchar(100),
  slug varchar(50),
  biografia text,
  total_mencoes int,
  significado_teologico text,
  similarity float
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    p.id,
    p.nome_portugues,
    p.nome_original,
    p.nome_hebraico,
    p.nome_grego,
    p.slug,
    p.biografia,
    p.total_mencoes,
    p.significado_teologico,
    1 - ((p.vetor_embedding)::vector(1536) <=> query_embedding) AS similarity
  FROM personagens p
  WHERE p.vetor_embedding IS NOT NULL
    AND 1 - ((p.vetor_embedding)::vector(1536) <=> query_embedding) > match_threshold
  ORDER BY (p.vetor_embedding)::vector(1536) <=> query_embedding
  LIMIT match_count;
$$;

-- ---------------------------------------------------------------------------
-- Search biblical locations by semantic similarity
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_localizacoes(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  nome_portugues varchar(100),
  nome_original varchar(100),
  nome_ingles varchar(100),
  slug varchar(50),
  tipo varchar(50),
  latitude decimal(10,7),
  longitude decimal(10,7),
  regiao text,
  pais_atual text,
  descricao text,
  significado_biblico text,
  similarity float
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    l.id,
    l.nome_portugues,
    l.nome_original,
    l.nome_ingles,
    l.slug,
    l.tipo,
    l.latitude,
    l.longitude,
    l.regiao,
    l.pais_atual,
    l.descricao,
    l.significado_biblico,
    1 - ((l.vetor_embedding)::vector(1536) <=> query_embedding) AS similarity
  FROM localizacoes l
  WHERE l.vetor_embedding IS NOT NULL
    AND 1 - ((l.vetor_embedding)::vector(1536) <=> query_embedding) > match_threshold
  ORDER BY (l.vetor_embedding)::vector(1536) <=> query_embedding
  LIMIT match_count;
$$;

-- ---------------------------------------------------------------------------
-- Generic semantic search across a specified table
-- Supports: versiculos, palavras_gregas, palavras_hebraicas,
--           personagens, localizacoes
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION semantic_search(
  table_name text,
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  match_threshold float DEFAULT 0.5
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql STABLE PARALLEL SAFE
AS $$
DECLARE
  col_id text := 'id';
  col_text text;
  col_embedding text := 'vetor_embedding';
BEGIN
  -- Determine the text column based on table name
  CASE table_name
    WHEN 'versiculos' THEN
      col_text := 'texto';
    WHEN 'palavras_gregas' THEN
      col_text := 'definicao_curta';
    WHEN 'palavras_hebraicas' THEN
      col_text := 'definicao_curta';
    WHEN 'personagens' THEN
      col_text := 'biografia';
    WHEN 'localizacoes' THEN
      col_text := 'descricao';
    ELSE
      RAISE EXCEPTION 'Unsupported table: %', table_name;
  END CASE;

  RETURN QUERY EXECUTE format(
    'SELECT
      t.id,
      CASE
        WHEN %I IS NULL THEN ''''::text
        ELSE LEFT(%I, 200)
      END AS title,
      t.%I AS content,
      jsonb_build_object(''table'', %L) AS metadata,
      1 - ((t.%I)::vector(1536) <=> $1) AS similarity
    FROM %I t
    WHERE t.%I IS NOT NULL
      AND 1 - ((t.%I)::vector(1536) <=> $1) > $3
    ORDER BY (t.%I)::vector(1536) <=> $1
    LIMIT $2',
    CASE table_name
      WHEN 'versiculos' THEN 'texto'
      WHEN 'palavras_gregas' THEN 'palavra_original'
      WHEN 'palavras_hebraicas' THEN 'palavra_original'
      WHEN 'personagens' THEN 'nome_portugues'
      WHEN 'localizacoes' THEN 'nome_portugues'
    END,
    CASE table_name
      WHEN 'versiculos' THEN 'texto'
      WHEN 'palavras_gregas' THEN 'palavra_original'
      WHEN 'palavras_hebraicas' THEN 'palavra_original'
      WHEN 'personagens' THEN 'nome_portugues'
      WHEN 'localizacoes' THEN 'nome_portugues'
    END,
    col_text,
    table_name,
    col_embedding,
    table_name,
    col_embedding,
    col_embedding,
    col_embedding,
    query_embedding,
    match_count,
    match_threshold
  );
END;
$$;

-- ---------------------------------------------------------------------------
-- Full-text search on verse text (complementary to vector search)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION search_versiculos_texto(
  search_query text,
  match_count int DEFAULT 20
)
RETURNS TABLE (
  id uuid,
  numero int,
  texto text,
  livro_id uuid,
  capitulo_id uuid,
  capitulo_numero int,
  traducao_id uuid,
  rank real
)
LANGUAGE sql STABLE PARALLEL SAFE
AS $$
  SELECT
    v.id,
    v.numero,
    v.texto,
    v.livro_id,
    v.capitulo_id,
    v.capitulo_numero,
    v.traducao_id,
    ts_rank_cd(
      to_tsvector('portuguese', v.texto),
      plainto_tsquery('portuguese', search_query)
    ) AS rank
  FROM versiculos v
  WHERE to_tsvector('portuguese', v.texto) @@ plainto_tsquery('portuguese', search_query)
  ORDER BY rank DESC
  LIMIT match_count;
$$;
