import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localizacao } from '../domain/localizacao.entity';
import { Rota } from '../domain/rota.entity';

@Injectable()
export class GeografiaService {
  private readonly logger = new Logger(GeografiaService.name);

  constructor(
    @InjectRepository(Localizacao) private localizacaoRepo: Repository<Localizacao>,
    @InjectRepository(Rota) private rotaRepo: Repository<Rota>,
  ) {}

  async listarLocalizacoes(tipo?: string): Promise<Localizacao[]> {
    const where = tipo ? { tipo } : {};
    return this.localizacaoRepo.find({ where, order: { nomePortugues: 'ASC' } });
  }

  async buscarLocalizacao(slug: string): Promise<Localizacao> {
    const loc = await this.localizacaoRepo.findOne({ where: { slug } });
    if (!loc) throw new NotFoundException(`Localização ${slug} não encontrada`);
    return loc;
  }

  async listarRotas(): Promise<Rota[]> {
    return this.rotaRepo.find();
  }

  async buscarProximos(latitude: number, longitude: number, raioKm = 50): Promise<Localizacao[]> {
    return this.localizacaoRepo
      .createQueryBuilder('l')
      .where(
        `earth_distance(ll_to_earth(:lat, :lng), ll_to_earth(l.latitude, l.longitude)) < :raio`,
        { lat: latitude, lng: longitude, raio: raioKm * 1000 },
      )
      .getMany();
  }
}
