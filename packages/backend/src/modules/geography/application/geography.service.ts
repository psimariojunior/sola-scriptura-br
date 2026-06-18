import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BibleLocation } from '../../../infrastructure/database/entities/location.entity';

interface InfoGeografica {
  local: BibleLocation;
  significado: string;
  eventosRelacionados: string[];
  referenciasBiblicas: string[];
  importanciaTeologica: string;
}

@Injectable()
export class GeographyService {
  private readonly logger = new Logger(GeographyService.name);

  constructor(
    @InjectRepository(BibleLocation)
    private readonly locationRepo: Repository<BibleLocation>,
  ) {}

  async buscarLocal(nome: string): Promise<InfoGeografica | null> {
    const local = await this.locationRepo.findOne({ where: { nome } });
    if (!local) return null;

    return {
      local,
      significado: local.significado || '',
      eventosRelacionados: [],
      referenciasBiblicas: local.referenciasBiblicas || [],
      importanciaTeologica: this.gerarImportanciaTeologica(local),
    };
  }

  async listarPorTipo(tipo: string): Promise<BibleLocation[]> {
    return this.locationRepo.find({ where: { tipo }, order: { nome: 'ASC' } });
  }

  async buscarProximos(latitude: number, longitude: number, raioKm = 50): Promise<BibleLocation[]> {
    const locais = await this.locationRepo.find({
      where: { latitude: Not(IsNull()), longitude: Not(IsNull()) },
    });

    return locais.filter((l) => {
      if (!l.latitude || !l.longitude) return false;
      const distancia = this.calcularDistancia(latitude, longitude, Number(l.latitude), Number(l.longitude));
      return distancia <= raioKm;
    });
  }

  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private gerarImportanciaTeologica(local: BibleLocation): string {
    return `${local.nome} tem significado teológico como local mencionado nas Escrituras. ${local.descricao || ''}`;
  }
}

function Not(value: any): any {
  return { $not: value };
}

function IsNull(): any {
  return { $eq: null };
}
