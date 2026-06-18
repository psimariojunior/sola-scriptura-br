import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BibleRepository } from '../infrastructure/bible.repository';
import {
  VersiculoCompleto,
  ReferenciaBiblica,
  ResultadoBusca,
  ContextoVersiculo,
} from '../domain/bible.types';

@Injectable()
export class BibleService {
  private readonly logger = new Logger(BibleService.name);

  constructor(private readonly bibleRepo: BibleRepository) {}

  async buscarVersiculo(
    ref: ReferenciaBiblica,
    versao: string = 'ARA',
  ): Promise<VersiculoCompleto> {
    this.logger.log(`Buscando ${ref.livro} ${ref.capitulo}:${ref.versiculo} na versão ${versao}`);
    const versiculo = await this.bibleRepo.encontrarVersiculo(ref, versao);
    if (!versiculo) {
      throw new NotFoundException(
        `Versículo ${ref.livro} ${ref.capitulo}:${ref.versiculo} não encontrado`,
      );
    }
    return versiculo;
  }

  async buscarContexto(
    ref: ReferenciaBiblica,
    versao: string = 'ARA',
    margem: number = 5,
  ): Promise<ContextoVersiculo> {
    const versiculo = await this.buscarVersiculo(ref, versao);
    const [antes, depois] = await Promise.all([
      this.bibleRepo.buscarVersiculosAntes(ref, versao, margem),
      this.bibleRepo.buscarVersiculosDepois(ref, versao, margem),
    ]);
    const capitulo = await this.bibleRepo.encontrarCapitulo(ref);
    const livro = await this.bibleRepo.encontrarLivro(ref);

    return {
      versiculo,
      antes,
      depois,
      capitulo: {
        numero: capitulo.numero,
        totalVersiculos: capitulo.totalVersiculos || 0,
      },
      livro: {
        nome: livro.nome,
        testamento: livro.testamento,
        genero: livro.genero,
        autor: livro.autor,
      },
    };
  }

  async buscarCapitulo(
    ref: ReferenciaBiblica,
    versao: string = 'ARA',
  ): Promise<VersiculoCompleto[]> {
    return this.bibleRepo.buscarCapituloCompleto(ref, versao);
  }

  async buscarTexto(
    termo: string,
    versao: string = 'ARA',
    pagina: number = 1,
    limite: number = 20,
  ): Promise<ResultadoBusca> {
    const [versiculos, total] = await Promise.all([
      this.bibleRepo.buscarPorTexto(termo, versao, pagina, limite),
      this.bibleRepo.contarResultados(termo, versao),
    ]);

    return {
      versiculos,
      total,
      pagina,
      totalPaginas: Math.ceil(total / limite),
    };
  }

  async listarVersoes(): Promise<any[]> {
    return this.bibleRepo.listarVersoes();
  }

  async listarLivros(versao: string = 'ARA'): Promise<any[]> {
    return this.bibleRepo.listarLivros(versao);
  }
}
