import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from '../domain/livro.entity';
import { Capitulo } from '../domain/capitulo.entity';
import { Versiculo } from '../domain/versiculo.entity';
import { Palavra } from '../domain/palavra.entity';
import { Traducao } from '../domain/traducao.entity';
import { Testamento } from '../domain/testamento.entity';

@Injectable()
export class BibliaService {
  private readonly logger = new Logger(BibliaService.name);

  constructor(
    @InjectRepository(Livro) private livroRepo: Repository<Livro>,
    @InjectRepository(Capitulo) private capituloRepo: Repository<Capitulo>,
    @InjectRepository(Versiculo) private versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Palavra) private palavraRepo: Repository<Palavra>,
    @InjectRepository(Traducao) private traducaoRepo: Repository<Traducao>,
    @InjectRepository(Testamento) private testamentoRepo: Repository<Testamento>,
  ) {}

  async listarTestamentos(): Promise<Testamento[]> {
    return this.testamentoRepo.find({ order: { ordem: 'ASC' }, relations: ['livros'] });
  }

  async listarLivros(testamentoId?: string): Promise<Livro[]> {
    const where = testamentoId ? { testamentoId } : {};
    return this.livroRepo.find({ where, order: { ordemGeral: 'ASC' } });
  }

  async buscarPorSlug(slug: string): Promise<Livro> {
    const livro = await this.livroRepo.findOne({ where: { slug }, relations: ['capitulos'] });
    if (!livro) throw new NotFoundException(`Livro ${slug} não encontrado`);
    return livro;
  }

  async buscarCapitulo(livroId: string, numero: number): Promise<Capitulo> {
    const capitulo = await this.capituloRepo.findOne({
      where: { livroId, numero },
      relations: ['versiculos', 'livro'],
    });
    if (!capitulo) throw new NotFoundException(`Capítulo ${numero} não encontrado`);
    return capitulo;
  }

  async buscarVersiculo(
    livroId: string, capitulo: number, versiculo: number, traducaoId?: string,
  ): Promise<Versiculo> {
    const where: any = { livroId, capituloNumero: capitulo, numero: versiculo };
    if (traducaoId) where.traducaoId = traducaoId;
    const resultado = await this.versiculoRepo.findOne({
      where,
      relations: ['palavras', 'capitulo', 'capitulo.livro'],
    });
    if (!resultado) throw new NotFoundException(`${capitulo}:${versiculo} não encontrado`);
    return resultado;
  }

  async buscarPassagem(
    livroId: string, capitulo: number, inicio: number, fim?: number, traducaoId?: string,
  ): Promise<Versiculo[]> {
    const where: any = {
      livroId, capituloNumero: capitulo,
      numero: fim ? Between(inicio, fim) : inicio,
    };
    if (traducaoId) where.traducaoId = traducaoId;
    return this.versiculoRepo.find({
      where,
      order: { numero: 'ASC' },
      relations: ['palavras'],
    });
  }

  async listarTraducoes(): Promise<Traducao[]> {
    return this.traducaoRepo.find({ order: { nome: 'ASC' } });
  }

  async pesquisar(consulta: string, traducaoId?: string, limite = 50): Promise<Versiculo[]> {
    const query = this.versiculoRepo.createQueryBuilder('v')
      .leftJoinAndSelect('v.capitulo', 'c')
      .leftJoinAndSelect('c.livro', 'l')
      .where('v.texto ILIKE :consulta', { consulta: `%${consulta}%` });
    if (traducaoId) query.andWhere('v.traducaoId = :traducaoId', { traducaoId });
    return query.take(limite).getMany();
  }

  async buscarPalavraCompleta(palavraId: string): Promise<Palavra> {
    const palavra = await this.palavraRepo.findOne({
      where: { id: palavraId },
      relations: ['versiculo', 'versiculo.capitulo', 'versiculo.capitulo.livro'],
    });
    if (!palavra) throw new NotFoundException('Palavra não encontrada');
    return palavra;
  }
}
