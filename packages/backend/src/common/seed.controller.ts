import { Controller, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('admin')
export class SeedController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Post('seed')
  async seed() {
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const existing = await runner.query("SELECT COUNT(*) as c FROM bible_books");
      if (parseInt(existing[0].c) > 0) {
        await runner.rollbackTransaction();
        await runner.release();
        return { message: "Database already seeded", books: parseInt(existing[0].c) };
      }

      const versoes = await runner.query(`
        INSERT INTO bible_versions (id, sigla, nome, idioma, tipo, ano, ativo, criado_em, atualizado_em)
        VALUES
          (gen_random_uuid(), 'ARA', 'Almeida Revista e Atualizada', 'portugues', 'protestante', 1993, true, NOW(), NOW()),
          (gen_random_uuid(), 'NVI', 'Nova Versao Internacional', 'portugues', 'protestante', 2000, true, NOW(), NOW()),
          (gen_random_uuid(), 'ARC', 'Almeida Revista e Corrigida', 'portugues', 'protestante', 1993, true, NOW(), NOW())
        RETURNING id, sigla
      `);
      const araId = versoes.find((v: any) => v.sigla === 'ARA').id;

      const books = [
        { n: 'Genesis', c: 50, o: 1, t: 'AT', g: 'Lei', a: 'Moises' },
        { n: 'Exodo', c: 40, o: 2, t: 'AT', g: 'Lei', a: 'Moises' },
        { n: 'Levitico', c: 27, o: 3, t: 'AT', g: 'Lei', a: 'Moises' },
        { n: 'Numeros', c: 36, o: 4, t: 'AT', g: 'Lei', a: 'Moises' },
        { n: 'Deuteronomio', c: 34, o: 5, t: 'AT', g: 'Lei', a: 'Moises' },
        { n: 'Josue', c: 24, o: 6, t: 'AT', g: 'Historia', a: 'Josue' },
        { n: 'Juizes', c: 21, o: 7, t: 'AT', g: 'Historia', a: 'Samuel' },
        { n: 'Rute', c: 4, o: 8, t: 'AT', g: 'Historia', a: 'Samuel' },
        { n: '1 Samuel', c: 31, o: 9, t: 'AT', g: 'Historia', a: 'Samuel' },
        { n: '2 Samuel', c: 24, o: 10, t: 'AT', g: 'Historia', a: 'Samuel' },
        { n: '1 Reis', c: 22, o: 11, t: 'AT', g: 'Historia', a: 'Jeremias' },
        { n: '2 Reis', c: 25, o: 12, t: 'AT', g: 'Historia', a: 'Jeremias' },
        { n: '1 Cronicas', c: 29, o: 13, t: 'AT', g: 'Historia', a: 'Esdras' },
        { n: '2 Cronicas', c: 36, o: 14, t: 'AT', g: 'Historia', a: 'Esdras' },
        { n: 'Esdras', c: 10, o: 15, t: 'AT', g: 'Historia', a: 'Esdras' },
        { n: 'Neemias', c: 13, o: 16, t: 'AT', g: 'Historia', a: 'Neemias' },
        { n: 'Ester', c: 10, o: 17, t: 'AT', g: 'Historia', a: 'Mardoqueu' },
        { n: 'Jo', c: 42, o: 18, t: 'AT', g: 'Poesia', a: 'Desconhecido' },
        { n: 'Salmos', c: 150, o: 19, t: 'AT', g: 'Poesia', a: 'Davi' },
        { n: 'Proverbios', c: 31, o: 20, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { n: 'Eclesiastes', c: 12, o: 21, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { n: 'Canticos', c: 8, o: 22, t: 'AT', g: 'Poesia', a: 'Salomao' },
        { n: 'Isaias', c: 66, o: 23, t: 'AT', g: 'Profecia', a: 'Isaias' },
        { n: 'Jeremias', c: 52, o: 24, t: 'AT', g: 'Profecia', a: 'Jeremias' },
        { n: 'Lamentacoes', c: 5, o: 25, t: 'AT', g: 'Profecia', a: 'Jeremias' },
        { n: 'Ezequiel', c: 48, o: 26, t: 'AT', g: 'Profecia', a: 'Ezequiel' },
        { n: 'Daniel', c: 12, o: 27, t: 'AT', g: 'Profecia', a: 'Daniel' },
        { n: 'Oseias', c: 14, o: 28, t: 'AT', g: 'Profecia', a: 'Oseias' },
        { n: 'Joel', c: 3, o: 29, t: 'AT', g: 'Profecia', a: 'Joel' },
        { n: 'Amos', c: 9, o: 30, t: 'AT', g: 'Profecia', a: 'Amos' },
        { n: 'Obadias', c: 1, o: 31, t: 'AT', g: 'Profecia', a: 'Obadias' },
        { n: 'Jonas', c: 4, o: 32, t: 'AT', g: 'Profecia', a: 'Jonas' },
        { n: 'Miqueias', c: 7, o: 33, t: 'AT', g: 'Profecia', a: 'Miqueias' },
        { n: 'Naum', c: 3, o: 34, t: 'AT', g: 'Profecia', a: 'Naum' },
        { n: 'Habacuque', c: 3, o: 35, t: 'AT', g: 'Profecia', a: 'Habacuque' },
        { n: 'Sofonias', c: 3, o: 36, t: 'AT', g: 'Profecia', a: 'Sofonias' },
        { n: 'Ageu', c: 2, o: 37, t: 'AT', g: 'Profecia', a: 'Ageu' },
        { n: 'Zacarias', c: 14, o: 38, t: 'AT', g: 'Profecia', a: 'Zacarias' },
        { n: 'Malaquias', c: 4, o: 39, t: 'AT', g: 'Profecia', a: 'Malaquias' },
        { n: 'Mateus', c: 28, o: 40, t: 'NT', g: 'Evangelho', a: 'Mateus' },
        { n: 'Marcos', c: 16, o: 41, t: 'NT', g: 'Evangelho', a: 'Marcos' },
        { n: 'Lucas', c: 24, o: 42, t: 'NT', g: 'Evangelho', a: 'Lucas' },
        { n: 'Joao', c: 21, o: 43, t: 'NT', g: 'Evangelho', a: 'Joao' },
        { n: 'Atos', c: 28, o: 44, t: 'NT', g: 'Historia', a: 'Lucas' },
        { n: 'Romanos', c: 16, o: 45, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '1 Corintios', c: 16, o: 46, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '2 Corintios', c: 13, o: 47, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Galatas', c: 6, o: 48, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Efesios', c: 6, o: 49, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Filipenses', c: 4, o: 50, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Colossenses', c: 4, o: 51, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '1 Tessalonicenses', c: 5, o: 52, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '2 Tessalonicenses', c: 3, o: 53, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '1 Timoteo', c: 6, o: 54, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: '2 Timoteo', c: 4, o: 55, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Tito', c: 3, o: 56, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Filemom', c: 1, o: 57, t: 'NT', g: 'Epistola', a: 'Paulo' },
        { n: 'Hebreus', c: 13, o: 58, t: 'NT', g: 'Epistola', a: 'Desconhecido' },
        { n: 'Tiago', c: 5, o: 59, t: 'NT', g: 'Epistola', a: 'Tiago' },
        { n: '1 Pedro', c: 5, o: 60, t: 'NT', g: 'Epistola', a: 'Pedro' },
        { n: '2 Pedro', c: 3, o: 61, t: 'NT', g: 'Epistola', a: 'Pedro' },
        { n: '1 Joao', c: 5, o: 62, t: 'NT', g: 'Epistola', a: 'Joao' },
        { n: '2 Joao', c: 1, o: 63, t: 'NT', g: 'Epistola', a: 'Joao' },
        { n: '3 Joao', c: 1, o: 64, t: 'NT', g: 'Epistola', a: 'Joao' },
        { n: 'Judas', c: 1, o: 65, t: 'NT', g: 'Epistola', a: 'Judas' },
        { n: 'Apocalipse', c: 22, o: 66, t: 'NT', g: 'Apocalipse', a: 'Joao' },
      ];

      for (const b of books) {
        const bookRes = await runner.query(
          `INSERT INTO bible_books (id, versao_id, ordem, nome, testamento, genero, autor, total_capitulos, criado_em, atualizado_em)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING id`,
          [araId, b.o, b.n, b.t, b.g, b.a, b.c]
        );
        const bookId = bookRes[0].id;
        for (let ch = 1; ch <= b.c; ch++) {
          await runner.query(
            `INSERT INTO bible_chapters (id, livro_id, numero, total_versiculos, criado_em, atualizado_em)
             VALUES (gen_random_uuid(), $1, $2, 1, NOW(), NOW())`,
            [bookId, ch]
          );
        }
      }

      await runner.commitTransaction();
      await runner.release();
      return { message: "Database seeded successfully", books: books.length };
    } catch (error) {
      await runner.rollbackTransaction();
      await runner.release();
      return { error: String(error) };
    }
  }
}
