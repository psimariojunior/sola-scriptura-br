-- ============================================================================
-- Sola Scriptura BR - Row Level Security Policies
-- ============================================================================
-- Enables RLS on ALL tables and creates access policies:
--   1. Public read for biblical/reference content
--   2. Authenticated write for user-generated content
--   3. Owner-only access for personal data
--   4. Admin-only access for admin operations
-- ============================================================================

-- ============================================================================
-- 1. PUBLIC TABLES - Enable RLS, allow public read, restrict write
-- ============================================================================

-- Bible books
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;
CREATE POLICY "livros_select_public" ON livros
  FOR SELECT USING (true);
CREATE POLICY "livros_insert_admin" ON livros
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "livros_update_admin" ON livros
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "livros_delete_admin" ON livros
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Bible chapters
ALTER TABLE capitulos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "capitulos_select_public" ON capitulos
  FOR SELECT USING (true);
CREATE POLICY "capitulos_insert_admin" ON capitulos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "capitulos_update_admin" ON capitulos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Bible verses
ALTER TABLE versiculos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "versiculos_select_public" ON versiculos
  FOR SELECT USING (true);
CREATE POLICY "versiculos_insert_admin" ON versiculos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "versiculos_update_admin" ON versiculos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Bible translations
ALTER TABLE traducoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "traducoes_select_public" ON traducoes
  FOR SELECT USING (true);
CREATE POLICY "traducoes_insert_admin" ON traducoes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Testaments
ALTER TABLE testamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testamentos_select_public" ON testamentos
  FOR SELECT USING (true);
CREATE POLICY "testamentos_insert_admin" ON testamentos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Word analysis (palavras)
ALTER TABLE palavras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "palavras_select_public" ON palavras
  FOR SELECT USING (true);
CREATE POLICY "palavras_insert_admin" ON palavras
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Greek words dictionary
ALTER TABLE palavras_gregas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "palavras_gregas_select_public" ON palavras_gregas
  FOR SELECT USING (true);
CREATE POLICY "palavras_gregas_insert_admin" ON palavras_gregas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "palavras_gregas_update_admin" ON palavras_gregas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Hebrew words dictionary
ALTER TABLE palavras_hebraicas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "palavras_hebraicas_select_public" ON palavras_hebraicas
  FOR SELECT USING (true);
CREATE POLICY "palavras_hebraicas_insert_admin" ON palavras_hebraicas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "palavras_hebraicas_update_admin" ON palavras_hebraicas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Doctrine categories
ALTER TABLE categorias_doutrina ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categorias_doutrina_select_public" ON categorias_doutrina
  FOR SELECT USING (true);
CREATE POLICY "categorias_doutrina_insert_admin" ON categorias_doutrina
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Doctrines
ALTER TABLE doutrinas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "doutrinas_select_public" ON doutrinas
  FOR SELECT USING (true);
CREATE POLICY "doutrinas_insert_admin" ON doutrinas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "doutrinas_update_admin" ON doutrinas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Doctrine-verse links
ALTER TABLE doutrinas_versiculos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "doutrinas_versiculos_select_public" ON doutrinas_versiculos
  FOR SELECT USING (true);
CREATE POLICY "doutrinas_versiculos_insert_admin" ON doutrinas_versiculos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Biblical characters
ALTER TABLE personagens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "personagens_select_public" ON personagens
  FOR SELECT USING (true);
CREATE POLICY "personagens_insert_admin" ON personagens
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "personagens_update_admin" ON personagens
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Biblical locations
ALTER TABLE localizacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "localizacoes_select_public" ON localizacoes
  FOR SELECT USING (true);
CREATE POLICY "localizacoes_insert_admin" ON localizacoes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "localizacoes_update_admin" ON localizacoes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Cross references
ALTER TABLE referencias_cruzadas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referencias_cruzadas_select_public" ON referencias_cruzadas
  FOR SELECT USING (true);
CREATE POLICY "referencias_cruzadas_insert_admin" ON referencias_cruzadas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Dictionary entries (verbetes)
ALTER TABLE verbetes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "verbetes_select_public" ON verbetes
  FOR SELECT USING (true);
CREATE POLICY "verbetes_insert_admin" ON verbetes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "verbetes_update_admin" ON verbetes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Historical contexts
ALTER TABLE contextos_historicos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contextos_historicos_select_public" ON contextos_historicos
  FOR SELECT USING (true);
CREATE POLICY "contextos_historicos_insert_admin" ON contextos_historicos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Historical events
ALTER TABLE eventos_historicos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "eventos_historicos_select_public" ON eventos_historicos
  FOR SELECT USING (true);
CREATE POLICY "eventos_historicos_insert_admin" ON eventos_historicos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Biblical routes
ALTER TABLE rotas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rotas_select_public" ON rotas
  FOR SELECT USING (true);
CREATE POLICY "rotas_insert_admin" ON rotas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Artifacts
ALTER TABLE arte_fatos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "artefatos_select_public" ON arte_fatos
  FOR SELECT USING (true);
CREATE POLICY "artefatos_insert_admin" ON arte_fatos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Excavations
ALTER TABLE escavacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "escavacoes_select_public" ON escavacoes
  FOR SELECT USING (true);
