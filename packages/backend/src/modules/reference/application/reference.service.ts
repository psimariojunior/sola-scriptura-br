import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrossReference } from '../../../infrastructure/database/entities/cross-reference.entity';

interface ReferenciasCruzadas {
  referencia: string;
  paralelos: Array<{ referencia: string; tipo: string; descricao: string }>;
  profecias: Array<{ referencia: string; tipo: string; descricao: string }>;
  cumprimentos: Array<{ referencia: string; tipo: string; descricao: string }>;
  tematicas: Array<{ referencia: string; tipo: string; descricao: string }>;
}

@Injectable()
export class ReferenceService {
  private readonly logger = new Logger(ReferenceService.name);

  constructor(
    @InjectRepository(CrossReference)
    private readonly refRepo: Repository<CrossReference>,
  ) {}

  async buscarReferencias(
    livro: string,
    capitulo: number,
    versiculo: number,
  ): Promise<ReferenciasCruzadas> {
    const referencia = `${this.abreviarLivro(livro)} ${capitulo}:${versiculo}`;

    const todas = await this.refRepo.find({
      where: [{ origemRef: referencia }, { destinoRef: referencia }],
      order: { relevancia: 'DESC' },
    });

    const paralelos = todas
      .filter((r) => r.tipo === 'paralelo')
      .map((r) => ({
        referencia: r.origemRef === referencia ? r.destinoRef : r.origemRef,
        tipo: r.tipo,
        descricao: r.descricao || '',
      }));

    const profecias = todas
      .filter((r) => r.tipo === 'profecia' || r.tipo === 'cumprimento')
      .map((r) => ({
        referencia: r.origemRef === referencia ? r.destinoRef : r.origemRef,
        tipo: r.tipo,
        descricao: r.descricao || '',
      }));

    return {
      referencia,
      paralelos,
      profecias,
      cumprimentos: profecias.filter((p) => p.tipo === 'cumprimento'),
      tematicas: todas
        .filter((r) => r.tipo === 'tematico')
        .map((r) => ({
          referencia: r.origemRef === referencia ? r.destinoRef : r.origemRef,
          tipo: r.tipo,
          descricao: r.descricao || '',
        })),
    };
  }

  async criarReferencia(data: {
    origemRef: string;
    destinoRef: string;
    tipo: string;
    descricao?: string;
    relevancia?: number;
  }): Promise<CrossReference> {
    const ref = this.refRepo.create(data);
    return this.refRepo.save(ref);
  }

  async buscarReferenciasEmMassa(refs: string[]): Promise<CrossReference[]> {
    return this.refRepo
      .createQueryBuilder('r')
      .where('r.origemRef IN (:...refs)', { refs })
      .orWhere('r.destinoRef IN (:...refs)', { refs })
      .orderBy('r.relevancia', 'DESC')
      .getMany();
  }

  private abreviarLivro(livro: string): string {
    const mapa: Record<string, string> = {
      'Gênesis': 'Gn', 'Êxodo': 'Ex', 'Levítico': 'Lv', 'Números': 'Nm',
      'Deuteronômio': 'Dt', 'Josué': 'Js', 'Juízes': 'Jz', 'Rute': 'Rt',
      '1 Samuel': '1Sm', '2 Samuel': '2Sm', '1 Reis': '1Rs', '2 Reis': '2Rs',
      '1 Crônicas': '1Cr', '2 Crônicas': '2Cr', 'Esdras': 'Ed', 'Neemias': 'Ne',
      'Ester': 'Et', 'Jó': 'Jó', 'Salmos': 'Sl', 'Provérbios': 'Pv',
      'Eclesiastes': 'Ec', 'Cantares': 'Ct', 'Isaías': 'Is', 'Jeremias': 'Jr',
      'Lamentações': 'Lm', 'Ezequiel': 'Ez', 'Daniel': 'Dn', 'Oséias': 'Os',
      'Joel': 'Jl', 'Amós': 'Am', 'Obadias': 'Ob', 'Jonas': 'Jn',
      'Miquéias': 'Mq', 'Naum': 'Na', 'Habacuque': 'Hc', 'Sofonias': 'Sf',
      'Ageu': 'Ag', 'Zacarias': 'Zc', 'Malaquias': 'Ml',
      'Mateus': 'Mt', 'Marcos': 'Mc', 'Lucas': 'Lc', 'João': 'Jo',
      'Atos': 'At', 'Romanos': 'Rm', '1 Coríntios': '1Co', '2 Coríntios': '2Co',
      'Gálatas': 'Gl', 'Efésios': 'Ef', 'Filipenses': 'Fp', 'Colossenses': 'Cl',
      '1 Tessalonicenses': '1Ts', '2 Tessalonicenses': '2Ts',
      '1 Timóteo': '1Tm', '2 Timóteo': '2Tm', 'Tito': 'Tt', 'Filemom': 'Fm',
      'Hebreus': 'Hb', 'Tiago': 'Tg', '1 Pedro': '1Pe', '2 Pedro': '2Pe',
      '1 João': '1Jo', '2 João': '2Jo', '3 João': '3Jo', 'Judas': 'Jd',
      'Apocalipse': 'Ap',
    };
    return mapa[livro] || livro;
  }
}
