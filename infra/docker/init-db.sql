-- Sola Scriptura BR - Inicialização do Banco de Dados
CREATE SCHEMA IF NOT EXISTS sola_scriptura;

-- Extensão para pgvector (embeddings)
CREATE EXTENSION IF NOT EXISTS vector;

-- Extensão para consultas geoespaciais
CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;
CREATE EXTENSION IF NOT EXISTS cube;

-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensão para busca full-text
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Função para trigger de updated_at
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