CREATE POLICY "escavacoes_insert_admin" ON escavacoes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Manuscripts
ALTER TABLE manuscritos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "manuscritos_select_public" ON manuscritos
  FOR SELECT USING (true);
CREATE POLICY "manuscritos_insert_admin" ON manuscritos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Comments
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comentarios_select_public" ON comentarios
  FOR SELECT USING (true);
CREATE POLICY "comentarios_insert_admin" ON comentarios
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Exegetical analyses
ALTER TABLE analises_exegeticas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "analises_exegeticas_select_public" ON analises_exegeticas
  FOR SELECT USING (true);
CREATE POLICY "analises_exegeticas_insert_admin" ON analises_exegeticas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Hermeneutical analyses
ALTER TABLE analises_hermeneuticas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "analises_hermeneuticas_select_public" ON analises_hermeneuticas
  FOR SELECT USING (true);
CREATE POLICY "analises_hermeneuticas_insert_admin" ON analises_hermeneuticas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Greek grammar
ALTER TABLE gramatica_grega ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gramatica_grega_select_public" ON gramatica_grega
  FOR SELECT USING (true);
CREATE POLICY "gramatica_grega_insert_admin" ON gramatica_grega
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- Reading plans (public plans are readable by all)
ALTER TABLE planos_leitura ENABLE ROW LEVEL SECURITY;
CREATE POLICY "planos_leitura_select_public" ON planos_leitura
  FOR SELECT USING (publico = true OR EXISTS (
    SELECT 1 FROM usuarios
    WHERE id = auth.uid()
      AND permissoes ->> 'role' = 'admin'
  ));
CREATE POLICY "planos_leitura_insert_admin" ON planos_leitura
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "planos_leitura_update_admin" ON planos_leitura
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );

-- ============================================================================
-- 2. USER CONTENT TABLES - Authenticated write, owner read
-- ============================================================================

-- Favorites (notes/bookmarks)
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favoritos_select_owner" ON favoritos
  FOR SELECT USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "favoritos_insert_authenticated" ON favoritos
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "favoritos_update_owner" ON favoritos
  FOR UPDATE USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "favoritos_delete_owner" ON favoritos
  FOR DELETE USING (
    auth.uid() = usuario_id
  );

-- Personal notes
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notas_select_owner" ON notas
  FOR SELECT USING (
    auth.uid() = usuario_id OR publica = true
  );
CREATE POLICY "notas_insert_authenticated" ON notas
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "notas_update_owner" ON notas
  FOR UPDATE USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "notas_delete_owner" ON notas
  FOR DELETE USING (
    auth.uid() = usuario_id
  );

-- Reading progress
ALTER TABLE progressos_leitura ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progressos_select_owner" ON progressos_leitura
  FOR SELECT USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "progressos_insert_authenticated" ON progressos_leitura
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "progressos_update_owner" ON progressos_leitura
  FOR UPDATE USING (
    auth.uid() = usuario_id
  );

-- ============================================================================
-- 3. OWNER-ONLY TABLES - Only the user can access their own data
-- ============================================================================

-- User accounts (only visible to own user + admins)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuarios_select_own" ON usuarios
  FOR SELECT USING (
    auth.uid() = id OR EXISTS (
      SELECT 1 FROM usuarios u
      WHERE u.id = auth.uid()
        AND u.permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "usuarios_update_own" ON usuarios
  FOR UPDATE USING (
    auth.uid() = id
  );
CREATE POLICY "usuarios_insert_service" ON usuarios
  FOR INSERT WITH CHECK (
    auth.uid() = id
  );

-- User profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_profiles_select_public" ON user_profiles
  FOR SELECT USING (true);
CREATE POLICY "user_profiles_insert_own" ON user_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "user_profiles_update_own" ON user_profiles
  FOR UPDATE USING (
    auth.uid() = usuario_id
  );

-- User settings (private)
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_settings_select_own" ON user_settings
  FOR SELECT USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "user_settings_insert_own" ON user_settings
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "user_settings_update_own" ON user_settings
  FOR UPDATE USING (
    auth.uid() = usuario_id
  );

-- Refresh tokens (owner only)
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "refresh_tokens_select_own" ON refresh_tokens
  FOR SELECT USING (
    auth.uid() = usuario_id
  );
CREATE POLICY "refresh_tokens_insert_own" ON refresh_tokens
  FOR INSERT WITH CHECK (
    auth.uid() = usuario_id
  );
CREATE POLICY "refresh_tokens_delete_own" ON refresh_tokens
  FOR DELETE USING (
    auth.uid() = usuario_id
  );

-- ============================================================================
-- 4. ADMIN-ONLY TABLES
-- ============================================================================

-- Search analytics log (admin only)
CREATE TABLE IF NOT EXISTS search_analytics (
  id          uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_id  uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  query_text  text NOT NULL,
  table_name  varchar(50),
  results_count int,
  duration_ms int,
  criado_em   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "search_analytics_insert_authenticated" ON search_analytics
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
  );
CREATE POLICY "search_analytics_select_admin" ON search_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
CREATE POLICY "search_analytics_delete_admin" ON search_analytics
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE id = auth.uid()
        AND permissoes ->> 'role' = 'admin'
    )
  );
