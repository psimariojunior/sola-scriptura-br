import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BibleLocation } from '../../../infrastructure/database/entities/location.entity';

@Injectable()
export class AtlasService {
  private readonly logger = new Logger(AtlasService.name);

  constructor(
    @InjectRepository(BibleLocation)
    private readonly locationRepo: Repository<BibleLocation>,
  ) {}

  async mapaCompleto(): Promise<any> {
    const locais = await this.locationRepo.find({
      where: { latitude: Not(IsNullLoc()) },
    });

    return {
      tipo: 'FeatureCollection',
      features: locais
        .filter((l) => l.latitude && l.longitude)
        .map((l) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [Number(l.longitude), Number(l.latitude)] },
          properties: {
            id: l.id,
            nome: l.nome,
            tipo: l.tipo,
            descricao: l.descricao,
            referencias: l.referenciasBiblicas,
          },
        })),
    };
  }

  async mapaImperios(): Promise<any> {
    return { imperios: [] };
  }

  async mapaEvento(referencia: string): Promise<any> {
    return { evento: referencia, locais: [] };
  }
}

function Not(value: any): any {
  return { $not: value };
}

function IsNullLoc(): any {
  return { $eq: null };
}
