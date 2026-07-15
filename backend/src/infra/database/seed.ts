import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { dataSourceOptions } from './typeorm.config';

config();

function log(etapa: string, msg: string) {
  console.log(`[${new Date().toISOString()}] [${etapa}] ${msg}`);
}

async function seed() {
  const ds = new DataSource(dataSourceOptions);
  await ds.initialize();
  const q = (sql: string, params?: any[]) => ds.query(sql, params);

  console.log('=== Sola Scriptura BR - Seed Completo ===\n');

  // ============================================================
  // 1. TESTAMENTOS
  // ============================================================
  log('1/12', 'Verificando/Criando testamentos...');
  let atId: string, ntId: string;
  try {
    const existingAt = await q(`SELECT id FROM "testamentos" WHERE slug = $1`, ['antigo-testamento']);
    const existingNt = await q(`SELECT id FROM "testamentos" WHERE slug = $1`, ['novo-testamento']);

    atId = existingAt.length > 0
      ? existingAt[0].id
      : (await q(`INSERT INTO "testamentos" ("nome","slug","ordem","total_livros") VALUES ($1,$2,$3,$4) RETURNING id`, ['Antigo Testamento', 'antigo-testamento', 1, 39]))[0].id;

    ntId = existingNt.length > 0
      ? existingNt[0].id
      : (await q(`INSERT INTO "testamentos" ("nome","slug","ordem","total_livros") VALUES ($1,$2,$3,$4) RETURNING id`, ['Novo Testamento', 'novo-testamento', 2, 27]))[0].id;

    log('1/12', `Testamentos OK (AT=${atId}, NT=${ntId})`);
  } catch (e) {
    log('1/12', `ERRO ao criar testamentos: ${e}`);
    throw e;
  }

  // ============================================================
  // 2. TRADUÇÕES
  // ============================================================
  log('2/12', 'Verificando/Criando traduções...');
  const traducoes = [
    ['Almeida Revista e Corrigida', 'ARC', 'pt-BR', 1681, 'Sociedade Bíblica do Brasil', true, true],
    ['Nova Versão Internacional', 'NVI', 'pt-BR', 2001, 'Editora Vida', false, true],
    ['Almeida Revista e Atualizada', 'ARA', 'pt-BR', 1993, 'Casa Publicadora Batista', true, true],
    ['Almeida Corrigida Fiel', 'ACF', 'pt-BR', 1994, 'Imprensa Bíblica Brasileira', true, true],
    ['King James Version', 'KJV', 'en', 1611, 'Public Domain', true, true],
    ['World English Bible', 'WEB', 'en', 2000, 'Public Domain', true, true],
    ['Almeida', 'AA', 'pt-BR', 1819, 'Sociedade Bíblica Britânica', true, true],
    ['Nova Tradução na Linguagem de Hoje', 'NTLH', 'pt-BR', 2000, 'Editora Vida', false, true],
  ];
  const traducaoIds: Record<string, string> = {};
  try {
    for (const t of traducoes) {
      const existing = await q(`SELECT id FROM "traducoes" WHERE sigla = $1`, [t[1]]);
      if (existing.length > 0) {
        traducaoIds[t[1] as string] = existing[0].id;
      } else {
        const r = (await q(`INSERT INTO "traducoes" ("nome","sigla","idioma","ano_publicacao","copyright","licenca_publica","gratuita") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`, t))[0];
        traducaoIds[t[1] as string] = r.id;
      }
    }
    log('2/12', `Traduções OK (${Object.keys(traducaoIds).length} traduções)`);
  } catch (e) {
    log('2/12', `ERRO ao criar traduções: ${e}`);
    throw e;
  }

  // ============================================================
  // 3. LIVROS (66 livros da Bíblia)
  // ============================================================
  log('3/12', 'Verificando/Criando 66 livros...');
  interface LivroData {
    nome: string; abrev: string; nomeEn: string; nomeHeb?: string; nomeGrego?: string;
    slug: string; ordemTest: number; ordemGeral: number; capitulos: number;
    autor?: string; data?: string; genero?: string; testamento: string;
  }
  const livros: LivroData[] = [
    // Pentateuco (1-5)
    { nome: 'Gênesis', abrev: 'Gn', nomeEn: 'Genesis', nomeHeb: 'בְּרֵאשִׁית', slug: 'gn', ordemTest: 1, ordemGeral: 1, capitulos: 50, autor: 'Moisés', data: '~1446-1406 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: 'Êxodo', abrev: 'Ex', nomeEn: 'Exodus', nomeHeb: 'שְׁמוֹת', slug: 'ex', ordemTest: 2, ordemGeral: 2, capitulos: 40, autor: 'Moisés', data: '~1446-1406 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: 'Levítico', abrev: 'Lv', nomeEn: 'Leviticus', nomeHeb: 'וַיִּקְרָא', slug: 'lv', ordemTest: 3, ordemGeral: 3, capitulos: 27, autor: 'Moisés', data: '~1446-1406 a.C.', genero: 'Legal', testamento: 'AT' },
    { nome: 'Números', abrev: 'Nm', nomeEn: 'Numbers', nomeHeb: 'בְּמִדְבַּר', slug: 'nm', ordemTest: 4, ordemGeral: 4, capitulos: 36, autor: 'Moisés', data: '~1446-1406 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: 'Deuteronômio', abrev: 'Dt', nomeEn: 'Deuteronomy', nomeHeb: 'דְּבָרִים', slug: 'dt', ordemTest: 5, ordemGeral: 5, capitulos: 34, autor: 'Moisés', data: '~1406 a.C.', genero: 'Legal/Narrativo', testamento: 'AT' },
    // Históricos (6-17)
    { nome: 'Josué', abrev: 'Js', nomeEn: 'Joshua', nomeHeb: 'יְהוֹשֻׁעַ', slug: 'js', ordemTest: 6, ordemGeral: 6, capitulos: 24, autor: 'Josué', data: '~1406-1375 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: 'Juízes', abrev: 'Jz', nomeEn: 'Judges', nomeHeb: 'שׁוֹפְטִים', slug: 'jz', ordemTest: 7, ordemGeral: 7, capitulos: 21, autor: 'Desconhecido', data: '~1375-1050 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: 'Rute', abrev: 'Rt', nomeEn: 'Ruth', nomeHeb: 'רוּת', slug: 'rt', ordemTest: 8, ordemGeral: 8, capitulos: 4, autor: 'Desconhecido', data: '~1300 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: '1 Samuel', abrev: '1Sm', nomeEn: '1 Samuel', nomeHeb: 'שְׁמוּאֵל', slug: '1sm', ordemTest: 9, ordemGeral: 9, capitulos: 31, autor: 'Samuel/Gad/Natan', data: '~1050-970 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: '2 Samuel', abrev: '2Sm', nomeEn: '2 Samuel', nomeHeb: 'שְׁמוּאֵל', slug: '2sm', ordemTest: 10, ordemGeral: 10, capitulos: 24, autor: 'Gad/Natan', data: '~970-930 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: '1 Reis', abrev: '1Rs', nomeEn: '1 Kings', nomeHeb: 'מְלָכִים', slug: '1rs', ordemTest: 11, ordemGeral: 11, capitulos: 22, autor: 'Desconhecido', data: '~970-560 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: '2 Reis', abrev: '2Rs', nomeEn: '2 Kings', nomeHeb: 'מְלָכִים', slug: '2rs', ordemTest: 12, ordemGeral: 12, capitulos: 25, autor: 'Desconhecido', data: '~970-560 a.C.', genero: 'Narrativo', testamento: 'AT' },
    { nome: '1 Crônicas', abrev: '1Cr', nomeEn: '1 Chronicles', nomeHeb: 'דִּבְרֵי', slug: '1cr', ordemTest: 13, ordemGeral: 13, capitulos: 29, autor: 'Esdras', data: '~450-430 a.C.', genero: 'Histórico', testamento: 'AT' },
    { nome: '2 Crônicas', abrev: '2Cr', nomeEn: '2 Chronicles', nomeHeb: 'דִּבְרֵי', slug: '2cr', ordemTest: 14, ordemGeral: 14, capitulos: 36, autor: 'Esdras', data: '~450-430 a.C.', genero: 'Histórico', testamento: 'AT' },
    { nome: 'Esdras', abrev: 'Ed', nomeEn: 'Ezra', nomeHeb: 'עֶזְרָא', slug: 'ed', ordemTest: 15, ordemGeral: 15, capitulos: 10, autor: 'Esdras', data: '~450-430 a.C.', genero: 'Histórico', testamento: 'AT' },
    { nome: 'Neemias', abrev: 'Ne', nomeEn: 'Nehemiah', nomeHeb: 'נְחֶמְיָה', slug: 'ne', ordemTest: 16, ordemGeral: 16, capitulos: 13, autor: 'Neemias', data: '~430 a.C.', genero: 'Histórico', testamento: 'AT' },
    { nome: 'Ester', abrev: 'Et', nomeEn: 'Esther', nomeHeb: 'אֶסְתֵּר', slug: 'et', ordemTest: 17, ordemGeral: 17, capitulos: 10, autor: 'Desconhecido', data: '~480-465 a.C.', genero: 'Narrativo', testamento: 'AT' },
    // Poéticos/Sapienciais (18-22)
    { nome: 'Jó', abrev: 'Jó', nomeEn: 'Job', nomeHeb: 'אִיּוֹב', slug: 'jo', ordemTest: 18, ordemGeral: 18, capitulos: 42, autor: 'Desconhecido', data: '~2000-1800 a.C.', genero: 'Poético/Sapiencial', testamento: 'AT' },
    { nome: 'Salmos', abrev: 'Sl', nomeEn: 'Psalms', nomeHeb: 'תְּהִלִּים', slug: 'sl', ordemTest: 19, ordemGeral: 19, capitulos: 150, autor: 'Vários (Davy, Asafe, etc.)', data: '~1000-400 a.C.', genero: 'Poético/Lírico', testamento: 'AT' },
    { nome: 'Provérbios', abrev: 'Pv', nomeEn: 'Proverbs', nomeHeb: 'מִשְׁלֵי', slug: 'pv', ordemTest: 20, ordemGeral: 20, capitulos: 31, autor: 'Salomão/Agur', data: '~970-700 a.C.', genero: 'Poético/Sapiencial', testamento: 'AT' },
    { nome: 'Eclesiastes', abrev: 'Ec', nomeEn: 'Ecclesiastes', nomeHeb: 'קֹהֶלֶת', slug: 'ec', ordemTest: 21, ordemGeral: 21, capitulos: 12, autor: 'Salomão', data: '~970-930 a.C.', genero: 'Poético/Sapiencial', testamento: 'AT' },
    { nome: 'Cânticos', abrev: 'Ct', nomeEn: 'Song of Solomon', nomeHeb: 'שִׁיר הַשִּׁירִים', slug: 'ct', ordemTest: 22, ordemGeral: 22, capitulos: 8, autor: 'Salomão', data: '~970-930 a.C.', genero: 'Poético/Lírico', testamento: 'AT' },
    // Proféticos maiores (23-27)
    { nome: 'Isaías', abrev: 'Is', nomeEn: 'Isaiah', nomeHeb: 'יְשַׁעְיָהוּ', slug: 'is', ordemTest: 23, ordemGeral: 23, capitulos: 66, autor: 'Isaías', data: '~740-680 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Jeremias', abrev: 'Jr', nomeEn: 'Jeremiah', nomeHeb: 'יִרְמְיָהוּ', slug: 'jr', ordemTest: 24, ordemGeral: 24, capitulos: 52, autor: 'Jeremias', data: '~627-585 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Lamentações', abrev: 'Lm', nomeEn: 'Lamentations', nomeHeb: 'אֵיכָה', slug: 'lm', ordemTest: 25, ordemGeral: 25, capitulos: 5, autor: 'Jeremias', data: '~586 a.C.', genero: 'Poético/Profético', testamento: 'AT' },
    { nome: 'Ezequiel', abrev: 'Ezq', nomeEn: 'Ezekiel', nomeHeb: 'יְחֶזְקֵאל', slug: 'ezq', ordemTest: 26, ordemGeral: 26, capitulos: 48, autor: 'Ezequiel', data: '~593-571 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Daniel', abrev: 'Dn', nomeEn: 'Daniel', nomeHeb: 'דָּנִיֵּאל', slug: 'dn', ordemTest: 27, ordemGeral: 27, capitulos: 12, autor: 'Daniel', data: '~605-535 a.C.', genero: 'Profético/Apocalíptico', testamento: 'AT' },
    // Proféticos menores (28-39)
    { nome: 'Oséias', abrev: 'Os', nomeEn: 'Hosea', nomeHeb: 'הוֹשֵׁעַ', slug: 'os', ordemTest: 28, ordemGeral: 28, capitulos: 14, autor: 'Oséias', data: '~750-715 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Joel', abrev: 'Jl', nomeEn: 'Joel', nomeHeb: 'יוֹאֵל', slug: 'jl', ordemTest: 29, ordemGeral: 29, capitulos: 3, autor: 'Joel', data: '~835-796 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Amós', abrev: 'Am', nomeEn: 'Amos', nomeHeb: 'עָמוֹס', slug: 'am', ordemTest: 30, ordemGeral: 30, capitulos: 9, autor: 'Amós', data: '~760-750 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Obadias', abrev: 'Ob', nomeEn: 'Obadiah', nomeHeb: 'עֹבַדְיָה', slug: 'ob', ordemTest: 31, ordemGeral: 31, capitulos: 1, autor: 'Obadias', data: '~586 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Jonas', abrev: 'Jn', nomeEn: 'Jonah', nomeHeb: 'יוֹנָה', slug: 'jn', ordemTest: 32, ordemGeral: 32, capitulos: 4, autor: 'Jonas', data: '~780 a.C.', genero: 'Narrativo/Profético', testamento: 'AT' },
    { nome: 'Miquéias', abrev: 'Mi', nomeEn: 'Micah', nomeHeb: 'מִיכָה', slug: 'mi', ordemTest: 33, ordemGeral: 33, capitulos: 7, autor: 'Miquéias', data: '~735-700 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Naum', abrev: 'Na', nomeEn: 'Nahum', nomeHeb: 'נַחוּם', slug: 'na', ordemTest: 34, ordemGeral: 34, capitulos: 3, autor: 'Naum', data: '~663-612 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Habacuque', abrev: 'Hb', nomeEn: 'Habakkuk', nomeHeb: 'חֲבַקּוּק', slug: 'hb', ordemTest: 35, ordemGeral: 35, capitulos: 3, autor: 'Habacuque', data: '~627-605 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Sofonias', abrev: 'Sf', nomeEn: 'Zephaniah', nomeHeb: 'צְפַנְיָה', slug: 'sf', ordemTest: 36, ordemGeral: 36, capitulos: 3, autor: 'Sofonias', data: '~640-609 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Ageu', nomeEn: 'Haggai', nomeHeb: 'חַגַּי', abrev: 'Ag', slug: 'ag', ordemTest: 37, ordemGeral: 37, capitulos: 2, autor: 'Ageu', data: '~520 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Zacarias', abrev: 'Zc', nomeEn: 'Zechariah', nomeHeb: 'זְכַרְיָה', slug: 'zc', ordemTest: 38, ordemGeral: 38, capitulos: 14, autor: 'Zacarias', data: '~520-518 a.C.', genero: 'Profético', testamento: 'AT' },
    { nome: 'Malaquias', abrev: 'Ml', nomeEn: 'Malachi', nomeHeb: 'מַלְאָכִי', slug: 'ml', ordemTest: 39, ordemGeral: 39, capitulos: 4, autor: 'Malaquias', data: '~460-430 a.C.', genero: 'Profético', testamento: 'AT' },
    // Evangelhos (40-43)
    { nome: 'Mateus', abrev: 'Mt', nomeEn: 'Matthew', nomeGrego: 'Ματθαῖος', slug: 'mt', ordemTest: 1, ordemGeral: 40, capitulos: 28, autor: 'Mateus', data: '~50-70 d.C.', genero: 'Evangelho', testamento: 'NT' },
    { nome: 'Marcos', abrev: 'Mc', nomeEn: 'Mark', nomeGrego: 'Μᾶρκος', slug: 'mc', ordemTest: 2, ordemGeral: 41, capitulos: 16, autor: 'Marcos', data: '~55-65 d.C.', genero: 'Evangelho', testamento: 'NT' },
    { nome: 'Lucas', abrev: 'Lc', nomeEn: 'Luke', nomeGrego: 'Λουκᾶς', slug: 'lc', ordemTest: 3, ordemGeral: 42, capitulos: 24, autor: 'Lucas', data: '~60-80 d.C.', genero: 'Evangelho', testamento: 'NT' },
    { nome: 'João', abrev: 'Jo', nomeEn: 'John', nomeGrego: 'Ἰωάννης', slug: 'jo', ordemTest: 4, ordemGeral: 43, capitulos: 21, autor: 'João', data: '~85-95 d.C.', genero: 'Evangelho', testamento: 'NT' },
    // Histórico NT (44)
    { nome: 'Atos', abrev: 'At', nomeEn: 'Acts', nomeGrego: 'Πράξεις', slug: 'at', ordemTest: 5, ordemGeral: 44, capitulos: 28, autor: 'Lucas', data: '~62-80 d.C.', genero: 'Narrativo/Histórico', testamento: 'NT' },
    // Epístolas paulinas (45-57)
    { nome: 'Romanos', abrev: 'Rm', nomeEn: 'Romans', nomeGrego: 'Ῥωμαίους', slug: 'rm', ordemTest: 6, ordemGeral: 45, capitulos: 16, autor: 'Paulo', data: '~57 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '1 Coríntios', abrev: '1Co', nomeEn: '1 Corinthians', nomeGrego: 'Κορινθίους', slug: '1co', ordemTest: 7, ordemGeral: 46, capitulos: 16, autor: 'Paulo', data: '~55 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '2 Coríntios', abrev: '2Co', nomeEn: '2 Corinthians', nomeGrego: 'Κορινθίους', slug: '2co', ordemTest: 8, ordemGeral: 47, capitulos: 13, autor: 'Paulo', data: '~55-56 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Gálatas', abrev: 'Gl', nomeEn: 'Galatians', nomeGrego: 'Γαλάτας', slug: 'gl', ordemTest: 9, ordemGeral: 48, capitulos: 6, autor: 'Paulo', data: '~49 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Efésios', abrev: 'Ef', nomeEn: 'Ephesians', nomeGrego: 'Ἐφεσίους', slug: 'ef', ordemTest: 10, ordemGeral: 49, capitulos: 6, autor: 'Paulo', data: '~60-62 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Filipenses', abrev: 'Fp', nomeEn: 'Philippians', nomeGrego: 'Φιλιππησίους', slug: 'fp', ordemTest: 11, ordemGeral: 50, capitulos: 4, autor: 'Paulo', data: '~60-62 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Colossenses', abrev: 'Cl', nomeEn: 'Colossians', nomeGrego: 'Κολοσσαεῖς', slug: 'cl', ordemTest: 12, ordemGeral: 51, capitulos: 4, autor: 'Paulo', data: '~60-62 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '1 Tessalonicenses', abrev: '1Ts', nomeEn: '1 Thessalonians', nomeGrego: 'Θεσσαλονικέων', slug: '1ts', ordemTest: 13, ordemGeral: 52, capitulos: 5, autor: 'Paulo', data: '~51 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '2 Tessalonicenses', abrev: '2Ts', nomeEn: '2 Thessalonians', nomeGrego: 'Θεσσαλονικέων', slug: '2ts', ordemTest: 14, ordemGeral: 53, capitulos: 3, autor: 'Paulo', data: '~52 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '1 Timóteo', abrev: '1Tm', nomeEn: '1 Timothy', nomeGrego: 'Τιμοθέου', slug: '1tm', ordemTest: 15, ordemGeral: 54, capitulos: 6, autor: 'Paulo', data: '~62-65 d.C.', genero: 'Epístola Pastoral', testamento: 'NT' },
    { nome: '2 Timóteo', abrev: '2Tm', nomeEn: '2 Timothy', nomeGrego: 'Τιμοθέου', slug: '2tm', ordemTest: 16, ordemGeral: 55, capitulos: 4, autor: 'Paulo', data: '~66-67 d.C.', genero: 'Epístola Pastoral', testamento: 'NT' },
    { nome: 'Tito', abrev: 'Tt', nomeEn: 'Titus', nomeGrego: 'Τίτου', slug: 'tt', ordemTest: 17, ordemGeral: 56, capitulos: 3, autor: 'Paulo', data: '~62-65 d.C.', genero: 'Epístola Pastoral', testamento: 'NT' },
    { nome: 'Filemom', abrev: 'Fm', nomeEn: 'Philemon', nomeGrego: 'Φιλήμονος', slug: 'fm', ordemTest: 18, ordemGeral: 57, capitulos: 1, autor: 'Paulo', data: '~60-62 d.C.', genero: 'Epístola', testamento: 'NT' },
    // Epístolas gerais (58-65)
    { nome: 'Hebreus', abrev: 'Hb', nomeEn: 'Hebrews', nomeGrego: 'Ἑβραίους', slug: 'hb-nt', ordemTest: 19, ordemGeral: 58, capitulos: 13, autor: 'Desconhecido', data: '~60-70 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Tiago', abrev: 'Tg', nomeEn: 'James', nomeGrego: 'Ἰακώβου', slug: 'tg', ordemTest: 20, ordemGeral: 59, capitulos: 5, autor: 'Tiago', data: '~45-50 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '1 Pedro', abrev: '1Pe', nomeEn: '1 Peter', nomeGrego: 'Πέτρου', slug: '1pe', ordemTest: 21, ordemGeral: 60, capitulos: 5, autor: 'Pedro', data: '~62-64 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '2 Pedro', abrev: '2Pe', nomeEn: '2 Peter', nomeGrego: 'Πέτρου', slug: '2pe', ordemTest: 22, ordemGeral: 61, capitulos: 3, autor: 'Pedro', data: '~65-68 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '1 João', abrev: '1Jo', nomeEn: '1 John', nomeGrego: 'Ἰωάννου', slug: '1jo', ordemTest: 23, ordemGeral: 62, capitulos: 5, autor: 'João', data: '~85-95 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '2 João', abrev: '2Jo', nomeEn: '2 John', nomeGrego: 'Ἰωάννου', slug: '2jo', ordemTest: 24, ordemGeral: 63, capitulos: 1, autor: 'João', data: '~85-95 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: '3 João', abrev: '3Jo', nomeEn: '3 John', nomeGrego: 'Ἰωάννου', slug: '3jo', ordemTest: 25, ordemGeral: 64, capitulos: 1, autor: 'João', data: '~85-95 d.C.', genero: 'Epístola', testamento: 'NT' },
    { nome: 'Judas', abrev: 'Jd', nomeEn: 'Jude', nomeGrego: 'Ἰούδα', slug: 'jd', ordemTest: 26, ordemGeral: 65, capitulos: 1, autor: 'Judas', data: '~65-80 d.C.', genero: 'Epístola', testamento: 'NT' },
    // Apocalipse (66)
    { nome: 'Apocalipse', abrev: 'Ap', nomeEn: 'Revelation', nomeGrego: 'Ἀποκάλυψις', slug: 'ap', ordemTest: 27, ordemGeral: 66, capitulos: 22, autor: 'João', data: '~95 d.C.', genero: 'Apocalíptico/Profético', testamento: 'NT' },
  ];

  const livroIds: Record<string, string> = {};
  try {
    for (const l of livros) {
      const existing = await q(`SELECT id FROM "livros" WHERE slug = $1`, [l.slug]);
      if (existing.length > 0) {
        livroIds[l.slug] = existing[0].id;
        continue;
      }
      const tid = l.testamento === 'AT' ? atId : ntId;
      const r = (await q(
        `INSERT INTO "livros" ("nome","nome_abreviado","nome_ingles","nome_hebraico","nome_grego","slug","ordem_testamento","ordem_geral","total_capitulos","autor","data_escrita","genero_literario","testamento_id")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,
        [l.nome, l.abrev, l.nomeEn, l.nomeHeb || null, l.nomeGrego || null, l.slug, l.ordemTest, l.ordemGeral, l.capitulos, l.autor || null, l.data || null, l.genero || null, tid],
      ))[0];
      livroIds[l.slug] = r.id;
    }
    log('3/12', `Livros OK (${Object.keys(livroIds).length} livros)`);
  } catch (e) {
    log('3/12', `ERRO ao criar livros: ${e}`);
    throw e;
  }

  // ============================================================
  // 4. CAPÍTULOS (somente para livros-chave)
  // ============================================================
  log('4/12', 'Verificando/Criando capítulos para livros-chave...');
  const capitulosChave: Record<string, number> = { gn: 50, ex: 40, sl: 150, is: 66, mt: 28, jo: 21, rm: 16 };
  const capituloIds: Record<string, string> = {};
  try {
    for (const [slug, total] of Object.entries(capitulosChave)) {
      const existingCount = await q(`SELECT COUNT(*) as cnt FROM "capitulos" WHERE "livro_id" = $1`, [livroIds[slug]]);
      if (parseInt(existingCount[0].cnt) > 0) {
        log('4/12', `Capítulos para ${slug} já existem, pulando...`);
        const existingCaps = await q(`SELECT id, "numero" FROM "capitulos" WHERE "livro_id" = $1 ORDER BY "numero"`, [livroIds[slug]]);
        for (const ec of existingCaps) {
          capituloIds[`${slug}_${ec.numero}`] = ec.id;
        }
        continue;
      }
      for (let i = 1; i <= total; i++) {
        const r = (await q(
          `INSERT INTO "capitulos" ("numero","total_versiculos","livro_id") VALUES ($1,0,$2) RETURNING id`,
          [i, livroIds[slug]],
        ))[0];
        capituloIds[`${slug}_${i}`] = r.id;
      }
    }
    log('4/12', `Capítulos OK (${Object.keys(capituloIds).length} capítulos)`);
  } catch (e) {
    log('4/12', `ERRO ao criar capítulos: ${e}`);
    throw e;
  }

  // ============================================================
  // 5. VERSÍCULOS (10+ por livro-chave, usando ARC como tradução principal)
  // ============================================================
  log('5/12', 'Verificando/Criando versículos de exemplo...');
  const arcId = traducaoIds['ARC'];
  const nviId = traducaoIds['NVI'];
  const kvjId = traducaoIds['KJV'];

  interface VersiculoExemplo {
    livro: string; cap: number; num: number; texto: string; textoEn?: string;
  }
  const versiculosExemplo: VersiculoExemplo[] = [
    // Gênesis
    { livro: 'gn', cap: 1, num: 1, texto: 'No princípio criou Deus os céus e a terra.' },
    { livro: 'gn', cap: 1, num: 3, texto: 'E disse Deus: Haja luz; e houve luz.' },
    { livro: 'gn', cap: 1, num: 26, texto: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine ele sobre os peixes do mar, sobre as aves dos céus, sobre os gado, sobre toda a terra, e sobre todo réptil que se arraste sobre a terra.' },
    { livro: 'gn', cap: 1, num: 27, texto: 'Criou, pois, Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.' },
    { livro: 'gn', cap: 2, num: 7, texto: 'Então formou o Senhor Deus o homem do pó da terra, e soprou em suas narinas o fôlego de vida; e o homem tornou-se alma vivente.' },
    { livro: 'gn', cap: 3, num: 15, texto: 'Porei inimizade entre ti e a mulher, entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.' },
    { livro: 'gn', cap: 12, num: 1, texto: 'Disse o Senhor a Abrão: Vai-te da tua terra, da tua parentela, e da casa de teu pai, para a terra que eu te mostrarei.' },
    { livro: 'gn', cap: 15, num: 6, texto: 'E creu Abrão no Senhor, e lhe foi isso imputado para justiça.' },
    { livro: 'gn', cap: 22, num: 14, texto: 'E Abraão chamou àquele lugar Jeová-jiré; como se diz até hoje: No monte do Senhor se proveerá.' },
    { livro: 'gn', cap: 50, num: 20, texto: 'Vós pensastes mal contra mim; mas Deus o tornou em bem, para que se cumprisse, como está acontecendo hoje, para manter em vida um povo numeroso.' },
    // Êxodo
    { livro: 'ex', cap: 3, num: 14, texto: 'Disse Deus a Moisés: EU SOU O QUE SOU. E disse: Assim dirás aos filhos de Israel: EU SOU me enviou a vós.' },
    { livro: 'ex', cap: 14, num: 13, texto: 'Disse Moisés ao povo: Não temais; estai quietos, e vede o livramento do Senhor, que hoje fará convosco.' },
    { livro: 'ex', cap: 20, num: 3, texto: 'Não terás outros deuses diante de mim.' },
    { livro: 'ex', cap: 20, num: 7, texto: 'Não tomarás o nome do Senhor teu Deus em vão.' },
    { livro: 'ex', cap: 20, num: 12, texto: 'Honra teu pai e tua mãe, para que se prolonguem os teus dias na terra que o Senhor teu Deus te dá.' },
    { livro: 'ex', cap: 31, num: 18, texto: 'E quando o Senhor houve acabado de falar a Moisés no monte Sinai, deu-lhe as duas tábuas do testemunho, tábuas de pedra, escritas com o dedo de Deus.' },
    { livro: 'ex', cap: 33, num: 14, texto: 'E ele disse: A minha presença irá contigo, e eu te darei descanso.' },
    { livro: 'ex', cap: 34, num: 6, texto: 'E o Senhor passou diante dele, e proclamou: Senhor, Senhor, Deus misericordioso e compassivo, longânimo, e de grande bondade e verdade.' },
    { livro: 'ex', cap: 34, num: 7, texto: 'Guardando a misericórdia para milhares, perdoando a iniquidade, a transgressão e o pecado, mas de maneira nenhuma deixando o culpado impune.' },
    { livro: 'ex', cap: 40, num: 34, texto: 'Então a nuvem cobriu o tabernáculo de assembleia, e a glória do Senhor encheu o tabernáculo.' },
    // Salmos
    { livro: 'sl', cap: 1, num: 1, texto: 'Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores.' },
    { livro: 'sl', cap: 1, num: 2, texto: 'Mas a sua delícia está na lei do Senhor, e na sua lei medita dia e noite.' },
    { livro: 'sl', cap: 22, num: 1, texto: 'Deus meu, Deus meu, por que me desamparaste? Por que estás tão longe do meu socorro, e das palavras do meu bramido?' },
    { livro: 'sl', cap: 22, num: 3, texto: 'Tu, porém, és o Santo, assentado nos louvores de Israel.' },
    { livro: 'sl', cap: 23, num: 1, texto: 'O Senhor é o meu pastor; nada me faltará.' },
    { livro: 'sl', cap: 23, num: 4, texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
    { livro: 'sl', cap: 46, num: 1, texto: 'Deus é o nosso refúgio e fortaleza, um auxílio muito presente nas aflições.' },
    { livro: 'sl', cap: 51, num: 10, texto: 'Cria em mim, ó Deus, um coração puro, e renova em mim um espírito reto.' },
    { livro: 'sl', cap: 91, num: 1, texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
    { livro: 'sl', cap: 119, num: 105, texto: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
    // Isaías
    { livro: 'is', cap: 7, num: 14, texto: 'Portanto, o próprio Senhor vos dará um sinal: Eis que a virgem conceberá e dará à luz um filho, e o chamará Emanuel.' },
    { livro: 'is', cap: 9, num: 6, texto: 'Porque um menino nos nasceu, um filho se nos deu, e o principado está sobre os seus ombros; e se chamará seu nome Conselheiro, Deus Forte, Pai eterno, Príncipe da paz.' },
    { livro: 'is', cap: 40, num: 31, texto: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.' },
    { livro: 'is', cap: 53, num: 4, texto: 'Certamente, ele tomou sobre si as nossas enfermidades, e carregou as nossas dores; nós, porém, o reputávamos por aflito, ferido de Deus e oprimido.' },
    { livro: 'is', cap: 53, num: 5, texto: 'Mas ele foi ferido pelas nossas transgressões, e moido pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos curados.' },
    { livro: 'is', cap: 53, num: 6, texto: 'Todos nós andávamos desgarrados como ovelhas; cada um se desviava pelo seu caminho; mas o Senhor fez cair sobre ele a iniquidade de todos nós.' },
    { livro: 'is', cap: 55, num: 8, texto: 'Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos são os meus caminhos, diz o Senhor.' },
    { livro: 'is', cap: 55, num: 9, texto: 'Porque, assim como os céus são mais altos que a terra, assim são os meus caminhos mais altos do que os vossos caminhos, e os meus pensamentos mais altos do que os vossos pensamentos.' },
    { livro: 'is', cap: 56, num: 1, texto: 'Assim diz o Senhor: Guardai a justiça, e fazei justiça; porque a minha salvação está para breve, e a minha justiça para ser revelada.' },
    { livro: 'is', cap: 61, num: 1, texto: 'O Espírito do Senhor Deus está sobre mim; porque o Senhor me ungiu para evangelizar os mansos; enviou-me para curar os de coração quebrantado, para proclamar libertação aos cativos, e aos presos abertura das prisões.' },
    // Mateus
    { livro: 'mt', cap: 1, num: 21, texto: 'Ela dará à luz um filho, e tu lhe pôrás o nome Jesus, porque ele salvará o seu povo dos seus pecados.' },
    { livro: 'mt', cap: 5, num: 3, texto: 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.' },
    { livro: 'mt', cap: 5, num: 9, texto: 'Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.' },
    { livro: 'mt', cap: 6, num: 33, texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
    { livro: 'mt', cap: 11, num: 28, texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
    { livro: 'mt', cap: 22, num: 37, texto: 'Jesus disse-lhe: Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma, e de todo o teu entendimento.' },
    { livro: 'mt', cap: 28, num: 19, texto: 'Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.' },
    { livro: 'mt', cap: 28, num: 20, texto: 'Ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que eu convosco sou todos os dias, até a consumação do século. Amém.' },
    { livro: 'mt', cap: 16, num: 16, texto: 'Respondeu Simão Pedro: Tu és o Cristo, o Filho do Deus vivente.' },
    { livro: 'mt', cap: 16, num: 18, texto: 'Eu também te digo que tu és Pedro, e sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.' },
    // João
    { livro: 'jo', cap: 1, num: 1, texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
    { livro: 'jo', cap: 1, num: 14, texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a do unigênito do Pai, cheio de graça e de verdade.' },
    { livro: 'jo', cap: 3, num: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
    { livro: 'jo', cap: 3, num: 17, texto: 'Porque Deus enviou o seu Filho ao mundo, não para que julgasse o mundo, mas para que o mundo fosse salvo por ele.' },
    { livro: 'jo', cap: 8, num: 12, texto: 'Tornou-lhes Jesus, e disse: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.' },
    { livro: 'jo', cap: 10, num: 10, texto: 'O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida, e a tenham com abundância.' },
    { livro: 'jo', cap: 11, num: 25, texto: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
    { livro: 'jo', cap: 14, num: 6, texto: 'Jesus disse-lhe: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.' },
    { livro: 'jo', cap: 14, num: 27, texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.' },
    { livro: 'jo', cap: 15, num: 5, texto: 'Eu sou a vide, vós as varas. Quer habita em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.' },
    // Romanos
    { livro: 'rm', cap: 1, num: 16, texto: 'Porque não me envergonho do evangelho, porque é o poder de Deus para salvação de todo aquele que crê, primeiro do judeu, e também do grego.' },
    { livro: 'rm', cap: 3, num: 10, texto: 'Como está escrito: Não há um justo, nem um sequer.' },
    { livro: 'rm', cap: 3, num: 23, texto: 'Porque todos pecaram e estão destituídos da glória de Deus.' },
    { livro: 'rm', cap: 5, num: 8, texto: 'Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.' },
    { livro: 'rm', cap: 6, num: 23, texto: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.' },
    { livro: 'rm', cap: 8, num: 1, texto: 'Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.' },
    { livro: 'rm', cap: 8, num: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu desígnio.' },
    { livro: 'rm', cap: 8, num: 38, texto: 'Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem os poderes, nem o presente, nem o porvir.' },
    { livro: 'rm', cap: 10, num: 9, texto: 'Se, portanto, confessares com a tua boca o Senhor Jesus, e creres no teu coração que Deus o ressuscitou dos mortos, serás salvo.' },
    { livro: 'rm', cap: 12, num: 2, texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus.' },
  ];

  // Para cada versículo, inserir na ARC e NIR
  try {
    const existingVersiculos = await q(`SELECT COUNT(*) as cnt FROM "versiculos"`);
    if (parseInt(existingVersiculos[0].cnt) > 0) {
      log('5/12', 'Versículos já existem, pulando...');
    } else {
      for (const v of versiculosExemplo) {
        const livroId = livroIds[v.livro];
        const capId = capituloIds[`${v.livro}_${v.cap}`];
        for (const [sigla, tid] of Object.entries(traducaoIds)) {
          if (sigla === 'ARC' || sigla === 'NVI' || sigla === 'KJV') {
            const texto = sigla === 'KJV' && v.textoEn ? v.textoEn : v.texto;
            await q(
              `INSERT INTO "versiculos" ("numero","texto","livro_id","capitulo_id","capitulo_numero","traducao_id","testamento_id")
               VALUES ($1,$2,$3,$4,$5,$6,$7)`,
              [v.num, texto, livroId, capId, v.cap, tid, v.livro.startsWith('mt') || v.livro.startsWith('jo') || v.livro.startsWith('rm') ? ntId : atId],
            );
          }
        }
      }
    }
    log('5/12', 'Versículos OK');
  } catch (e) {
    log('5/12', `ERRO ao criar versículos: ${e}`);
    throw e;
  }

  // ============================================================
  // 6. CATEGORIAS DE DOUTRINA
  // ============================================================
  log('6/12', 'Verificando/Criando categorias de doutrina...');
  const catIds: Record<string, string> = {};
  const categorias = [
    ['Teologia Proper', 'teologia-proper', 'Doutrinas sobre Deus', 1],
    ['Cristologia', 'cristologia', 'Doutrinas sobre Cristo', 2],
    ['Pneumatologia', 'pneumatologia', 'Doutrinas sobre o Espírito Santo', 3],
    ['Soteriologia', 'soteriologia', 'Doutrinas sobre salvação', 4],
    ['Eclesiologia', 'eclesiologia', 'Doutrinas sobre a igreja', 5],
    ['Escatologia', 'escatologia', 'Doutrinas sobre as últimas coisas', 6],
    ['Antropologia Teológica', 'antropologia-teologica', 'Doutrinas sobre o homem', 7],
    ['Bibliologia', 'bibliologia', 'Doutrinas sobre as Escrituras', 8],
  ];
  try {
    for (const c of categorias) {
      const existing = await q(`SELECT id FROM "categorias_doutrina" WHERE slug = $1`, [c[1]]);
      if (existing.length > 0) {
        catIds[c[1]] = existing[0].id;
      } else {
        const r = (await q(`INSERT INTO "categorias_doutrina" ("nome","slug","descricao","ordem") VALUES ($1,$2,$3,$4) RETURNING id`, c))[0];
        catIds[c[1]] = r.id;
      }
    }
    log('6/12', `Categorias de doutrina OK (${Object.keys(catIds).length} categorias)`);
  } catch (e) {
    log('6/12', `ERRO ao criar categorias: ${e}`);
    throw e;
  }

  // ============================================================
  // 7. DOUTRINAS (20 principais)
  // ============================================================
  log('7/12', 'Verificando/Criando doutrinas...');
  const doutrinas = [
    ['Unicidade de Deus', 'unicidade-deus', 'Deus é um único ser em três pessoas: Pai, Filho e Espírito Santo.', 'Deuteronômio 6:4; Mateus 28:19', 'teologia-proper'],
    ['Trindade', 'trindade', 'Deus existe eternamente em três pessoas co-iguais: Pai, Filho e Espírito Santo.', 'Mateus 28:19; 2 Coríntios 13:14', 'teologia-proper'],
    ['Soberania de Deus', 'soberania-deus', 'Deus tem domínio absoluto sobre todas as coisas.', 'Salmo 103:19; Efésios 1:11', 'teologia-proper'],
    ['Divindade de Cristo', 'divindade-cristo', 'Jesus Cristo é plenamente Deus e plenamente homem.', 'João 1:1; Colossenses 2:9', 'cristologia'],
    ['Encarnação', 'encarnacao', 'O Verbo se fez carne e habitou entre nós.', 'João 1:14; Filipenses 2:6-8', 'cristologia'],
    ['Ressurreição de Cristo', 'ressurreicao-cristo', 'Cristo ressuscitou corporalmente dos mortos no terceiro dia.', '1 Coríntios 15:3-4; Mateus 28:5-6', 'cristologia'],
    ['Salvação pela Graça', 'salvacao-pela-graca', 'Somos salvos pela graça de Deus, mediante a fé, não por obras.', 'Efésios 2:8-9; Romanos 11:6', 'soteriologia'],
    ['Justificação pela Fé', 'justificacao-pela-fe', 'O homem é declarado justo diante de Deus pela fé em Cristo.', 'Romanos 3:28; Gálatas 2:16', 'soteriologia'],
    ['Expiação Substitutiva', 'expiacao-substitutiva', 'Cristo morreu em nosso lugar, pagando o preço do pecado.', '1 Pedro 2:24; Isaías 53:5-6', 'soteriologia'],
    ['Regeneração', 'regeneracao', 'O homem precisa de um novo nascimento espiritual obra do Espírito Santo.', 'João 3:3-7; Tito 3:5', 'soteriologia'],
    ['Perseverança dos Santos', 'perseveranca-santos', 'Os verdadeiramente salvos perseverarão até o fim.', 'João 10:28-29; Romanos 8:38-39', 'soteriologia'],
    ['Igreja', 'igreja', 'A igreja é o corpo de Cristo, composta por todos os crentes.', 'Efésios 1:22-23; Colossenses 1:18', 'eclesiologia'],
    ['Batismo', 'batismo', 'Sinal exterior da fé interior, identificação com a morte e ressurreição de Cristo.', 'Romanos 6:3-4; Mateus 28:19', 'eclesiologia'],
    ['Ceia do Senhor', 'ceia-senhor', 'Memorial da morte de Cristo até que ele venha.', '1 Coríntios 11:23-26', 'eclesiologia'],
    ['Ressurreição dos Mortos', 'ressurreicao-mortos', 'Todos os mortos serão ressuscitados para julgamento.', '1 Coríntios 15:52; João 5:28-29', 'escatologia'],
    ['Segunda Vinda de Cristo', 'segunda-vinda', 'Cristo voltará em glória para julgar os vivos e os mortos.', 'Atos 1:11; 1 Tessalonicenses 4:16-17', 'escatologia'],
    ['Juízo Final', 'juizo-final', 'Haverá um julgamento final de todos os homens.', 'Mateus 25:31-46; Apocalipse 20:11-15', 'escatologia'],
    ['Inerrância Bíblica', 'inerrancia-biblica', 'As Escrituras são infalíveis e sem erro no original.', '2 Timóteo 3:16; 2 Pedro 1:20-21', 'bibliologia'],
    ['Inspiração Bíblica', 'inspiracao-biblica', 'As Escrituras foram inspiradas por Deus.', '2 Timóteo 3:16; 2 Pedro 1:21', 'bibliologia'],
    ['Natureza Humana', 'natureza-humana', 'O homem foi criado à imagem de Deus, mas caiu em pecado.', 'Gênesis 1:27; Romanos 3:23', 'antropologia-teologica'],
  ];
  const doutrinaIds: string[] = [];
  try {
    for (const d of doutrinas) {
      const existing = await q(`SELECT id FROM "doutrinas" WHERE slug = $1`, [d[1]]);
      if (existing.length > 0) {
        doutrinaIds.push(existing[0].id);
      } else {
        const r = (await q(
          `INSERT INTO "doutrinas" ("nome","slug","definicao","base_scriptura","categoria_id") VALUES ($1,$2,$3,$4,$5) RETURNING id`,
          [...d, catIds[d[4]]],
        ))[0];
        doutrinaIds.push(r.id);
      }
    }
    log('7/12', `Doutrinas OK (${doutrinaIds.length} doutrinas)`);
  } catch (e) {
    log('7/12', `ERRO ao criar doutrinas: ${e}`);
    throw e;
  }

  // ============================================================
  // 8. PERSONAGENS (10 principais)
  // ============================================================
  log('8/12', 'Verificando/Criando personagens...');
  const personagens = [
    ['Abraão', 'אַבְרָהָם', 'Ἀβραάμ', 'abraao', 'Pai da fé. Deixou Ur e obedeceu a Deus.', 'Amigo de Deus', 'Gn 12-25', 312, 'Gênesis 12:1', 'Pai de muitas nações. Tipologia de fé e obediência.'],
    ['Moisés', 'מֹשֶׁה', 'Μωϋσῆς', 'moises', 'Libertador de Israel. Recebeu a Lei no Sinai.', 'Salvador do povo', 'Ex 2- Dt 34', 845, 'Êxodo 2-3', 'Tipologia de Cristo como mediador e libertador.'],
    ['Davi', 'דָּוִד', 'Δαυίδ', 'davi', 'Rei de Israel. Homem segundo o coração de Deus.', 'Rei e poeta', '1 Sm 16 - 1 Rc 2', 1138, '1 Samuel 16:1', 'Antecessor messiânico. Linhagem de Cristo.'],
    ['Salomão', 'שְׁלֹמֹה', 'Σολομών', 'salomao', 'Filho de Davi. Construiu o templo. Sábio e rei.', 'Rei sábio', '1 Rc 1-11', 289, '1 Reis 3', 'Tipologia de Cristo como Rei de paz e sabedoria.'],
    ['Pedro', 'כֵּיפָא', 'Πέτρος', 'pedro', 'Apóstolo líder. Primeiro a confessar Cristo.', 'Apóstolo', 'Mt 16 - At 12', 374, 'Mateus 16:16', 'Líder da igreja primitiva. Exemplo de fé e queda.'],
    ['Paulo', 'שָׁאוּל', 'Παῦλος', 'paulo', 'Apóstolo dos gentios. Autor de 13 epístolas.', 'Missionário', 'At 7-28', 1023, 'Atos 7:58', 'Missionário por excelência. Teólogo do NT.'],
    ['Maria', 'מִרְיָם', 'Μαρίμ', 'maria', 'Mãe de Jesus. Modelo de fé e obediência.', 'Mãe de Jesus', 'Lc 1-2', 193, 'Lucas 1:26-38', 'Tipologia de obediência. Mãe do Messias.'],
    ['José (pai de Jesus)', 'יוֹסֵף', 'Ἰωσήφ', 'jose-pai', 'Marido de Maria. Carpinteiro justo.', 'Carpinteiro', 'Mt 1-2', 44, 'Mateus 1:16', 'Homem justo que obedeceu a Deus. Guardião de Jesus.'],
    ['José (filho de Jacó)', 'יוֹסֵף', 'Ἰωσήφ', 'jose-ot', 'Vendido pelos irmãos. Governador do Egito.', 'Governador', 'Gn 37-50', 235, 'Gênesis 37:2', 'Tipologia de Cristo como rejeitado e exaltado.'],
    ['Elias', 'אֵלִיָּה', 'Ἠλίας', 'elias', 'Profeta que desafiou Baal. Foi arrebatado.', 'Profeta', '1 Rc 17 - 2 Rc 2', 107, '1 Reis 17:1', 'Representante dos profetas. Tipologia de Cristo.'],
  ];
  const personagemIds: string[] = [];
  try {
    for (const p of personagens) {
      const existing = await q(`SELECT id FROM "personagens" WHERE slug = $1`, [p[3]]);
      if (existing.length > 0) {
        personagemIds.push(existing[0].id);
      } else {
        const r = (await q(
          `INSERT INTO "personagens" ("nome_portugues","nome_hebraico","nome_grego","slug","biografia","significado_nome","ultima_mençao","total_mencoes","primeira_mencao","significado_teologico")
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
          p,
        ))[0];
        personagemIds.push(r.id);
      }
    }
    log('8/12', `Personagens OK (${personagemIds.length} personagens)`);
  } catch (e) {
    log('8/12', `ERRO ao criar personagens: ${e}`);
    throw e;
  }

  // ============================================================
  // 9. LOCALIZAÇÕES BÍBLICAS (20)
  // ============================================================
  log('9/12', 'Verificando/Criando localizações bíblicas...');
  const localizacoes = [
    ['Jerusalém', 'יְרוּשָׁלַיִם', 'Ἱερουσαλήμ', 'jerusalem', 'cidade', 31.7683, 35.2137, 'Judá', 'Israel', 'Capital espiritual de Israel. Local do templo.'],
    ['Belém', 'בֵּית לֶחֶם', 'Βηθλέεμ', 'belem', 'cidade', 31.7049, 35.2078, 'Judá', 'Israel', 'Cidade natal de Davi e de Jesus.'],
    ['Nazarete', 'נָצְרַת', 'Ναζαρέτ', 'nazarete', 'cidade', 32.7021, 35.2979, 'Galileia', 'Israel', 'Onde Jesus cresceu.'],
    ['Capernáum', 'כְּפַר נַחוּם', 'Καφαρναούμ', 'capernaum', 'cidade', 32.8356, 35.5773, 'Galileia', 'Israel', 'Centro do ministério de Jesus na Galileia.'],
    ['Betânia', 'בֵּית עַנְיָ', 'Βηθανία', 'betania', 'aldeia', 31.7722, 35.2661, 'Judá', 'Israel', 'Onde Jesus ressuscitou Lázaro.'],
    ['Engedi', 'עֵין גֶּדִי', 'Ἰνγάδδι', 'engedi', 'oásis', 31.4542, 35.3883, 'Judá', 'Israel', 'Onde Davi escondeu-se de Saul.'],
    ['Siquém', 'שְׁכֶם', 'Συχέμ', 'siquem', 'cidade', 32.2068, 35.2839, 'Efraim', 'Israel', 'Onde Deus apareceu a Abraão. Centro samaritano.'],
    ['Hebron', 'חֶבְרוֹן', 'Χεβρών', 'hebron', 'cidade', 31.5288, 35.0971, 'Judá', 'Israel', 'Onde Abraão comprou o campo de Machpela.'],
    ['Jericó', 'יְרִיחוֹ', 'Ἱεριχώ', 'jerico', 'cidade', 31.8714, 35.4463, 'Judá', 'Israel', 'Primeira cidade conquistada na Terra Prometida.'],
    ['Ninive', 'נִינְוֵה', 'Νινευή', 'ninive', 'cidade', 36.3489, 43.1528, 'Assíria', 'Iraque', 'Capital da Assíria. Jonas pregou lá.'],
    ['Babilônia', 'בָּבֶל', 'Βαβυλών', 'babilonia', 'império', 32.5363, 44.4209, 'Mesopotâmia', 'Iraque', 'Império que destruiu Jerusalém. Símbolo de pecado.'],
    ['Roma', 'רוֹמָ', 'Ῥώμη', 'roma', 'cidade', 41.9028, 12.4964, 'Itália', 'Itália', 'Capital do império romano. Centro da igreja primitiva.'],
    ['Antioquia', 'אַנְטִיּוּכְיָ', 'Ἀντιόχεια', 'antioquia', 'cidade', 36.2, 36.15, 'Síria', 'Turquia', 'Centro missionário. De onde Paulo saiu.'],
    ['Éfeso', 'אֶפֶס', 'Ἔφεσος', 'efeso', 'cidade', 37.9411, 27.3417, 'Ásia Menor', 'Turquia', 'Destino da 3ª viagem missionária de Paulo.'],
    ['Corinto', 'קוֹרִינְθוֹς', 'Κόρινθος', 'corinto', 'cidade', 37.9085, 22.8786, 'Acaia', 'Grécia', 'Igreja para quem Paulo escreveu 1 e 2 Coríntios.'],
    ['Filipos', 'פִּילִפִּים', 'Φίλιπποι', 'filipos', 'cidade', 41.0136, 24.3085, 'Macedônia', 'Grécia', 'Primeira igreja na Europa.'],
    ['Tessalônica', 'תְּесָלוֹנִיקִי', 'Θεσσαλονίκη', 'tessalonica', 'cidade', 40.6401, 22.9444, 'Macedônia', 'Grécia', 'Igreja para quem Paulo escreveu 1 e 2 Tessalonicenses.'],
    ['Beréia', 'בְּרֵאָה', 'Βέροια', 'bereia', 'cidade', 40.5862, 22.2617, 'Macedônia', 'Grécia', 'Comunidade que examinava as Escrituras.'],
    ['Creta', 'כְּרֵתִי', 'Κρήτη', 'creta', 'ilha', 35.2401, 24.4693, 'Creta', 'Grécia', 'Ilha onde Tito organizou igrejas.'],
    ['Samaria', 'שֹׁמְרוֹן', 'Σαμάρεια', 'samaria', 'região', 32.28, 35.2, 'Samaria', 'Israel', 'Região entre Judá e Galileia. Samaritanos.'],
  ];
  try {
    for (const l of localizacoes) {
      const existing = await q(`SELECT id FROM "localizacoes" WHERE slug = $1`, [l[3]]);
      if (existing.length > 0) continue;
      await q(
        `INSERT INTO "localizacoes" ("nome_portugues","nome_hebraico","nome_grego","slug","tipo","latitude","longitude","regiao","pais_atual","descricao")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        l,
      );
    }
    log('9/12', `Localizações OK (${localizacoes.length} localizações)`);
  } catch (e) {
    log('9/12', `ERRO ao criar localizações: ${e}`);
    throw e;
  }

  // ============================================================
  // 10. EVENTOS HISTÓRICOS/CRONOLÓGICOS (50)
  // ============================================================
  log('10/12', 'Verificando/Criando eventos cronológicos...');
  const eventos: [string, string, string, string, number, number | null, string, string, string][] = [
    ['Criação do Universo', 'criacao-universo', 'criacao', 'Deus criou os céus e a terra em 6 dias.', -4004, null, 'AC', 'Gênesis 1', 'Adão e Eva'],
    ['Queda do Homem', 'queda-homem', 'pecado', 'Adão e Eva comeram do fruto proibido.', -4004, null, 'AC', 'Gênesis 3', 'Adão, Eva'],
    ['Dilúvio Universal', 'diluvio-universal', 'juizo', 'Deus enviou um dilúvio para destruir a humanidade corrupta.', -2348, null, 'AC', 'Gênesis 6-9', 'Noé'],
    ['Chamado de Abraão', 'chamado-abraao', 'alianca', 'Deus chamou Abraão para ir à terra prometida.', -2091, null, 'AC', 'Gênesis 12', 'Abraão'],
    ['Aliança Abraâmica', 'alianca-abraamica', 'alianca', 'Deus fez aliança eterna com Abraão.', -2081, null, 'AC', 'Gênesis 15', 'Abraão, Deus'],
    ['Isaque Sacrificado', 'isaque-sacrificado', 'tipologia', 'Deus provou Abraão pedindo Isaque em sacrifício.', -2066, null, 'AC', 'Gênesis 22', 'Abraão, Isaque'],
    ['Jacó e o Anjo', 'jaco-anjo', 'luta', 'Jacó lutou com Deus e recebeu o nome de Israel.', -1906, null, 'AC', 'Gênesis 32', 'Jacó'],
    ['Venda de José', 'venda-jose', 'providencia', 'José foi vendido como escravo pelos próprios irmãos.', -1898, null, 'AC', 'Gênesis 37', 'José'],
    ['José no Egito', 'jose-egito', 'providencia', 'José tornou-se governador do Egito.', -1885, -1875, 'AC', 'Gênesis 41', 'José, Faraó'],
    ['Descida ao Egito', 'descida-egito', 'providencia', 'A família de Jacó desceu ao Egito por fome.', -1876, null, 'AC', 'Gênesis 46', 'Jacó, José'],
    ['Nascimento de Moisés', 'nascimento-moises', 'nascimento', 'Moisés nasceu durante a escravidão no Egito.', -1526, null, 'AC', 'Êxodo 2', 'Moisés'],
    ['Êxodo do Egito', 'exodo-egito', 'libertacao', 'Israel libertado da escravidão com 10 pragas.', -1446, null, 'AC', 'Êxodo 12-14', 'Moisés, Faraó'],
    ['Passagem do Mar Vermelho', 'passagem-mar-ve', 'salvacao', 'Deus abriu o mar para Israel atravessar.', -1446, null, 'AC', 'Êxodo 14', 'Moisés, Israel'],
    ['Entrega da Lei', 'entrega-lei', 'alianca', 'Moisés recebeu os Dez Mandamentos no Sinai.', -1445, null, 'AC', 'Êxodo 20', 'Moisés'],
    ['Construção do Tabernáculo', 'construcao-tabernaculo', 'culto', 'Israel construiu o tabernáculo conforme instruções divinas.', -1445, null, 'AC', 'Êxodo 35-40', 'Moisés'],
    ['Entrada na Terra Prometida', 'entrada-terra-prometida', 'promessa', 'Josué liderou Israel na conquista de Canaã.', -1406, null, 'AC', 'Josué 3-6', 'Josué'],
    ['Destruição de Jericó', 'destruicao-jerico', 'conquista', 'As muralhas de Jericó caíram pela fé de Israel.', -1406, null, 'AC', 'Josué 6', 'Josué'],
    ['Reinado de Saul', 'reinado-saul', 'monarquia', 'Saul foi coroado como primeiro rei de Israel.', -1050, -1010, 'AC', '1 Samuel 10', 'Saul'],
    ['Reinado de Davi', 'reinado-davi', 'monarquia', 'Davi unificou Israel e estabelecceu Jerusalém.', -1010, -970, 'AC', '2 Samuel 2-5', 'Davi'],
    ['Arca da Aliança em Jerusalém', 'arca-jerusalem', 'culto', 'Davi trouxe a Arca para Jerusalém.', -1004, null, 'AC', '2 Samuel 6', 'Davi'],
    ['Construção do Templo', 'construcao-templo', 'culto', 'Salomão construiu o Templo em Jerusalém.', -966, -959, 'AC', '1 Reis 6-7', 'Salomão'],
    ['Dedicação do Templo', 'dedicacao-templo', 'culto', 'O Templo foi dedicado com fogo do céu.', -959, null, 'AC', '1 Reis 8', 'Salomão'],
    ['Reino Dividido', 'reino-dividido', 'politica', 'Israel se dividiu em Reino do Norte e do Sul.', -930, null, 'AC', '1 Reis 12', 'Roboão, Jeroboão'],
    ['Ministério de Elias', 'ministerio-elias', 'profetismo', 'Elias desafiou os profetas de Baal no Carmelo.', -870, -860, 'AC', '1 Reis 18', 'Elias, Acabe'],
    ['Queda de Samaria', 'queda-samaria', 'juizo', 'O Reino do Norte caiu para a Assíria.', -722, null, 'AC', '2 Reis 17', 'Oséias'],
    ['Ministério de Isaías', 'ministerio-isaias', 'profetismo', 'Isaías profetizou sobre o Messias e o juízo.', -740, -680, 'AC', 'Isaías 1-66', 'Isaías'],
    ['Queda de Jerusalém', 'queda-jerusalem', 'juizo', 'Babylonianos destruíram o Templo e deportaram Israel.', -586, null, 'AC', '2 Reis 25', 'Jeremias'],
    ['Exílio na Babilônia', 'exilio-babilonia', 'juizo', 'Israel deportado para a Babilônia por 70 anos.', -586, -536, 'AC', '2 Crônicas 36', 'Daniel, Ezequiel'],
    ['Edito de Ciro', 'ediro-ciro', 'libertacao', 'Ciro permitiu o retorno de Israel à terra.', -536, null, 'AC', 'Esdras 1', 'Ciro, Zorobabel'],
    ['Reconstrução do Templo', 'reconstrucao-templo', 'restauracao', 'O Segundo Templo foi reconstruído.', -516, null, 'AC', 'Esdras 6', 'Zorobabel, Ageu'],
    ['Reconstrução de Jerusalém', 'reconstrucao-jerusalém', 'restauracao', 'Neemias liderou a reconstrução das muralhas.', -445, null, 'AC', 'Neemias 2-6', 'Neemias'],
    ['Nascimento de Jesus', 'nascimento-jesus', 'encarnacao', 'Jesus nasceu em Belém de Judeia.', -4, null, 'DC', 'Lucas 2', 'Jesus, Maria, José'],
    ['Batismo de Jesus', 'batismo-jesus', 'inicio-ministerio', 'Jesus foi batizado por João no Jordão.', 27, null, 'DC', 'Mateus 3', 'Jesus, João Batista'],
    ['Primeiro Milagre', 'primeiro-milagre', 'milagre', 'Jesus transformou água em vinho em Caná.', 27, null, 'DC', 'João 2', 'Jesus'],
    ['Sermão do Monte', 'sermão-monte', 'ensino', 'Jesus pregou as bem-aventuranças.', 28, null, 'DC', 'Mateus 5-7', 'Jesus'],
    ['Transfiguração', 'transfiguracao', 'revelacao', 'Jesus foi transfigurado diante de Pedro, Tiago e João.', 30, null, 'DC', 'Mateus 17', 'Jesus, Pedro, Tiago, João'],
    ['Morte e Ressurreição', 'morte-ressurreicao', 'expiacao', 'Cristo morreu na cruz e ressuscitou ao terceiro dia.', 33, null, 'DC', 'Mateus 26-28', 'Jesus'],
    ['Ascensão', 'ascensao', 'ascensao', 'Jesus ascendeu ao céu dos Monte das Oliveiras.', 33, null, 'DC', 'Atos 1', 'Jesus, discípulos'],
    ['Pentecostes', 'pentecostes', 'effusao-espirito', 'O Espírito Santo descendeu sobre os discípulos.', 33, null, 'DC', 'Atos 2', 'discípulos'],
    ['Primeira Igreja', 'primeira-igreja', 'fundacao', 'A igreja nasceu em Jerusalém no dia de Pentecostes.', 33, null, 'DC', 'Atos 2-5', 'Pedro, discípulos'],
    ['Mártir Estêvão', 'martir-estevao', 'martirio', 'Estêvão foi o primeiro mártir cristão.', 35, null, 'DC', 'Atos 7', 'Estêvão'],
    ['Conversão de Paulo', 'conversao-paulo', 'conversao', 'Saulo perseguidor converteu-se a Cristo.', 36, null, 'DC', 'Atos 9', 'Paulo, Ananias'],
    ['Concílio de Jerusalém', 'concilio-jerusalém', 'decisao', 'A igreja decidiu sobre gentios e a Lei.', 49, null, 'DC', 'Atos 15', 'Tiago, Pedro, Paulo'],
    ['Primeira Viagem Missionária', 'primeira-viagem-missionaria', 'missao', 'Paulo e Barnabé evangelizaram a Ásia Menor.', 47, 49, 'DC', 'Atos 13-14', 'Paulo, Barnabé'],
    ['Segunda Viagem Missionária', 'segunda-viagem-missionaria', 'missao', 'Paulo levou o evangelho à Europa.', 50, 53, 'DC', 'Atos 16-18', 'Paulo, Silas'],
    ['Terceira Viagem Missionária', 'terceira-viagem-missionaria', 'missao', 'Paulo edificou igrejas na Ásia Menor.', 53, 58, 'DC', 'Atos 19-21', 'Paulo'],
    ['Prisão de Paulo em Roma', 'prisão-paulo-roma', 'martirio', 'Paulo preso em Roma, escreveu epístolas.', 60, 62, 'DC', 'Atos 28', 'Paulo'],
    ['Destruição do Templo', 'destruicao-templo-jr', 'juizo', 'Romano destruíram o Segundo Templo em 70 d.C.', 70, null, 'DC', 'Mateus 24', 'Tito'],
    ['Exílio de João em Patmos', 'exilio-patmos', 'revelacao', 'João recebeu o Apocalipse na ilha de Patmos.', 95, null, 'DC', 'Apocalipse 1', 'João'],
  ];
  try {
    for (const e of eventos) {
      const existing = await q(`SELECT id FROM "eventos_historicos" WHERE slug = $1`, [e[1]]);
      if (existing.length > 0) continue;
      await q(
        `INSERT INTO "eventos_historicos" ("nome","slug","categoria","descricao","ano_inicio","ano_fim","era","referencias_biblicas","personagens_envolvidos")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        e,
      );
    }
    log('10/12', `Eventos cronológicos OK (${eventos.length} eventos)`);
  } catch (e) {
    log('10/12', `ERRO ao criar eventos: ${e}`);
    throw e;
  }

  // ============================================================
  // 11. VERBETES DO DICIONÁRIO (20 termos teológicos)
  // ============================================================
  log('11/12', 'Verificando/Criando verbetes do dicionário...');
  const verbetes = [
    ['Graça', 'graca', 'Teologia', 'Favor imerecido de Deus para com o pecador.', 'A graça é o fundamento da salvação cristã.', ['favor', 'misericórdia'], ['Efésios 2:8', 'Romanos 3:24']],
    ['Fé', 'fe', 'Teologia', 'Conviccão e confiança no que se espera; certeza do que se vê.', 'A fé é a substância das coisas esperadas.', ['crença', 'confiança'], ['Hebreus 11:1', 'Romanos 10:17']],
    ['Pecado', 'pecado', 'Antropologia', 'Transgressão da lei de Deus; separação de Deus.', 'O pecado é a raiz de todo sofrimento humano.', ['culpa', 'transgressão'], ['Romanos 3:23', '1 João 3:4']],
    ['Salvação', 'salvacao', 'Soteriologia', 'Livramento da culpa e penalidade do pecado pela graça de Deus.', 'A salvação é um dom gratuito de Deus.', ['redenção', 'libertação'], ['Efésios 2:8', 'Romanos 10:9']],
    ['Misericórdia', 'misericordia', 'Teologia', 'Compasão de Deus que o move a ajudar os necessitados.', 'Deus é rico em misericórdia.', ['compaixão', 'piedade'], ['Lamentações 3:22', 'Efésios 2:4']],
    ['Perdão', 'perdao', 'Soteriologia', 'Remissão da dívida do pecado por Deus.', 'Deus perdoa todo aquele que se arrepende.', ['remissão', 'indulgência'], ['1 João 1:9', 'Colossenses 1:14']],
    ['Arrependimento', 'arrependimento', 'Soteriologia', 'Mudança de mente e de direção, voltando-se para Deus.', ['conversão', 'mudança'], ['Mateus 4:17', 'Atos 3:19'], 'Condição necessária para a salvação.'],
    ['Redenção', 'redencao', 'Soteriologia', 'Compra de volta com o preço do sangue de Cristo.', 'Cristo nos redimiu com o seu sangue.', ['resgate', 'libertação'], ['1 Pedro 1:18-19', 'Efésios 1:7']],
    ['Expiação', 'expiacao', 'Soteriologia', 'Satisfação dada à justiça de Deus pelo sacrifício de Cristo.', 'Cristo foi a propiciação pelos nossos pecados.', ['satisfação', 'propiciação'], ['1 João 2:2', 'Romanos 3:25']],
    ['Regeneração', 'regeneracao', 'Soteriologia', 'Re-nascimento espiritual obra do Espírito Santo.', 'O homem precisa nascer de novo.', ['novo nascimento'], ['João 3:3', 'Tito 3:5']],
    ['Santificação', 'santificacao', 'Soteriologia', 'Processo de ser separado para Deus e tornado santo.', 'Deus nos chama para santificação.', ['purificação', 'consagração'], ['1 Tessalonicenses 4:3', 'Hebreus 12:14']],
    ['Justificação', 'justificacao', 'Soteriologia', 'Declaração legal de justiça pela fé em Cristo.', 'O justo viverá pela fé.', ['absolvição', 'declaração de justiça'], ['Romanos 5:1', 'Gálatas 2:16']],
    ['Trindade', 'trindade', 'Teologia Proper', 'Deus é um em essência, três em pessoas: Pai, Filho e Espírito Santo.', 'Mistério central da fé cristã.', ['Uno-trino'], ['Mateus 28:19', '2 Coríntios 13:14']],
    ['Encarnação', 'encarnacao', 'Cristologia', 'O Verbo eterno se fez homem em Jesus Cristo.', 'Deus se tornou homem sem deixar de ser Deus.', ['nascimento virginal'], ['João 1:14', 'Filipenses 2:6-8']],
    ['Ressurreição', 'ressurreicao', 'Escatologia', 'Levantar dos mortos com um corpo glorificado.', 'Cristo é a primeira dos que ressuscitaram.', ['vitória sobre a morte'], ['1 Coríntios 15', 'João 11:25']],
    ['Eucaristia', 'eucaristia', 'Eclesiologia', 'Ceia do Senhor; memorial da morte de Cristo.', 'Fazei isso em memória de mim.', ['Ceia do Senhor', 'comunhão'], ['1 Coríntios 11:23-26']],
    ['Igreja', 'igreja', 'Eclesiologia', 'Corpo de Cristo, comunidade dos fiéis.', 'A igreja é a coluna e sustentáculo da verdade.', ['assembleia', 'corpo'], ['Efésios 1:22-23', '1 Timóteo 3:15']],
    ['Apocalipse', 'apocalipse', 'Escatologia', 'Revelação das últimas coisas; fim dos tempos.', 'Deus revelou a João o que breve deve acontecer.', ['revelação', 'últimos tempos'], ['Apocalipse 1:1', 'Daniel 12']],
    ['Profecia', 'profecia', 'Bibliologia', 'Palavra de Deus comunicada por profetas.', 'A profecia nunca veio por vontade humana.', ['revelação', 'predição'], ['2 Pedro 1:21', '2 Timóteo 3:16']],
    ['Aliança', 'alianca', 'Teologia', 'Acordo solene entre Deus e o homem.', 'Deus fez aliança com Abraão e com Israel.', ['pacto', 'convenção'], ['Gênesis 15', 'Hebreus 8:8-12']],
  ];
  try {
    for (const v of verbetes) {
      const existing = await q(`SELECT id FROM "verbetes" WHERE slug = $1`, [v[1]]);
      if (existing.length > 0) continue;
      await q(
        `INSERT INTO "verbetes" ("titulo","slug","categoria","definicao","explicacao","sinonimos","referencias_biblicas")
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        v,
      );
    }
    log('11/12', `Verbetes OK (${verbetes.length} verbetes)`);
  } catch (e) {
    log('11/12', `ERRO ao criar verbetes: ${e}`);
    throw e;
  }

  // ============================================================
  // 12. PLANOS DE LEITURA
  // ============================================================
  log('12/12', 'Verificando/Criando planos de leitura...');
  try {
    const planos = [
      ['Bíblia em 1 Ano', 'Leia a Bíblia completa em 365 dias', 365, 3, { tipo: 'cronologica' }, 'completo', true],
      ['Novo Testamento em 3 Meses', 'Leia o Novo Testamento em 90 dias', 90, 1, { tipo: 'canonica' }, 'novo-testamento', true],
      ['Pentateuco em 30 Dias', 'Estudo dos 5 livros de Moisés em 30 dias', 30, 2, { tipo: 'livro', livros: ['gn', 'ex', 'lv', 'nm', 'dt'] }, 'pentateuco', true],
      ['Salmos em 30 Dias', 'Leia todos os 150 Salmos em 30 dias', 30, 5, { tipo: 'livro', livros: ['sl'] }, 'poetico', true],
      ['Evangelhos em 40 Dias', 'Leia os 4 Evangelhos em 40 dias', 40, 2, { tipo: 'livro', livros: ['mt', 'mc', 'lc', 'jo'] }, 'evangelhos', true],
    ];
    for (const p of planos) {
      const existing = await q(`SELECT id FROM "planos_leitura" WHERE nome = $1`, [p[0]]);
      if (existing.length > 0) continue;
      await q(
        `INSERT INTO "planos_leitura" ("nome","descricao","total_dias","capitulos_por_dia","programacao","categoria","publico")
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [p[0], p[1], p[2], p[3], JSON.stringify(p[4]), p[5], p[6]],
      );
    }
    log('12/12', `Planos de leitura OK (${planos.length} planos)`);
  } catch (e) {
    log('12/12', `ERRO ao criar planos: ${e}`);
    throw e;
  }

  await ds.destroy();
  console.log('\n=== Seed concluído com sucesso! ===');
  console.log('Resumo:');
  console.log('  - 2 testamentos');
  console.log('  - 8 traduções');
  console.log(`  - ${livros.length} livros`);
  console.log(`  - ${Object.keys(capituloIds).length} capítulos (livros-chave)`);
  console.log(`  - ${versiculosExemplo.length * 3} versículos (ARC, NVI, KJV)`);
  console.log(`  - ${categorias.length} categorias de doutrina`);
  console.log(`  - ${doutrinas.length} doutrinas`);
  console.log(`  - ${personagens.length} personagens`);
  console.log(`  - ${localizacoes.length} localizações`);
  console.log(`  - ${eventos.length} eventos cronológicos`);
  console.log(`  - ${verbetes.length} verbetes do dicionário`);
  console.log('  - 5 planos de leitura');
}

seed().catch((erro) => {
  console.error('[FATAL] Erro no seed:', erro);
  process.exit(1);
});
