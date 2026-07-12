import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Extensions
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "vector"`);

    // 1. testamentos
    await queryRunner.query(`
      CREATE TABLE "testamentos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(50) NOT NULL,
        "slug" varchar(20) NOT NULL UNIQUE,
        "ordem" int NOT NULL,
        "total_livros" int NOT NULL DEFAULT 0
      )
    `);

    // 2. traducoes
    await queryRunner.query(`
      CREATE TABLE "traducoes" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(50) NOT NULL,
        "sigla" varchar(10) NOT NULL UNIQUE,
        "descricao" text,
        "idioma" text,
        "ano_publicacao" int,
        "copyright" varchar(50),
        "licenca_publica" boolean NOT NULL DEFAULT true,
        "gratuita" boolean NOT NULL DEFAULT false,
        "livro_id" uuid,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 3. livros
    await queryRunner.query(`
      CREATE TABLE "livros" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(100) NOT NULL,
        "nome_abreviado" varchar(30) NOT NULL,
        "nome_ingles" varchar(100),
        "nome_hebraico" varchar(100),
        "nome_grego" varchar(100),
        "slug" varchar(10) NOT NULL UNIQUE,
        "ordem_testamento" int NOT NULL,
        "ordem_geral" int NOT NULL,
        "total_capitulos" int NOT NULL DEFAULT 0,
        "autor" text,
        "data_escrita" text,
        "contexto_historico" text,
        "proposito" text,
        "temas_principais" text,
        "palavras_chave" text[],
        "genero_literario" text,
        "testamento_id" uuid NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "livros" ADD CONSTRAINT "FK_livros_testamento" FOREIGN KEY ("testamento_id") REFERENCES "testamentos"("id") ON DELETE RESTRICT`,
    );

    // 4. capitulos
    await queryRunner.query(`
      CREATE TABLE "capitulos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "numero" int NOT NULL,
        "total_versiculos" int NOT NULL DEFAULT 0,
        "resumo" text,
        "temas_principais" text[],
        "livro_id" uuid NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_capitulos_livro_numero" ON "capitulos" ("livro_id", "numero")`,
    );
    await queryRunner.query(
      `ALTER TABLE "capitulos" ADD CONSTRAINT "FK_capitulos_livro" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE CASCADE`,
    );

    // 5. versiculos
    await queryRunner.query(`
      CREATE TABLE "versiculos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "numero" int NOT NULL,
        "texto" text NOT NULL,
        "texto_formatado" text,
        "livro_id" uuid NOT NULL,
        "capitulo_id" uuid NOT NULL,
        "capitulo_numero" int NOT NULL,
        "traducao_id" uuid NOT NULL,
        "testamento_id" uuid NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_versiculos_capitulo_numero" ON "versiculos" ("capitulo_id", "numero")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_versiculos_livro_capitulo_numero" ON "versiculos" ("livro_id", "capitulo_numero", "numero")`,
    );
    await queryRunner.query(
      `ALTER TABLE "versiculos" ADD CONSTRAINT "FK_versiculos_capitulo" FOREIGN KEY ("capitulo_id") REFERENCES "capitulos"("id") ON DELETE CASCADE`,
    );

    // 6. palavras (análise por palavra)
    await queryRunner.query(`
      CREATE TABLE "palavras" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "texto" text NOT NULL,
        "posicao" int NOT NULL,
        "texto_original" text,
        "idioma_original" text,
        "strong_grego" varchar(10),
        "strong_hebraico" varchar(10),
        "lemma" text,
        "transliteracao" text,
        "pronuncia" text,
        "definicao" text,
        "morfologia" text,
        "classe_gramatical" text,
        "tempo_verbal" text,
        "voz_verbal" text,
        "modo_verbal" text,
        "frequencia" int,
        "tipo_entidade" text,
        "entidade_id" text,
        "versiculo_id" uuid NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_palavras_versiculo_posicao" ON "palavras" ("versiculo_id", "posicao")`,
    );
    await queryRunner.query(
      `ALTER TABLE "palavras" ADD CONSTRAINT "FK_palavras_versiculo" FOREIGN KEY ("versiculo_id") REFERENCES "versiculos"("id") ON DELETE CASCADE`,
    );

    // 7. palavras_gregas (dicionário)
    await queryRunner.query(`
      CREATE TABLE "palavras_gregas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "strong" varchar(50) NOT NULL UNIQUE,
        "palavra_original" text NOT NULL,
        "lemma" text NOT NULL,
        "transliteracao" text NOT NULL,
        "pronuncia" text,
        "definicao_curta" text NOT NULL,
        "definicao_completa" text,
        "morfologia" text,
        "classe_gramatical" text NOT NULL,
        "tempo_verbal" text,
        "voz_verbal" text,
        "modo_verbal" text,
        "caso" text,
        "numero" text,
        "genero" text,
        "pessoa" text,
        "frequencia_at" int,
        "frequencia_nt" int,
        "ocorrencias" text,
        "fonetica" text,
        "definicoes_bdag" jsonb,
        "definicoes_thayer" jsonb,
        "definicoes_louw_nida" jsonb,
        "dominio_semantico" jsonb,
        "sinonimos" jsonb,
        "antonimos" jsonb,
        "palavras_relacionadas" text[],
        "notas_gramaticais" text,
        "vetor_embedding" float8[],
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 8. palavras_hebraicas (dicionário)
    await queryRunner.query(`
      CREATE TABLE "palavras_hebraicas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "strong" varchar(10) NOT NULL UNIQUE,
        "palavra_original" text NOT NULL,
        "lemma" text NOT NULL,
        "transliteracao" text NOT NULL,
        "pronuncia" text,
        "definicao_curta" text NOT NULL,
        "definicao_completa" text,
        "morfologia" text,
        "classe_gramatical" text NOT NULL,
        "raiz" text,
        "padrao" text,
        "radical" text,
        "tipo_verbo" text,
        "conjugacao" text,
        "tempo" text,
        "pessoa" text,
        "genero" text,
        "numero" text,
        "estado" text,
        "frequencia_at" int,
        "ocorrencias" text,
        "definicoes_bdb" jsonb,
        "definicoes_halot" jsonb,
        "definicoes_gesenius" jsonb,
        "cognatos" jsonb,
        "palavras_relacionadas" text[],
        "notas_gramaticais" text,
        "ocorrencias_notaveis" text,
        "versiculos_chave" jsonb,
        "vetor_embedding" float8[],
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 9. categorias_doutrina
    await queryRunner.query(`
      CREATE TABLE "categorias_doutrina" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(100) NOT NULL,
        "slug" varchar(50) NOT NULL,
        "descricao" text,
        "ordem" int NOT NULL,
        "categoria_mae_id" text
      )
    `);

    // 10. doutrinas
    await queryRunner.query(`
      CREATE TABLE "doutrinas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(100) NOT NULL,
        "slug" varchar(50) NOT NULL,
        "definicao" text,
        "explicacao" text,
        "base_scriptura" text,
        "interpretacoes" jsonb,
        "tradicoes" jsonb,
        "controversias" jsonb,
        "passagens_chave" jsonb,
        "categoria_id" uuid NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "doutrinas" ADD CONSTRAINT "FK_doutrinas_categoria" FOREIGN KEY ("categoria_id") REFERENCES "categorias_doutrina"("id") ON DELETE RESTRICT`,
    );

    // 11. doutrinas_versiculos
    await queryRunner.query(`
      CREATE TABLE "doutrinas_versiculos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "doutrina_id" uuid NOT NULL,
        "versiculo_id" uuid NOT NULL,
        "relevancia" text,
        "peso" int NOT NULL DEFAULT 1
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "doutrinas_versiculos" ADD CONSTRAINT "FK_doutrinas_versiculos_doutrina" FOREIGN KEY ("doutrina_id") REFERENCES "doutrinas"("id") ON DELETE CASCADE`,
    );

    // 12. personagens
    await queryRunner.query(`
      CREATE TABLE "personagens" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome_portugues" varchar(100) NOT NULL,
        "nome_original" varchar(100),
        "nome_hebraico" varchar(100),
        "nome_grego" varchar(100),
        "slug" varchar(50) NOT NULL,
        "biografia" text,
        "significado_nome" text,
        "primeira_mencao" text,
        "ultima_mençao" text,
        "total_mencoes" int,
        "familia" jsonb,
        "eventos_principais" jsonb,
        "relacoes" jsonb,
        "versoes_referencias" jsonb,
        "genealogia" text,
        "significado_teologico" text,
        "vetor_embedding" float8[],
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 13. localizacoes
    await queryRunner.query(`
      CREATE TABLE "localizacoes" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome_portugues" varchar(100) NOT NULL,
        "nome_original" varchar(100),
        "nome_ingles" varchar(100),
        "nome_hebraico" varchar(100),
        "nome_grego" varchar(100),
        "slug" varchar(50) NOT NULL,
        "tipo" varchar(50) NOT NULL,
        "latitude" decimal(10,7),
        "longitude" decimal(10,7),
        "regiao" text,
        "pais_atual" text,
        "descricao" text,
        "historia" text,
        "significado_biblico" text,
        "eventos_relacionados" jsonb,
        "personagens_relacionados" jsonb,
        "versoes_referencias" jsonb,
        "fotos" jsonb,
        "fontes" text,
        "vetor_embedding" float8[],
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 14. eventos_historicos
    await queryRunner.query(`
      CREATE TABLE "eventos_historicos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(200) NOT NULL,
        "slug" varchar(50) NOT NULL,
        "categoria" varchar(50) NOT NULL,
        "descricao" text,
        "ano_inicio" int NOT NULL,
        "ano_fim" int,
        "era" varchar(10) NOT NULL DEFAULT 'AC',
        "referencias_biblicas" jsonb,
        "personagens_envolvidos" jsonb,
        "significado_teologico" text,
        "fontes" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_eventos_historicos_anos" ON "eventos_historicos" ("ano_inicio", "ano_fim")`,
    );

    // 15. comentarios
    await queryRunner.query(`
      CREATE TABLE "comentarios" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "titulo" varchar(200) NOT NULL,
        "autor" varchar(100) NOT NULL,
        "referencia" text,
        "livro_id" uuid,
        "capitulo" int,
        "versiculo_inicio" int,
        "versiculo_fim" int,
        "conteudo" text NOT NULL,
        "tradicao_teologica" text,
        "fonte" text,
        "licenca_publica" boolean NOT NULL DEFAULT false,
        "idioma" text DEFAULT 'pt-BR',
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 16. referencias_cruzadas
    await queryRunner.query(`
      CREATE TABLE "referencias_cruzadas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "versiculo_origem_id" uuid NOT NULL,
        "versiculo_destino_id" uuid NOT NULL,
        "tipo_relacao" varchar(50) NOT NULL,
        "descricao" text,
        "peso" int NOT NULL DEFAULT 1,
        "criado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "referencias_cruzadas" ADD CONSTRAINT "FK_ref_cruzadas_origem" FOREIGN KEY ("versiculo_origem_id") REFERENCES "versiculos"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "referencias_cruzadas" ADD CONSTRAINT "FK_ref_cruzadas_destino" FOREIGN KEY ("versiculo_destino_id") REFERENCES "versiculos"("id") ON DELETE CASCADE`,
    );

    // 17. usuarios
    await queryRunner.query(`
      CREATE TABLE "usuarios" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(100) NOT NULL,
        "email" varchar(200) NOT NULL UNIQUE,
        "senha_hash" varchar NOT NULL,
        "ativo" boolean NOT NULL DEFAULT true,
        "email_verificado" boolean NOT NULL DEFAULT false,
        "mfa_ativado" boolean NOT NULL DEFAULT false,
        "mfa_segredo" text,
        "mfa_codigos_recovery" jsonb,
        "foto_url" text,
        "provedores_oauth" jsonb,
        "permissoes" jsonb,
        "plano" varchar(20) NOT NULL DEFAULT 'free',
        "ultimo_acesso" timestamptz,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 18. perfis_usuario
    await queryRunner.query(`
      CREATE TABLE "perfis_usuario" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "usuario_id" uuid NOT NULL UNIQUE,
        "bio" text,
        "denominacao" text,
        "interesses" jsonb,
        "idiomas_preferidos" text[],
        "tradicao_teologica" text,
        "nivel_estudo" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "perfis_usuario" ADD CONSTRAINT "FK_perfis_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE`,
    );

    // 19. preferencias_usuario
    await queryRunner.query(`
      CREATE TABLE "preferencias_usuario" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "usuario_id" uuid NOT NULL UNIQUE,
        "idioma" varchar(10) NOT NULL DEFAULT 'pt-BR',
        "locale" varchar(10) NOT NULL DEFAULT 'pt-BR',
        "tema" varchar(20) NOT NULL DEFAULT 'dracula',
        "tamanho_fonte" varchar(10) NOT NULL DEFAULT '18',
        "traducao_padrao" varchar(50) NOT NULL DEFAULT 'nova-versao-internacional',
        "mostrar_strong" boolean NOT NULL DEFAULT true,
        "mostrar_notas_rodape" boolean NOT NULL DEFAULT true,
        "mostrar_versiculos_paralelos" boolean NOT NULL DEFAULT false,
        "notificacoes_estudo" boolean NOT NULL DEFAULT true,
        "modo_escuro" boolean NOT NULL DEFAULT false,
        "layout_personalizado" jsonb,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "preferencias_usuario" ADD CONSTRAINT "FK_pref_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE`,
    );

    // 20. notas
    await queryRunner.query(`
      CREATE TABLE "notas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "usuario_id" uuid NOT NULL,
        "versiculo_id" uuid,
        "conteudo" text NOT NULL,
        "etiquetas" jsonb,
        "cor_destaque" text,
        "publica" boolean NOT NULL DEFAULT false,
        "sincronizado" boolean NOT NULL DEFAULT false,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "notas" ADD CONSTRAINT "FK_notas_versiculo" FOREIGN KEY ("versiculo_id") REFERENCES "versiculos"("id") ON DELETE SET NULL`,
    );

    // 21. favoritos
    await queryRunner.query(`
      CREATE TABLE "favoritos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "usuario_id" uuid NOT NULL,
        "versiculo_id" uuid NOT NULL,
        "etiquetas" text[],
        "nota_pessoal" text,
        "ordem" int NOT NULL DEFAULT 0,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 22. planos_leitura
    await queryRunner.query(`
      CREATE TABLE "planos_leitura" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(200) NOT NULL,
        "descricao" text,
        "total_dias" int NOT NULL,
        "capitulos_por_dia" int NOT NULL DEFAULT 1,
        "programacao" jsonb NOT NULL,
        "categoria" text,
        "publico" boolean NOT NULL DEFAULT true,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 23. progressos_leitura
    await queryRunner.query(`
      CREATE TABLE "progressos_leitura" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "usuario_id" uuid NOT NULL,
        "plano_id" uuid NOT NULL,
        "dia_atual" int NOT NULL DEFAULT 0,
        "dias_completos" jsonb,
        "data_inicio" date,
        "data_conclusao" date,
        "concluido" boolean NOT NULL DEFAULT false,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "progressos_leitura" ADD CONSTRAINT "FK_progresso_plano" FOREIGN KEY ("plano_id") REFERENCES "planos_leitura"("id") ON DELETE CASCADE`,
    );

    // 24. refresh_tokens
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "token" uuid NOT NULL UNIQUE,
        "usuario_id" uuid NOT NULL,
        "ativo" boolean NOT NULL DEFAULT true,
        "expira_em" timestamptz NOT NULL,
        "criado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE`,
    );

    // 25. verbetes (dicionário teológico)
    await queryRunner.query(`
      CREATE TABLE "verbetes" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "titulo" varchar(200) NOT NULL,
        "slug" varchar(50) NOT NULL,
        "categoria" text,
        "definicao" text NOT NULL,
        "explicacao" text,
        "sinonimos" jsonb,
        "referencias_biblicas" jsonb,
        "fonte" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 26. contextos_historicos
    await queryRunner.query(`
      CREATE TABLE "contextos_historicos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "entidade_tipo" varchar(50) NOT NULL,
        "entidade_id" uuid NOT NULL,
        "autor" text,
        "data_estimada" text,
        "destinatarios" text,
        "contexto_politico" text,
        "contexto_religioso" text,
        "contexto_economico" text,
        "contexto_cultural" text,
        "imperios_envolvidos" jsonb,
        "governantes" jsonb,
        "eventos_contemporaneos" jsonb,
        "significado_teologico" text,
        "fontes" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 27. rotas
    await queryRunner.query(`
      CREATE TABLE "rotas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(100) NOT NULL,
        "slug" varchar(50) NOT NULL,
        "descricao" text,
        "pontos" jsonb NOT NULL,
        "cor_rota" text,
        "referencias_biblicas" jsonb,
        "personagens_envolvidos" text[],
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 28. analises_exegeticas
    await queryRunner.query(`
      CREATE TABLE "analises_exegeticas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "versiculo_id" uuid NOT NULL,
        "contexto_imediato" text,
        "contexto_capitulo" text,
        "contexto_livro" text,
        "contexto_testamento" text,
        "contexto_canonico" text,
        "estrutura_literaria" text,
        "analise_sintatica" text,
        "analise_semantica" text,
        "palavras_chave" jsonb,
        "figuras_linguagem" jsonb,
        "conexoes_teologicas" jsonb,
        "observacoes" text,
        "gerado_por_ia" text DEFAULT 'false',
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 29. analises_hermeneuticas
    await queryRunner.query(`
      CREATE TABLE "analises_hermeneuticas" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "versiculo_id" uuid NOT NULL,
        "genero_literario" text NOT NULL,
        "principios_hermeneuticos" text,
        "interpretacao_historica" text,
        "interpretacao_gramatical" text,
        "interpretacao_contextual" text,
        "interpretacao_teologica" text,
        "aplicacao_contemporanea" text,
        "principios_aplicados" jsonb,
        "interpretacoes_tradicoes" jsonb,
        "observacoes" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 30. gramatica_grega
    await queryRunner.query(`
      CREATE TABLE "gramatica_grega" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "titulo" text NOT NULL,
        "categoria" text,
        "conteudo" text NOT NULL,
        "exemplos" jsonb,
        "regra_gramatical" text,
        "observacoes" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 31. manuscritos
    await queryRunner.query(`
      CREATE TABLE "manuscritos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(200) NOT NULL,
        "tipo" text,
        "material" text,
        "data_estimada" text,
        "local_descoberta" text,
        "local_atual" text,
        "idioma" text,
        "conteudo" text,
        "passagens_incluidas" jsonb,
        "significado" text,
        "imagens" jsonb,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 32. escavacoes
    await queryRunner.query(`
      CREATE TABLE "escavacoes" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(200) NOT NULL,
        "local" text,
        "coordenadas" text,
        "descricao" text,
        "arqueologo_responsavel" text,
        "data_inicio" text,
        "data_fim" text,
        "descobertas" jsonb,
        "significado_biblico" text,
        "publicacoes" jsonb,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);

    // 33. arte_fatos
    await queryRunner.query(`
      CREATE TABLE "arte_fatos" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar(200) NOT NULL,
        "descricao" text,
        "tipo" text,
        "material" text,
        "data_estimada" text,
        "local_descoberta" text,
        "local_atual" text,
        "dimensoes" jsonb,
        "inscricoes" jsonb,
        "significado_biblico" text,
        "referencias_biblicas" jsonb,
        "imagens" jsonb,
        "fontes" text,
        "criado_em" timestamptz NOT NULL DEFAULT now(),
        "atualizado_em" timestamptz NOT NULL DEFAULT now()
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      'arte_fatos',
      'escavacoes',
      'manuscritos',
      'gramatica_grega',
      'analises_hermeneuticas',
      'analises_exegeticas',
      'rotas',
      'contextos_historicos',
      'verbetes',
      'refresh_tokens',
      'progressos_leitura',
      'planos_leitura',
      'favoritos',
      'notas',
      'preferencias_usuario',
      'perfis_usuario',
      'usuarios',
      'referencias_cruzadas',
      'comentarios',
      'eventos_historicos',
      'localizacoes',
      'personagens',
      'doutrinas_versiculos',
      'doutrinas',
      'categorias_doutrina',
      'palavras_hebraicas',
      'palavras_gregas',
      'palavras',
      'versiculos',
      'capitulos',
      'livros',
      'traducoes',
      'testamentos',
    ];

    for (const table of tables) {
      await queryRunner.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    }

    await queryRunner.query(`DROP EXTENSION IF EXISTS "vector"`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
