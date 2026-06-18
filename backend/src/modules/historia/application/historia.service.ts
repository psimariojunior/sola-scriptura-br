import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContextoHistorico } from '../domain/contexto-historico.entity';

@Injectable()
export class HistoriaService {
  private readonly logger = new Logger(HistoriaService.name);

  constructor(
    @InjectRepository(ContextoHistorico) private contextoRepo: Repository<ContextoHistorico>,
  ) {}

  async buscarPorEntidade(tipo: string, id: string): Promise<ContextoHistorico> {
    const contexto = await this.contextoRepo.findOne({
      where: { entidadeTipo: tipo, entidadeId: id },
    });
    if (!contexto) {
      throw new NotFoundException(`Contexto histórico não encontrado para ${tipo}:${id}`);
    }
    return contexto;
  }

  async buscarPorLivro(livroId: string): Promise<ContextoHistorico> {
    return this.buscarPorEntidade('livro', livroId);
  }
}
