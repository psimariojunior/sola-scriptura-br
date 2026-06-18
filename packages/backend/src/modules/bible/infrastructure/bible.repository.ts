import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BibleVersion } from '../../../infrastructure/database/entities/bible-version.entity';
import { BibleBook } from '../../../infrastructure/database/entities/bible-book.entity';
import { BibleChapter } from '../../../infrastructure/database/entities/bible-chapter.entity';
import { BibleVerse } from '../../../infrastructure/database/entities/bible-verse.entity';
import { VersiculoCompleto, ReferenciaBiblica } from '../domain/bible.types';

@Injectable()
export class BibleRepository {
  constructor(
    @InjectRepository(BibleVersion)
    private readonly versaoRepo: Repository<BibleVersion>,
    @InjectRepository(BibleBook)
    private readonly livroRepo: Repository<BibleBook>,
    @InjectRepository(BibleChapter)
    private readonly capituloRepo: Repository<BibleChapter>,
    @InjectRepository(BibleVerse)
    private readonly versiculoRepo: Repository<BibleVerse>,
  ) {}

  async encontrarVersao(sigla: string): Promise<BibleVersion | null> {
    return this.versaoRepo.findOne({ where: { sigla, ativo: true } });
  }

  async encontrarLivro(ref: ReferenciaBiblica, versaoId?: string): Promise<BibleBook> {
    const query: any = { nome: ref.livro };
    if (versaoId) query.versaoId = versaoId;
    return this.livroRepo.findOneOrFail({ where: query });
  }

  async encontrarCapitulo(ref: ReferenciaBiblica): Promise<BibleChapter> {
    const livro = await this.encontrarLivro(ref);
    return this.capituloRepo.findOneOrFail({
      where: { livroId: livro.id, numero: ref.capitulo },
    });
  }

  async encontrarVersiculo(ref: ReferenciaBiblica, versao: string): Promise<VersiculoCompleto | null> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return null;

    const livro = await this.livroRepo.findOne({
      where: { nome: ref.livro, versaoId: versaoEntity.id },
    });
    if (!livro) return null;

    const capitulo = await this.capituloRepo.findOne({
      where: { livroId: livro.id, numero: ref.capitulo },
    });
    if (!capitulo) return null;

    const versiculo = await this.versiculoRepo.findOne({
      where: { capituloId: capitulo.id, numero: ref.versiculo },
    });
    if (!versiculo) return null;

    return this.mapearVersiculo(versiculo, livro, capitulo);
  }

  async buscarVersiculosAntes(
    ref: ReferenciaBiblica,
    versao: string,
    quantidade: number,
  ): Promise<VersiculoCompleto[]> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return [];

    const livro = await this.livroRepo.findOne({
      where: { nome: ref.livro, versaoId: versaoEntity.id },
    });
    if (!livro) return [];

    const capitulo = await this.capituloRepo.findOne({
      where: { livroId: livro.id, numero: ref.capitulo },
    });
    if (!capitulo) return [];

    const versiculos = await this.versiculoRepo.find({
      where: { capituloId: capitulo.id },
      order: { numero: 'DESC' },
      take: quantidade,
    });

    return versiculos
      .filter((v) => v.numero < ref.versiculo)
      .reverse()
      .slice(-quantidade)
      .map((v) => this.mapearVersiculo(v, livro, capitulo));
  }

  async buscarVersiculosDepois(
    ref: ReferenciaBiblica,
    versao: string,
    quantidade: number,
  ): Promise<VersiculoCompleto[]> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return [];

    const livro = await this.livroRepo.findOne({
      where: { nome: ref.livro, versaoId: versaoEntity.id },
    });
    if (!livro) return [];

    const capitulo = await this.capituloRepo.findOne({
      where: { livroId: livro.id, numero: ref.capitulo },
    });
    if (!capitulo) return [];

    const versiculos = await this.versiculoRepo.find({
      where: { capituloId: capitulo.id, numero: MoreThan(ref.versiculo) },
      order: { numero: 'ASC' },
      take: quantidade,
    });

    return versiculos.map((v) => this.mapearVersiculo(v, livro, capitulo));
  }

  async buscarCapituloCompleto(
    ref: ReferenciaBiblica,
    versao: string,
  ): Promise<VersiculoCompleto[]> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return [];

    const livro = await this.livroRepo.findOne({
      where: { nome: ref.livro, versaoId: versaoEntity.id },
    });
    if (!livro) return [];

    const capitulo = await this.capituloRepo.findOne({
      where: { livroId: livro.id, numero: ref.capitulo },
    });
    if (!capitulo) return [];

    const versiculos = await this.versiculoRepo.find({
      where: { capituloId: capitulo.id },
      order: { numero: 'ASC' },
    });

    return versiculos.map((v) => this.mapearVersiculo(v, livro, capitulo));
  }

  async buscarPorTexto(
    termo: string,
    versao: string,
    pagina: number,
    limite: number,
  ): Promise<VersiculoCompleto[]> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return [];

    const query = this.versiculoRepo
      .createQueryBuilder('v')
      .innerJoinAndSelect('v.capitulo', 'c')
      .innerJoinAndSelect('c.livro', 'l')
      .where('v.texto ILIKE :termo', { termo: `%${termo}%` })
      .andWhere('v.versaoId = :versaoId', { versaoId: versaoEntity.id })
      .orderBy('v.livroId')
      .addOrderBy('c.numero')
      .addOrderBy('v.numero')
      .skip((pagina - 1) * limite)
      .take(limite);

    const versiculos = await query.getMany();
    return versiculos.map((v) => ({
      id: v.id,
      versaoId: v.versaoId,
      livroId: v.livroId,
      capituloId: v.capituloId,
      livro: v.capitulo.livro.nome,
      capitulo: v.capitulo.numero,
      numero: v.numero,
      texto: v.texto,
      textoOriginal: v.textoOriginal,
      strongs: v.strongs,
    }));
  }

  async contarResultados(termo: string, versao: string): Promise<number> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return 0;

    return this.versiculoRepo.count({
      where: {
        texto: ILike(`%${termo}%`),
        versaoId: versaoEntity.id,
      },
    });
  }

  async listarVersoes(): Promise<any[]> {
    return this.versaoRepo.find({ where: { ativo: true }, order: { sigla: 'ASC' } });
  }

  async listarLivros(versao: string): Promise<any[]> {
    const versaoEntity = await this.encontrarVersao(versao);
    if (!versaoEntity) return [];
    return this.livroRepo.find({
      where: { versaoId: versaoEntity.id },
      order: { ordem: 'ASC' },
    });
  }

  private mapearVersiculo(
    v: BibleVerse,
    livro: BibleBook,
    capitulo: BibleChapter,
  ): VersiculoCompleto {
    return {
      id: v.id,
      versaoId: v.versaoId,
      livroId: v.livroId,
      capituloId: v.capituloId,
      livro: livro.nome,
      capitulo: capitulo.numero,
      numero: v.numero,
      texto: v.texto,
      textoOriginal: v.textoOriginal,
      strongs: v.strongs,
    };
  }
}

function MoreThan(value: number): any {
  return { $gt: value };
}

function ILike(value: string): any {
  return { $ilike: value };
}
