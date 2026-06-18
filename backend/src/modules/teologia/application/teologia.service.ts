import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doutrina } from '../domain/doutrina.entity';
import { CategoriaDoutrina } from '../domain/categoria-doutrina.entity';

@Injectable()
export class TeologiaService {
  private readonly logger = new Logger(TeologiaService.name);

  constructor(
    @InjectRepository(Doutrina) private doutrinaRepo: Repository<Doutrina>,
    @InjectRepository(CategoriaDoutrina) private categoriaRepo: Repository<CategoriaDoutrina>,
  ) {}

  async listarCategorias(): Promise<CategoriaDoutrina[]> {
    return this.categoriaRepo.find({
      order: { ordem: 'ASC' },
      relations: ['doutrinas'],
    });
  }

  async buscarDoutrina(slug: string): Promise<Doutrina> {
    const doutrina = await this.doutrinaRepo.findOne({
      where: { slug },
      relations: ['categoria', 'referencias'],
    });
    if (!doutrina) throw new NotFoundException(`Doutrina ${slug} não encontrada`);
    return doutrina;
  }

  async buscarPorVersiculo(versiculoId: string): Promise<any[]> {
    return this.doutrinaRepo.createQueryBuilder('d')
      .innerJoin('d.referencias', 'dv')
      .where('dv.versiculoId = :versiculoId', { versiculoId })
      .orderBy('dv.peso', 'DESC')
      .getMany();
  }

  async relacionarTexto(versiculoId: string): Promise<any> {
    const doutrinas = await this.buscarPorVersiculo(versiculoId);
    const categorias = await this.listarCategorias();
    const mapa = {};
    for (const cat of categorias) {
      mapa[cat.slug] = { categoria: cat, doutrinas: [] };
    }
    for (const doutrina of doutrinas) {
      const slug = doutrina.categoria?.slug || 'outros';
      if (!mapa[slug]) mapa[slug] = { categoria: null, doutrinas: [] };
      mapa[slug].doutrinas.push(doutrina);
    }
    return mapa;
  }
}
