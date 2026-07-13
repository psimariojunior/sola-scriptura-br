-- ============================================================================
-- Sola Scriptura BR - Database Seed Data
-- ============================================================================
-- Seeds initial data for the biblical study platform:
--   1. Admin user
--   2. Default reading plans
--   3. Default doctrine categories
--   4. Default translations
--   5. Testaments
-- ============================================================================

-- NOTE: Admin user must be created via Supabase Auth first.
-- The handle_new_user() trigger will auto-create the usuarios record.
-- Use the following SQL after creating the auth user:
--   UPDATE usuarios SET permissoes = '{"role": "admin"}'::jsonb WHERE id = '<auth_user_id>';

-- ============================================================================
-- TESTAMENTS
-- ============================================================================
INSERT INTO testamentos (id, nome, slug, ordem, total_livros)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Antigo Testamento', 'at', 1, 39),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Novo Testamento', 'nt', 2, 27)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TRANSLATIONS
-- ============================================================================
INSERT INTO traducoes (id, nome, sigla, descricao, idioma, licenca_publica, gratuita)
VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01', 'Nova Versao Internacional', 'NVI', 'Traducao moderna e fiel ao texto original', 'pt-BR', false, false),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b02', 'Nova Traducao na Linguagem de Hoje', 'NLT-HOJE', 'Linguagem acessivel e contemporanea', 'pt-BR', false, false),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b03', 'Biblia de Estudo Pentecostal', 'BEP', 'Biblia com notas pentecostais', 'pt-BR', false, false),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b04', 'Biblia de Jerusalém', 'BJ', 'Traducao catolica com notas', 'pt-BR', false, false),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b05', 'King James Version', 'KJV', 'Classic English translation (public domain)', 'en', true, true),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b06', 'World English Bible', 'WEB', 'Public domain English translation', 'en', true, true)
ON CONFLICT (sigla) DO NOTHING;

-- ============================================================================
-- DEFAULT DOCTRINE CATEGORIES
-- ============================================================================
INSERT INTO categorias_doutrina (id, nome, slug, descricao, ordem)
VALUES
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c01', 'Teologia Proper', 'teologia-proper', 'Estudo sobre a natureza e atributos de Deus', 1),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c02', 'Cristologia', 'cristologia', 'Estudo sobre a pessoa e obra de Cristo', 2),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c03', 'Pneumatologia', 'pneumatologia', 'Estudo sobre o Espirito Santo', 3),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c04', 'Soteriologia', 'soteriologia', 'Estudo sobre a salvacao', 4),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c05', 'Eclesiologia', 'eclesiologia', 'Estudo sobre a Igreja', 5),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c06', 'Escatologia', 'escatologia', 'Estudo sobre as coisas finais', 6),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c07', 'Angelologia', 'angelologia', 'Estudo sobre os anjos', 7),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c08', 'Demonologia', 'demonologia', 'Estudo sobre os demonios', 8),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c09', 'Bibliologia', 'bibliologia', 'Estudo sobre a Biblia', 9),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c10', 'Harmatologia', 'harmatologia', 'Estudo sobre o pecado', 10),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', 'Antropologia Teologica', 'antropologia-teologica', 'Estudo sobre a natureza humana', 11),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c12', 'Amilenialismo', 'amilenialismo', 'Visao amilenialista do Reino', 12),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c13', 'Crematologia', 'crematologia', 'Estudo sobre as riquezas e avareza', 13)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- DEFAULT READING PLANS
-- ============================================================================
INSERT INTO planos_leitura (id, nome, descricao, total_dias, capitulos_por_dia, programacao, categoria, publico)
VALUES
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d01',
    'Plano Anual - Biblia em 1 Ano',
    'Leia toda a Biblia em 365 dias, com um capitulo por dia. Inclui passagens do Antigo e Novo Testamento.',
    365,
    1,
    '{"type": "sequential", "order": "canonical", "ot_first": true, "include_psalm_proverb_daily": true}'::jsonb,
    'completo',
    true
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d02',
    'Plano dos Evangelhos - 90 Dias',
    'Estude os quatro Evangelhos em 90 dias. Leitura cronologica de Mateus, Marcos, Lucas e Joao.',
    90,
    1,
    '{"type": "sequential", "order": "chronological", "books": ["mateus", "marcos", "lucas", "joao"]}'::jsonb,
    'evangelhos',
    true
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d03',
    'Plano de Salmos e Proverbios - 60 Dias',
    'Leia um Salmo e um Proverbio por dia durante 60 dias.',
    60,
    2,
    '{"type": "parallel", "books": ["salmos", "proverbios"]}'::jsonb,
    'poesia',
    true
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d04',
    'Plano do Novo Testamento - 90 Dias',
    'Leia todo o Novo Testamento em 90 dias, cerca de 3 capitulos por dia.',
    90,
    3,
    '{"type": "sequential", "order": "canonical", "testament": "nt"}'::jsonb,
    'novo_testamento',
    true
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d05',
    'Plano de Gênesis a Apocalipse - 180 Dias',
    'Plano semestral com 2-3 capitulos por dia. Leitura equilibrada entre AT e NT.',
    180,
    2,
    '{"type": "balanced", "order": "canonical", "ot_nt_ratio": 0.6}'::jsonb,
    'completo',
    true
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d06',
    'Plano dos Profetas - 60 Dias',
    'Estude os grandes e pequenos profetas em 60 dias.',
    60,
    2,
    '{"type": "sequential", "category": "prophets"}'::jsonb,
    'profetas',
    true
  )
ON CONFLICT (id) DO NOTHING;
