-- ============================================================================
-- Sola Scriptura BR - Enable PostgreSQL Extensions
-- ============================================================================
-- Enables all required extensions for the biblical study platform:
--   - vector: pgvector for semantic similarity search with AI embeddings
--   - uuid-ossp: UUID generation for primary keys
--   - pgcrypto: Cryptographic functions for password hashing and encryption
-- ============================================================================

-- Vector similarity search (pgvector)
CREATE EXTENSION IF NOT EXISTS vector
  SCHEMA extensions
  VERSION '0.8.0';

-- UUID generation (v4 random)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  SCHEMA extensions;

-- Cryptographic functions
CREATE EXTENSION IF NOT EXISTS pgcrypto
  SCHEMA extensions;

-- Set search path so extensions are accessible
ALTER DATABASE postgres SET search_path TO public, extensions;
