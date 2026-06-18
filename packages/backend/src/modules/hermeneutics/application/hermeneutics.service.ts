import { Injectable, Logger } from '@nestjs/common';
import { BibleService } from '../../bible/application/bible.service';

interface AnaliseHermeneutica {
  generoLiterario: string;
  principiosInterpretacao: string[];
  contextoHistorico: ContextoHistorico;
  desafiosInterpretativos: string[];
  aplicacao: string[];
}

interface ContextoHistorico {
  data: string;
  autor: string;
  destinatarios: string;
  situacaoPolitica: string;
  contextoCultural: string;
}

const GENEROS_LITERARIOS: Record<string, { nome: string; principios: string[] }> = {
  narrative: {
    nome: 'Narrativa Histórica',
    principios: [
      'Interpretar à luz do propósito teológico do autor',
      'Considerar o progresso da revelação',
      'Identificar o conflito central e sua resolução',
      'Extrair princípios atemporais sem alegorizar detalhes',
    ],
  },
  poetry: {
    nome: 'Poesia',
    principios: [
      'Reconhecer o paralelismo hebraico (sinonímico, antitético, sintético)',
      'Interpretar linguagem figurada e metáforas',
      'Considerar o contexto emocional e litúrgico',
    ],
  },
  prophecy: {
    nome: 'Profecia',
    principios: [
      'Distinguir entre profecias de cumprimento imediato e futuras',
      'Considerar o princípio do duplo cumprimento',
      'Verificar cumprimentos no NT',
      'Interpretar linguagem apocalíptica com cuidado',
    ],
  },
  law: {
    nome: 'Lei',
    principios: [
      'Distinguir entre lei moral, civil e cerimonial',
      'Considerar o propósito pedagógico da lei',
      'Aplicar princípios morais, não obrigações civis/cerimoniais',
    ],
  },
  wisdom: {
    nome: 'Sabedoria',
    principios: [
      'Reconhecer provérbios como verdades gerais, não promessas absolutas',
      'Considerar o contexto cultural do antigo Oriente Próximo',
      'Interpretar à luz do temor do Senhor como princípio fundamental',
    ],
  },
  gospel: {
    nome: 'Evangelho',
    principios: [
      'Considerar o propósito teológico de cada evangelista',
      'Examinar paralelos sinóticos',
      'Contextualizar ensinos de Jesus',
      'Diferenciar entre instruções pré-pascoal e pós-pentecostes',
    ],
  },
  epistle: {
    nome: 'Epístola',
    principios: [
      'Considerar a situação específica da igreja destinatária',
      'Identificar o problema que o autor está abordando',
      'Traçar o argumento lógico do texto',
      'Aplicar doutrina à prática',
    ],
  },
  apocalyptic: {
    nome: 'Apocalíptico',
    principios: [
      'Interpretar simbolismo à luz do AT e judaísmo',
      'Não buscar correspondências literais para cada símbolo',
      'Considerar o contexto de perseguição',
      'Identificar o tema central da soberania divina',
    ],
  },
};

@Injectable()
export class HermeneuticsService {
  private readonly logger = new Logger(HermeneuticsService.name);

  constructor(private readonly bibleService: BibleService) {}

  async analisarHermeneutica(
    livro: string,
    capitulo: number,
    versiculo: number,
    versao = 'ARA',
  ): Promise<AnaliseHermeneutica> {
    const contexto = await this.bibleService.buscarContexto(
      { livro, capitulo, versiculo },
      versao,
    );

    const generoInfo = this.identificarGenero(contexto.livro.genero);

    return {
      generoLiterario: generoInfo.nome,
      principiosInterpretacao: generoInfo.principios,
      contextoHistorico: this.gerarContextoHistorico(livro, capitulo),
      desafiosInterpretativos: this.gerarDesafios(livro, capitulo, versiculo, contexto.versiculo.texto),
      aplicacao: this.gerarAplicacao(contexto.versiculo.texto, generoInfo),
    };
  }

  private identificarGenero(genero: string): { nome: string; principios: string[] } {
    return GENEROS_LITERARIOS[genero] || GENEROS_LITERARIOS.narrative;
  }

  private gerarContextoHistorico(livro: string, capitulo: number): ContextoHistorico {
    return {
      data: 'Contexto histórico a ser preenchido',
      autor: 'A ser determinado pela tradição',
      destinatarios: 'A ser identificado',
      situacaoPolitica: 'Contexto do período',
      contextoCultural: 'Costumes e práticas do período',
    };
  }

  private gerarDesafios(livro: string, capitulo: number, versiculo: number, texto: string): string[] {
    const desafios: string[] = [];
    if (texto.includes(':')) desafios.push('Possível uso de linguagem figurada');
    if (texto.includes(';')) desafios.push('Estrutura complexa de argumentação');
    return desafios;
  }

  private gerarAplicacao(texto: string, generoInfo: { nome: string }): string[] {
    return [
      `Com base no gênero ${generoInfo.nome}, extraia princípios teológicos atemporais`,
      'Considere a diferença entre descrição cultural e prescrição normativa',
      'Aplique o texto à luz do progresso da revelação em Cristo',
    ];
  }
}
