-- ============================================================================
-- Sola Scriptura BR - Database Triggers
-- ============================================================================
-- Trigger functions for:
--   1. Auto-create user profile and settings on signup
--   2. Auto-update timestamps on row updates
--   3. Log search queries for analytics
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Auto-create user profile and settings on new user signup
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into usuarios table
  INSERT INTO public.usuarios (id, nome, email, email_verificado, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert default profile
  INSERT INTO public.user_profiles (usuario_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture')
  )
  ON CONFLICT (usuario_id) DO NOTHING;

  -- Insert default settings
  INSERT INTO public.user_settings (usuario_id)
  VALUES (NEW.id)
  ON CONFLICT (usuario_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Trigger on auth.users for new signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. Auto-update timestamps on row updates
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$;

-- Apply timestamp trigger to all tables with atualizado_em column
CREATE TRIGGER set_timestamp_usuarios
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_user_profiles
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_user_settings
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_livros
  BEFORE UPDATE ON livros
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_capitulos
  BEFORE UPDATE ON capitulos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_versiculos
  BEFORE UPDATE ON versiculos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_palavras
  BEFORE UPDATE ON palavras
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_palavras_gregas
  BEFORE UPDATE ON palavras_gregas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_palavras_hebraicas
  BEFORE UPDATE ON palavras_hebraicas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_doutrinas
  BEFORE UPDATE ON doutrinas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_categorias_doutrina
  BEFORE UPDATE ON categorias_doutrina
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_personagens
  BEFORE UPDATE ON personagens
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_localizacoes
  BEFORE UPDATE ON localizacoes
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_contextos_historicos
  BEFORE UPDATE ON contextos_historicos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_eventos_historicos
  BEFORE UPDATE ON eventos_historicos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_comentarios
  BEFORE UPDATE ON comentarios
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_rotas
  BEFORE UPDATE ON rotas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_artefatos
  BEFORE UPDATE ON arte_fatos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_escavacoes
  BEFORE UPDATE ON escavacoes
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_manuscritos
  BEFORE UPDATE ON manuscritos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_verbetes
  BEFORE UPDATE ON verbetes
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_favoritos
  BEFORE UPDATE ON favoritos
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_notas
  BEFORE UPDATE ON notas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_planos_leitura
  BEFORE UPDATE ON planos_leitura
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_progressos_leitura
  BEFORE UPDATE ON progressos_leitura
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_analises_exegeticas
  BEFORE UPDATE ON analises_exegeticas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_analises_hermeneuticas
  BEFORE UPDATE ON analises_hermeneuticas
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_gramatica_grega
  BEFORE UPDATE ON gramatica_grega
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_traducoes
  BEFORE UPDATE ON traducoes
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ---------------------------------------------------------------------------
-- 3. Log search queries for analytics
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION log_search_query()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.search_analytics (usuario_id, query_text, table_name, criado_em)
  VALUES (
    auth.uid(),
    NEW.query_text,
    NEW.table_name,
    now()
  );
  RETURN NEW;
END;
$$;

-- Create search_queries table if not exists for logging
CREATE TABLE IF NOT EXISTS search_queries (
  id          uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_id  uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  query_text  text NOT NULL,
  table_name  varchar(50) NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "search_queries_insert_authenticated" ON search_queries
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "search_queries_select_admin" ON search_queries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
