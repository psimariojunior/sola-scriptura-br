import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordAnalysis } from '../../../infrastructure/database/entities/word-analysis.entity';
import { LexiconEntry } from '../../../infrastructure/database/entities/lexicon.entity';

interface AnaliseLinguistica {
  palavra: string;
  idioma: string;
  lemma: string;
  transliteracao: string;
  pronuncia: string;
  morfologia: {
    classeGramatical: string;
    tempo: string;
    modo: string;
    voz: string;
    pessoa: string;
    numero: string;
    genero: string;
    caso: string;
  };
  lexico: {
    strong: string;
    definicao: string;
    significados: string[];
    ocorrencias: number;
  };
}

@Injectable()
export class LinguisticsService {
  private readonly logger = new Logger(LinguisticsService.name);

  constructor(
    @InjectRepository(WordAnalysis)
    private readonly wordRepo: Repository<WordAnalysis>,
    @InjectRepository(LexiconEntry)
    private readonly lexiconRepo: Repository<LexiconEntry>,
  ) {}

  async analisarPalavra(palavra: string, idioma?: string): Promise<AnaliseLinguistica | null> {
    const where: any = { palavra };
    if (idioma) where.idioma = idioma;

    const analise = await this.wordRepo.findOne({ where });
    if (!analise) return null;

    const lexico = analise.strong
      ? await this.lexiconRepo.findOne({ where: { strong: analise.strong } })
      : null;

    return {
      palavra: analise.palavra,
      idioma: analise.idioma,
      lemma: analise.lemma || '',
      transliteracao: analise.transliteracao || '',
      pronuncia: analise.pronuncia || '',
      morfologia: {
        classeGramatical: analise.classeGramatical || '',
        tempo: analise.tempoVerbal || '',
        modo: analise.modoVerbal || '',
        voz: analise.vozVerbal || '',
        pessoa: analise.pessoa || '',
        numero: analise.numero || '',
        genero: analise.genero || '',
        caso: analise.caso || '',
      },
      lexico: {
        strong: analise.strong || '',
        definicao: analise.definicao || lexico?.definicao || '',
        significados: lexico?.significados || [],
        ocorrencias: lexico?.totalOcorrencias || analise.frequencia || 0,
      },
    };
  }

  async buscarPorStrong(strong: string): Promise<LexiconEntry | null> {
    return this.lexiconRepo.findOne({ where: { strong } });
  }

  async buscarPorLemma(lemma: string, idioma?: string): Promise<LexiconEntry[]> {
    const where: any = { lemma };
    if (idioma) where.idioma = idioma;
    return this.lexiconRepo.find({ where });
  }

  async analisarVersiculo(textoOriginal: string): Promise<AnaliseLinguistica[]> {
    const palavras = textoOriginal.split(/\s+/).filter(Boolean);
    const resultados: AnaliseLinguistica[] = [];

    for (const palavra of palavras) {
      const analise = await this.analisarPalavra(palavra);
      if (analise) resultados.push(analise);
    }

    return resultados;
  }
}
