import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BibleLocation } from '../../../infrastructure/database/entities/location.entity';

interface LocalMapa {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  descricao: string;
}

interface Rota {
  nome: string;
  paradas: LocalMapa[];
  cor: string;
}

const ROTAS_BIBLICAS: Record<string, string[]> = {
  'Viagens Missionárias de Paulo': [
    'Antioquia', 'Selêucia', 'Chipre', 'Perge', 'Antioquia da Pisídia',
    'Icônio', 'Listra', 'Derbe', 'Trôade', 'Filipos', 'Tessalônica',
    'Bereia', 'Atenas', 'Corinto', 'Éfeso', 'Jerusalém', 'Roma',
  ],
  'Êxodo': [
    'Ramessés', 'Sucote', 'Etã', 'Pi-Hairote', 'Mar Vermelho',
    'Deserto de Sur', 'Mara', 'Elim', 'Deserto de Sim', 'Rafidim',
    'Monte Sinai', 'Cades-Barneia', 'Monte Hor', 'Vale do Jordão',
  ],
  'Caminhada de Abraão': [
    'Ur dos Caldeus', 'Harã', 'Siquém', 'Betel', 'Egito',
    'Neguebe', 'Hebrom', 'Gerar', 'Moriá',
  ],
};

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);

  constructor(
    @InjectRepository(BibleLocation)
    private readonly locationRepo: Repository<BibleLocation>,
  ) {}

  async listarLocais(tipo?: string): Promise<LocalMapa[]> {
    const where: any = {};
    if (tipo) where.tipo = tipo;

    const locais = await this.locationRepo.find({ where });

    return locais
      .filter((l) => l.latitude && l.longitude)
      .map((l) => ({
        id: l.id,
        nome: l.nome,
        latitude: Number(l.latitude),
        longitude: Number(l.longitude),
        tipo: l.tipo || '',
        descricao: l.descricao || '',
      }));
  }

  async buscarLocal(nome: string): Promise<LocalMapa | null> {
    const local = await this.locationRepo.findOne({ where: { nome } });
    if (!local || !local.latitude || !local.longitude) return null;

    return {
      id: local.id,
      nome: local.nome,
      latitude: Number(local.latitude),
      longitude: Number(local.longitude),
      tipo: local.tipo || '',
      descricao: local.descricao || '',
    };
  }

  async obterRotas(): Promise<Rota[]> {
    const rotas: Rota[] = [];

    for (const [nomeRota, nomesLocais] of Object.entries(ROTAS_BIBLICAS)) {
      const paradas: LocalMapa[] = [];

      for (const nomeLocal of nomesLocais) {
        const local = await this.buscarLocal(nomeLocal);
        if (local) paradas.push(local);
      }

      const cores = ['#FF6B35', '#004E89', '#1A936F', '#C1121F', '#7209B7'];
      const cor = cores[rotas.length % cores.length];

      rotas.push({ nome: nomeRota, paradas, cor });
    }

    return rotas;
  }
}
