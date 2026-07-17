-- ============================================================================
-- Sola Scriptura BR - Pagamentos e Acesso Total
-- ============================================================================
-- Adiciona controle de "Acesso Total" (pagamento unico R$20) na tabela usuarios
-- e cria a tabela de pagamentos para auditoria/rastreio por external_reference.
-- ============================================================================

-- Coluna que indica se o usuario ja liberou o Acesso Total (pagamento unico).
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS acesso_total boolean NOT NULL DEFAULT false;

-- Data/hora em que o pagamento foi aprovado e o acesso liberado.
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS data_pagamento timestamptz;

-- Tabela de pagamentos (auditoria + casamento do webhook).
-- external_reference e' o id de pedido gerado no frontend/criar e enviado ao MP.
CREATE TABLE IF NOT EXISTS pagamentos (
  id                uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_email     varchar(200) NOT NULL,
  external_reference varchar(200) UNIQUE NOT NULL,
  valor             numeric(10,2) NOT NULL DEFAULT 20.00,
  status            varchar(20) NOT NULL DEFAULT 'pending',
  gateway           varchar(20) NOT NULL DEFAULT 'mercadopago',
  metadata          jsonb,
  criado_em         timestamptz NOT NULL DEFAULT now(),
  atualizado_em     timestamptz NOT NULL DEFAULT now()
);

-- Indices para consultas por email e por status.
CREATE INDEX IF NOT EXISTS idx_pagamentos_email ON pagamentos(usuario_email);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON pagamentos(status);

-- Row Level Security: as escritas sao feitas via service_role (bypassa RLS),
-- mas habilitamos RLS e criamos uma politica permissiva para a role de servico
-- caso a conexao use a role autenticada em vez de service_role.
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_pagamentos" ON pagamentos;
CREATE POLICY "service_role_full_access_pagamentos"
  ON pagamentos FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
