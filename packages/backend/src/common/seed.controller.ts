import { Controller, Post, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('admin')
export class SeedController {
  constructor(@InjectDataSource() private readonly ds: DataSource) {}

  @Post('seed')
  async seed() {
    try {
      const existing = await this.ds.query("SELECT COUNT(*) as c FROM bible_books");
      if (parseInt(existing[0].c) > 0) {
        return { message: "Database already seeded", books: parseInt(existing[0].c) };
      }

      const versoes = await this.ds.query(`
        INSERT INTO bible_versions (id, sigla, nome, idioma, tipo, ano, ativo, criado_em, atualizado_em)
        VALUES (gen_random_uuid(), 'ARA', 'Almeida Revista e Atualizada', 'portugues', 'protestante', 1993, true, NOW(), NOW()),
               (gen_random_uuid(), 'NVI', 'Nova Versao Internacional', 'portugues', 'protestante', 2000, true, NOW(), NOW()),
               (gen_random_uuid(), 'ARC', 'Almeida Revista e Corrigida', 'portugues', 'protestante', 1993, true, NOW(), NOW())
        RETURNING id, sigla
      `);
      const araId = versoes.find((v: any) => v.sigla === 'ARA').id;

      const books = [
        { nome: 'Genesis', capitulos: 50, ordem: 1, t: 'AT', g: 'Lei', a: 'Moises' },
        { nome: 'Exodo', capitulos: 40, ordem: 2, t: 'AT', g: 'Lei', a: 'Moises' },
        { nome: 'Levitico', capitulos: 27, ordem: 3, t: 'AT', g: 'Lei', a: 'Moises' },
        { nome: 'Numeros', capitulos: 36, ordem: 4, t: 'AT', g: 'Lei', a: 'Moises' },
        { nome: 'Deuteronomio', capitulos: 34, ordem: 5, t: 'AT', g: 'Lei', a: 'Moises' },
        { nome: 'Josue', capitulos: 24, ordem: 6, t: 'AT', g: 'Historia', a: 'Josue' },
        { nome: 'Juizes', capitulos: 21, ordem: 7, t: 'AT', g: 'Historia', a: 'Samuel' },
        { nome: 'Rute', capitulos: 4, ordem: 8, t: 'AT', g: 'Historia', a: 'Samuel' },
        { nome: '1 Samuel', capitulos: 31, ordem: 9, t: 'AT', g: 'Historia', a: 'Samuel' },
        { nome: '2 Samuel', capitulos: 24, ordem: 10, t: 'AT', g: 'Historia', a: 'Samuel' },
        { nome: '1 Reis', capitulos: 22, ordem: 11, t: 'AT', g: 'Historia', a: 'Jeremias' },
        { nome: '2 Reis', capitulos: 25, ordem: 12, t: 'AT', g: 'Historia', a: 'Jeremias' },
        { nome: '1 Cronicas', capitulos: 29, ordem: 13, t: 'AT', g: 'Historia', a: 'Esdras' },
        { nome: '2 Cronicas', capitulos: 36, ordem: 14, t: 'AT', g: 'Historia', a: 'Esdras' },
        { nome: 'Esdras', capitulos: 10, ordem: 15, t: 'AT', g: 'Historia', a: 'Esdras' },
        { nome: 'Neemias', capitulos: 13, ordem: 16, t: 'AT', g: 'Historia', a: 'Neemias' },
        { nome: 'Ester', capitulos: 10, ordem: 17, t: 'AT', g: 'Historia', a: 'Mardoqueu' },
        { nome: 'Jo', capitulos: 42, ordem: 18, t: 'AT', g: 'Poesia', a: 'Desconhecido' },
        { nome: 'Salmos', capitulos: 150, ordem: 19, t: 'AT', g: 'Poesia', a: 'Davi' },
        { nome: 'Proverbios', capitulos: 31, ordem: 20, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { nome: 'Eclesiastes', capitulos: 12, ordem: 21, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { nome: 'Canticos', capitulos: 8, ordem: 22, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { nome: 'Isaias', capitulos: 66, ordem: 23, t: 'AT', g: 'Profecia', a: 'Isaias' },
        { nome: 'Jeremias', capitulos: 52, ordem: 24, t: 'AT', g: 'Profecia', a: 'Jeremias' },
        { nome: 'Lamentacoes', capitulos: 5, ordem: 25, t: 'AT', g: 'Profecia', a: 'Jeremias' },
        { nome: 'Ezequiel', capitulos: 48, ordem: 26, t: 'AT', g: 'Profecia', a: 'Ezequiel' },
        { nome: 'Daniel', capitulos: 12, ordem: 27, t: 'AT', g: 'Profecia', a: 'Daniel' },
        { nome: 'Oseias', capitulos: 14, ordem: 28, t: 'AT', g: 'Profecia', a: 'Oseias' },
        { nome: 'Joel', capitulos: 3, ordem: 29, t: 'AT', g: 'Profecia', a: 'Joel' },
        { nome: 'Amos', capitulos: 9, ordem: 30, t: 'AT', g: 'Profecia', a: 'Amos' },
        { nome: 'Obadias', capitulos: 1, ordem: 31, t: 'AT', g: 'Profecia', a: 'Obadias' },
        { nome: 'Jonas', capitulos: 4, ordem: 32, t: 'AT', g: 'Profecia', a: 'Jonas' },
        { nome: 'Miqueias', capitulos: 7, ordem: 33, t: 'AT', g: 'Profecia', a: 'Miqueias' },
        { nome: 'Naum', capitulos: 3, ordem: 34, t: 'AT', g: 'Profecia', a: 'Naum' },
        { nome: 'Habacuque', capitulos: 3, ordem: 35, t: 'AT', g: 'Profecia', a: 'Habacuque' },
        { nome: 'Sofonias', capitulos: 3, ordem: 36, t: 'AT', g: 'Profecia', a: 'Sofonias' },
        { nome: 'Ageu', capitulos: 2, ordem: 37, t: 'AT', g: 'Profecia', a: 'Ageu' },
        { nome: 'Zacarias', capitulos: 14, ordem: 38, t: 'AT', g: 'Profecia', a: 'Zacarias' },
        { nome: 'Malaquias', capitulos: 4, ordem: 39, t: 'AT', g: 'Profecia', a: 'Malaquias' },
        { nome: 'Mateus', capitulos: 28, ordem: 40, t: 'NT', g: 'Evangelho', a: 'Mateus' },
        { nome: 'Marcos', capitulos: 16, ordem: 41, t: 'NT', g: 'Evangelho', a: 'Marcos' },
        { nome: 'Lucas', capitulos: 24, ordem: 42, t: 'NT', g: 'Evangelho', a: 'Lucas' },
        { nome: 'Joao', capitulos: 21, ordem: 43, t: 'NT', g: 'Evangelho', a: 'Joao' },
        { nome: 'Atos', capitulos: 28, ordem: 44, t: 'NT', g: 'Historia', a: 'Lucas' },
        { nome: 'Romanos', capitulos: 16, ordem: 45, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '1 Corintios', capitulos: 16, ordem: 46, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '2 Corintios', capitulos: 13, ordem: 47, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Galatas', capitulos: 6, ordem: 48, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Efesios', capitulos: 6, ordem: 49, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Filipenses', capitulos: 4, ordem: 50, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Colossenses', capitulos: 4, ordem: 51, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '1 Tessalonicenses', capitulos: 5, ordem: 52, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '2 Tessalonicenses', capitulos: 3, ordem: 53, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '1 Timoteo', capitulos: 6, ordem: 54, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: '2 Timoteo', capitulos: 4, ordem: 55, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Tito', capitulos: 3, ordem: 56, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Filemom', capitulos: 1, ordem: 57, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { nome: 'Hebreus', capitulos: 13, ordem: 58, t: 'NT', g: 'Epistola', a: 'Desconhecido' },
        { nome: 'Tiago', capitulos: 5, ordem: 59, t: 'NT', g: 'Epistola', a: 'Tiago' },
        { nome: '1 Pedro', capitulos: 5, ordem: 60, t: 'NT', g: 'Epistola', a: 'Pedro' },
        { nome: '2 Pedro', capitulos: 3, ordem: 61, t: 'NT', g: 'Epistola', a: 'Pedro' },
        { nome: '1 Joao', capitulos: 5, ordem: 62, t: 'NT', g: 'Epistola', a: 'Joao' },
        { nome: '2 Joao', capitulos: 1, ordem: 63, t: 'NT', g: 'Epistola', a: 'Joao' },
        { nome: '3 Joao', capitulos: 1, ordem: 64, t: 'NT', g: 'Epistola', a: 'Joao' },
        { nome: 'Judas', capitulos: 1, ordem: 65, t: 'NT', g: 'Epistola', a: 'Judas' },
        { nome: 'Apocalipse', capitulos: 22, ordem: 66, t: 'NT', g: 'Apocalipse', a: 'Joao' },
      ];

      for (const b of books) {
        const r = await this.ds.query(
          `INSERT INTO bible_books (id, versao_id, ordem, nome, testamento, genero, autor, totalCapitulos, criado_em, atualizado_em)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING id`,
          [araId, b.ordem, b.nome, b.t, b.g, b.a, b.capitulos]
        );
        const bookId = r[0].id;
        for (let c = 1; c <= b.capitulos; c++) {
          await this.ds.query(
            `INSERT INTO bible_chapters (id, livro_id, numero, criado_em, atualizado_em)
             VALUES (gen_random_uuid(), $1, $2, NOW(), NOW())`,
            [bookId, c]
          );
        }
      }

      return { message: `Database seeded: ${books.length} books` };
    } catch (error: any) {
      return { error: error.message || String(error) };
    }
  }

  @Post('seed-verses')
  async seedVerses(@Body() body: { livro?: string; inicio?: number; fim?: number }) {
    const { livro, inicio = 1, fim = 66 } = body;
    try {
      const araRows = await this.ds.query("SELECT id FROM bible_versions WHERE sigla='ARA' LIMIT 1");
      if (!araRows.length) return { error: 'ARA version not found' };
      const araId = araRows[0].id;

      const booksQuery = livro
        ? `SELECT id, ordem, nome, totalCapitulos FROM bible_books WHERE nome = '${livro}' ORDER BY ordem`
        : `SELECT id, ordem, nome, totalCapitulos FROM bible_books WHERE ordem BETWEEN ${inicio} AND ${fim} ORDER BY ordem`;
      
      const books = await this.ds.query(booksQuery);
      let totalVerses = 0;

      for (const book of books) {
        console.log(`Seeding ${book.nome} (${book.ordem})...`);
        for (let c = 1; c <= (book.totalcapitulos || book.totalCapitulos || 1); c++) {
          try {
            const prefix = `https://bolls.life/get-chapter/ARA/${book.ordem}/${c}/`;
            const response = await fetch(prefix);
            if (!response.ok) { continue; }
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) { continue; }

            const chapterRows = await this.ds.query(
              `SELECT id FROM bible_chapters WHERE livro_id=$1 AND numero=$2 LIMIT 1`,
              [book.id, c]
            );
            if (!chapterRows.length) { continue; }
            const chapterId = chapterRows[0].id;

            for (const v of data) {
              const vNum = typeof v === 'object' ? (v.verse || 0) : 0;
              const vText = typeof v === 'object' ? (v.text || '') : String(v);
              if (!vNum || !vText) continue;

              await this.ds.query(
                `INSERT INTO bible_verses (id, versao_id, livro_id, capitulo_id, numero, texto, criado_em, atualizado_em)
                 VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
                 ON CONFLICT (versao_id, livro_id, capitulo_id, numero) DO UPDATE SET texto=$5`,
                [araId, book.id, chapterId, vNum, vText]
              );
              totalVerses++;
            }
          } catch (e: any) {
            console.error(`Error on ${book.nome} ${c}: ${e.message}`);
          }
        }
      }

      return { message: `Verses inserted: ${totalVerses}`, total: totalVerses };
    } catch (error: any) {
      return { error: error.message || String(error) };
    }
  }
}
