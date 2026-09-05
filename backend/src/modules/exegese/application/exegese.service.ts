import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnaliseExegetica } from '../domain/analise-exegetica.entity';

export interface ExegeseCompleta {
  versiculo: string;
  contextoImediato: string;
  contextoCapitulo: string;
  contextoLivro: string;
  contextoTestamento: string;
  contextoCanonico: string;
  estruturaLiteraria: string;
  analiseSintatica: string;
  analiseSemantica: string;
  palavrasChave: Array<{
    palavra: string;
    strong: string;
    original: string;
    definicao: string;
    uso: string;
  }>;
  figurasLinguagem: Array<{
    tipo: string;
    exemplo: string;
    explicacao: string;
  }>;
  conexoesTeologicas: {
    versiculosChave: string[];
    doutrinas: string[];
    tipologia: string[];
  };
  observacoes: string;
  fontes: string[];
}

@Injectable()
export class ExegeseService {
  private readonly logger = new Logger(ExegeseService.name);

  constructor(
    @InjectRepository(AnaliseExegetica) private analiseRepo: Repository<AnaliseExegetica>,
  ) {}

  async buscarPorVersiculo(versiculoId: string): Promise<AnaliseExegetica> {
    const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (!analise) throw new NotFoundException('Análise exegética não encontrada para este versículo');
    return analise;
  }

  async salvarAnalise(versiculoId: string, dados: Partial<AnaliseExegetica>): Promise<AnaliseExegetica> {
    let analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (analise) {
      Object.assign(analise, dados);
    } else {
      analise = this.analiseRepo.create({ versiculoId, ...dados });
    }
    return this.analiseRepo.save(analise);
  }

  async gerarAnalise(versiculoId: string, dados: Partial<AnaliseExegetica>): Promise<AnaliseExegetica> {
    const analise = this.analiseRepo.create({ versiculoId, ...dados });
    return this.analiseRepo.save(analise);
  }

  async listarContextos(versiculoId: string): Promise<any> {
    const analise = await this.buscarPorVersiculo(versiculoId);
    return {
      contextoImediato: analise.contextoImediato,
      contextoCapitulo: analise.contextoCapitulo,
      contextoLivro: analise.contextoLivro,
      contextoTestamento: analise.contextoTestamento,
      contextoCanonico: analise.contextoCanonico,
    };
  }

  async listarPorLivro(livroId: string): Promise<AnaliseExegetica[]> {
    return this.analiseRepo
      .createQueryBuilder('a')
      .where('a.versiculo_id LIKE :livroId', { livroId: `${livroId}%` })
      .orderBy('a.versiculo_id')
      .getMany();
  }

  async contarAnalises(): Promise<number> {
    return this.analiseRepo.count();
  }

  async exegeseCompleta(versiculoId: string): Promise<ExegeseCompleta | null> {
    const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (!analise) return null;

    return {
      versiculo: versiculoId,
      contextoImediato: analise.contextoImediato || '',
      contextoCapitulo: analise.contextoCapitulo || '',
      contextoLivro: analise.contextoLivro || '',
      contextoTestamento: analise.contextoTestamento || '',
      contextoCanonico: analise.contextoCanonico || '',
      estruturaLiteraria: analise.estruturaLiteraria || '',
      analiseSintatica: analise.analiseSintatica || '',
      analiseSemantica: analise.analiseSemantica || '',
      palavrasChave: Array.isArray(analise.palavrasChave) ? analise.palavrasChave : [],
      figurasLinguagem: Array.isArray(analise.figurasLinguagem) ? analise.figurasLinguagem : [],
      conexoesTeologicas: {
        versiculosChave: analise.conexoesTeologicas?.versiculosChave || [],
        doutrinas: analise.conexoesTeologicas?.doutrinas || [],
        tipologia: analise.conexoesTeologicas?.tipologia || [],
      },
      observacoes: analise.observacoes || '',
      fontes: [],
    };
  }

  async excluirAnalise(versiculoId: string): Promise<void> {
    const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
    if (analise) {
      await this.analiseRepo.remove(analise);
    }
  }

  async gerarPromptExegese(
    versiculoRef: string,
    textoVersiculo: string,
    contextoAdicional?: string,
  ): Promise<string> {
    return `Você é um exegeta bíblico acadêmico com especialização em hermenêutica e exegese bíblica. Analise o versículo ${versiculoRef}:

"${textoVersiculo}"

Forneça uma análise exegética completa em português brasileiro, organizada em:

1. CONTEXTO IMEDIATO - O que está acontecendo no versículo e nos versículos adjacentes
2. CONTEXTO DO CAPÍTULO - O tema central do capítulo e como este versículo se encaixa
3. CONTEXTO DO LIVRO - O propósito do livro e a contribuição deste versículo
4. CONTEXTO TESTAMENTO - Relevância no AT ou NT
5. CONTEXTO CANÔNICO - Conexões com outros livros bíblicos
6. ESTRUTURA LITERÁRIA - Gênero literário, estrutura retórica, padrões
7. ANÁLISE SINTÁTICA - Relações gramaticais, sujeito/verbo/complemento, conectivos
8. ANÁLISE SEMÂNTICA - Significado das palavras-chave, nuances, conotações
9. PALAVRAS-CHAVE - Lista de palavras originais com Strong's, definição e uso
10. FIGURAS DE LINGUAGEM - Metáforas, hipérboles, paralelismos, etc.
11. CONEXÕES TEOLÓGICAS - Doutrinas, tipologias, versículos paralelos
12. OBSERVAÇÕES EXEGÉTICAS - Pontos de debate acadêmico, variantes textuais

Seja rigoroso academicamente, cite fontes quando relevante, e identifique interpretações alternativas.${contextoAdicional ? `\n\nContexto adicional: ${contextoAdicional}` : ''}`;
  }
}
