-- ============================================================================
-- Sola Scriptura BR - Auth Integration Tables
-- ============================================================================
-- Creates Supabase-compatible auth integration:
--   - usuarios: bridges Supabase auth.users to the application
--   - user_profiles: display preferences and bio
--   - user_settings: notification, audio, and display settings
-- ============================================================================

-- Users table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS usuarios (
  id             uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome           varchar(100) NOT NULL,
  email          varchar(200) NOT NULL UNIQUE,
  avatar_url     text,
  email_verificado boolean NOT NULL DEFAULT false,
  mfa_ativado    boolean NOT NULL DEFAULT false,
  plano          varchar(20) NOT NULL DEFAULT 'free',
  permissoes     jsonb NOT NULL DEFAULT '{"role": "user"}'::jsonb,
  ativo          boolean NOT NULL DEFAULT true,
  ultimo_acesso  timestamptz,
  criado_em      timestamptz NOT NULL DEFAULT now(),
  atualizado_em  timestamptz NOT NULL DEFAULT now()
);

-- User profile with display and study preferences
CREATE TABLE IF NOT EXISTS user_profiles (
  id                     uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_id             uuid NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  display_name           varchar(100),
  avatar_url             text,
  bio                    text,
  denominacao            text,
  interesses             jsonb,
  idiomas_preferidos     text[],
  tradicao_teologica     text,
  nivel_estudo           text,
  preferred_translation  varchar(50) NOT NULL DEFAULT 'NVI',
  preferred_theme        varchar(20) NOT NULL DEFAULT 'light',
  criado_em              timestamptz NOT NULL DEFAULT now(),
  atualizado_em          timestamptz NOT NULL DEFAULT now()
);

-- User settings for notifications, audio, and display
CREATE TABLE IF NOT EXISTS user_settings (
  id                          uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_id                  uuid NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  -- Notification settings
  notificacoes_push           boolean NOT NULL DEFAULT true,
  notificacoes_email          boolean NOT NULL DEFAULT true,
  notificacoes_estudo         boolean NOT NULL DEFAULT true,
  notificacoes_devocional     boolean NOT NULL DEFAULT true,
  notificacoes_novo_conteudo  boolean NOT NULL DEFAULT true,
  -- Audio settings
  audio_voz                   varchar(50) NOT NULL DEFAULT 'default',
  audio_velocidade            numeric(3,2) NOT NULL DEFAULT 1.0,
  audio_volume                numeric(3,2) NOT NULL DEFAULT 0.8,
  audio_idioma                varchar(10) NOT NULL DEFAULT 'pt-BR',
  -- Display settings
  idioma                      varchar(10) NOT NULL DEFAULT 'pt-BR',
  tema                        varchar(20) NOT NULL DEFAULT 'light',
  tamanho_fonte               varchar(10) NOT NULL DEFAULT '18',
  mostrar_strong              boolean NOT NULL DEFAULT true,
  mostrar_notas_rodape        boolean NOT NULL DEFAULT true,
  mostrar_versiculos_paralelos boolean NOT NULL DEFAULT false,
  modo_escuro                 boolean NOT NULL DEFAULT false,
  layout_personalizado        jsonb,
  -- Study settings
  traducao_padrao             varchar(50) NOT NULL DEFAULT 'NVI',
  auto_play_audio             boolean NOT NULL DEFAULT false,
  highlight_original_words    boolean NOT NULL DEFAULT true,
  criado_em                   timestamptz NOT NULL DEFAULT now(),
  atualizado_em               timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- Indexes for auth tables
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_plano ON usuarios(plano);
CREATE INDEX IF NOT EXISTS idx_user_profiles_usuario_id ON user_profiles(usuario_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_usuario_id ON user_settings(usuario_id);
