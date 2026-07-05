import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Doctrine } from '../../../infrastructure/database/entities/doctrine.entity';
import { BibleService } from '../../bible/application/bible.service';

interface AnaliseTeologica {
  doutrinasEnvolvidas: string[];
  categoriasTeologicas: Record<string, any>;
  tradicoes: Record<string, string>;
  referenciasSistematicas: any[];
}

@Injectable()
export class TheologyService {
  private readonly logger = new Logger(TheologyService.name);

  private readonly categoriasSistematicas = {
    Teontologia: ['Deus', 'atributos', 'trindade', 'soberania'],
    Cristologia: ['Cristo', 'Jesus', 'encarnação', 'redenção', 'ressurreição'],
    Pneumatologia: ['Espírito Santo', 'dons', 'fruto', 'batismo'],
    Bibliologia: ['Escritura', 'inspiração', 'canon', 'revelação'],
    Soteriologia: ['salvação', 'graça', 'fé', 'justificação', 'santificação'],
    Hamartiologia: ['pecado', 'queda', 'pecado original', 'transgressão'],
    Antropologia: ['homem', 'criação', 'imagem', 'alma', 'consciência'],
    Eclesiologia: ['igreja', 'corpo', 'adoração', 'sacramentos', 'ministério'],
    Escatologia: ['fim', 'volta', 'juízo', 'ressurreição', 'reino'],
    Angelologia: ['anjos', 'arcanjos', 'querubins', 'serafins'],
    Demonologia: ['demônios', 'satanás', 'mal', 'possessão'],
  };

  private readonly tradicoesTeologicas = {
    arminiana: 'Teologia Arminiana - Ênfase no livre-arbítrio, graça preveniente, eleição condicional',
    reformada: 'Teologia Reformada - Ênfase na soberania divina, predestinação, graça irresistível',
    batista: 'Teologia Batista - Ênfase no batismo por imersão, autonomia local, liberdade religiosa',
    pentecostal: 'Teologia Pentecostal - Ênfase nos dons do Espírito, batismo no Espírito, glossolalia',
    wesleyana: 'Teologia Wesleyana - Ênfase na santificação inteira, graça preveniente, perfeição cristã',
  };

  constructor(
    @InjectRepository(Doctrine)
    private readonly doctrineRepo: Repository<Doctrine>,
    private readonly bibleService: BibleService,
  ) {}

  async analisarTeologia(
    livro: string,
    capitulo: number,
    versiculo: number,
    tradicao?: string,
  ): Promise<AnaliseTeologica> {
    const versiculoData = await this.bibleService.buscarVersiculo({ livro, capitulo, versiculo });
    const texto = versiculoData.texto;

    const doutrinasEnvolvidas = this.identificarDoutrinasNoTexto(texto);
    const categorias = this.categorizarTeologicamente(texto);
    const doutrinasBD = await this.buscarDoutrinas(doutrinasEnvolvidas, tradicao);

    return {
      doutrinasEnvolvidas,
      categoriasTeologicas: categorias,
      tradicoes: tradicao ? { [tradicao]: (this.tradicoesTeologicas as Record<string, string>)[tradicao] || '' } : this.tradicoesTeologicas,
      referenciasSistematicas: doutrinasBD,
    };
  }

  async buscarDoutrina(nome: string): Promise<Doctrine | null> {
    return this.doctrineRepo.findOne({ where: { nome } });
  }

  async listarDoutrinas(categoria?: string): Promise<Doctrine[]> {
    const where: any = {};
    if (categoria) where.categoria = categoria;
    return this.doctrineRepo.find({ where, order: { nome: 'ASC' } });
  }

  private identificarDoutrinasNoTexto(texto: string): string[] {
    const doutrinas: string[] = [];
    for (const [categoria, palavras] of Object.entries(this.categoriasSistematicas)) {
      if (palavras.some((p) => texto.toLowerCase().includes(p.toLowerCase()))) {
        doutrinas.push(categoria);
      }
    }
    return doutrinas;
  }

  private categorizarTeologicamente(texto: string): Record<string, string[]> {
    const categorias: Record<string, string[]> = {};
    for (const [cat, palavras] of Object.entries(this.categoriasSistematicas)) {
      const encontradas = palavras.filter((p) => texto.toLowerCase().includes(p.toLowerCase()));
      if (encontradas.length > 0) {
        categorias[cat] = encontradas;
      }
    }
    return categorias;
  }

  private async buscarDoutrinas(
    nomes: string[],
    tradicao?: string,
  ): Promise<any[]> {
    if (nomes.length === 0) return [];
    const doutrinas = await this.doctrineRepo.find({ where: { nome: In(nomes) } });
    return doutrinas.map((d) => ({
      nome: d.nome,
      categoria: d.categoria,
      descricao: d.descricao,
      tradicoes: tradicao ? { [tradicao]: d.tradicoes?.[tradicao] } : d.tradicoes,
    }));
  }
}
