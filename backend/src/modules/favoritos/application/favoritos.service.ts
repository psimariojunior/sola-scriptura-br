import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from '../domain/favorito.entity';

@Injectable()
export class FavoritosService {
  private readonly logger = new Logger(FavoritosService.name);

  constructor(
    @InjectRepository(Favorito) private favoritoRepo: Repository<Favorito>,
  ) {}

  async listar(usuarioId: string): Promise<Favorito[]> {
    return this.favoritoRepo.find({
      where: { usuarioId },
      order: { ordem: 'ASC' },
    });
  }

  async adicionar(usuarioId: string, versiculoId: string, etiquetas?: string[], notaPessoal?: string): Promise<Favorito> {
    const favorito = this.favoritoRepo.create({
      usuarioId, versiculoId, etiquetas, notaPessoal,
    });
    return this.favoritoRepo.save(favorito);
  }

  async remover(usuarioId: string, favoritoId: string): Promise<void> {
    await this.favoritoRepo.delete({ id: favoritoId, usuarioId });
  }

  async reordenar(usuarioId: string, favoritoId: string, novaOrdem: number): Promise<void> {
    await this.favoritoRepo.update({ id: favoritoId, usuarioId }, { ordem: novaOrdem });
  }
}
