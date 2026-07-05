import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Versiculo } from '../../modules/biblia/domain/versiculo.entity';
import { Doutrina } from '../../modules/teologia/domain/doutrina.entity';
import { PalavraGrega } from '../../modules/grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../../modules/hebraico/domain/palavra-hebraica.entity';
import { Personagem } from '../../modules/personagens/domain/personagem.entity';
import { ContextoHistorico } from '../../modules/historia/domain/contexto-historico.entity';
import { Localizacao } from '../../modules/geografia/domain/localizacao.entity';
import { Verbete } from '../../modules/dicionario/domain/verbete.entity';
import { Livro } from '../../modules/biblia/domain/livro.entity';

interface ContextoRAG {
  textoBiblico: string[];
  lexico: string[];
  comentarios: string[];
  teologia: string[];
  historia: string[];
  geografia: string[];
  arqueologia: string[];
  fontes: Array<{ tipo: string; texto: string; relevancia: number; referencia: string }>;
}

@Injectable()
export class RAGService {
  private readonly logger = new Logger(RAGService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(Versiculo) private versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Doutrina) private doutrinaRepo: Repository<Doutrina>,
    @InjectRepository(PalavraGrega) private gregoRepo: Repository<PalavraGrega>,
    @InjectRepository(PalavraHebraica) private hebraicoRepo: Repository<PalavraHebraica>,
    @InjectRepository(Personagem) private personagemRepo: Repository<Personagem>,
    @InjectRepository(ContextoHistorico) private historiaRepo: Repository<ContextoHistorico>,
    @InjectRepository(Localizacao) private geografiaRepo: Repository<Localizacao>,
    @InjectRepository(Verbete) private dicionarioRepo: Repository<Verbete>,
    @InjectRepository(Livro) private livroRepo: Repository<Livro>,
  ) {}

  async buscarContexto(consulta: string): Promise<ContextoRAG> {
    const termos = this.extrairTermos(consulta);
    const contexto: ContextoRAG = {
      textoBiblico: [],
      lexico: [],
      comentarios: [],
      teologia: [],
      historia: [],
      geografia: [],
      arqueologia: [],
      fontes: [],
    };

    // Buscar versículos relevantes
    const versiculos = await this.buscarVersiculos(termos);
    contexto.textoBiblico = versiculos.map(v => v.texto);
    versiculos.forEach(v => {
      contexto.fontes.push({
        tipo: 'versiculo',
        texto: v.texto,
        relevancia: 0.9,
        referencia: `${v.livro?.nome || ''} ${v.capituloNumero}:${v.numero}`,
      });
    });

    // Buscar léxico grego/hebraico
    const lexico = await this.buscarLexico(termos);
    contexto.lexico = lexico.map(l => `${l.strong} - ${l.palavraOriginal} (${l.transliteracao}): ${l.definicaoCurta}`);
    lexico.forEach(l => {
      contexto.fontes.push({
        tipo: 'lexico',
        texto: `${l.strong} - ${l.palavraOriginal}: ${l.definicaoCurta}`,
        relevancia: 0.8,
        referencia: `Strong ${l.strong}`,
      });
    });

    // Buscar doutrinas teológicas
    const doutrinas = await this.buscarDoutrinas(termos);
    contexto.teologia = doutrinas.map(d => `${d.nome}: ${d.definicao || d.explicacao || ''}`);
    doutrinas.forEach(d => {
      contexto.fontes.push({
        tipo: 'teologia',
        texto: `${d.nome}: ${d.definicao || d.explicacao || ''}`,
        relevancia: 0.85,
        referencia: `Doutrina: ${d.nome}`,
      });
    });

    // Buscar personagens bíblicos
    const personagens = await this.buscarPersonagens(termos);
    personagens.forEach(p => {
      contexto.historia.push(`${p.nomePortugues} (${p.nomeHebraico || p.nomeGrego || ''}): ${p.biografia || ''}`);
      contexto.fontes.push({
        tipo: 'personagem',
        texto: `${p.nomePortugues}: ${p.biografia || ''}`,
        relevancia: 0.7,
        referencia: `Personagem: ${p.nomePortugues}`,
      });
    });

    // Buscar contexto histórico
    const historico = await this.buscarHistorico(termos);
    historico.forEach(h => {
      const titulo = `${h.entidadeTipo} - ${h.dataEstimada || ''}`;
      contexto.historia.push(`${titulo}: ${h.contextoPolitico || h.contextoReligioso || ''}`);
      contexto.fontes.push({
        tipo: 'historia',
        texto: `${titulo}: ${h.contextoPolitico || h.contextoReligioso || ''}`,
        relevancia: 0.75,
        referencia: `História: ${titulo}`,
      });
    });

    // Buscar localizações geográficas
    const geografia = await this.buscarGeografia(termos);
    geografia.forEach(g => {
      contexto.geografia.push(`${g.nome}: ${g.descricao || ''} (${g.latitude}, ${g.longitude})`);
      contexto.fontes.push({
        tipo: 'geografia',
        texto: `${g.nome}: ${g.descricao || ''}`,
        relevancia: 0.65,
        referencia: `Geografia: ${g.nome}`,
      });
    });

    // Buscar verbetes do dicionário
    const dicionario = await this.buscarDicionario(termos);
    dicionario.forEach(d => {
      contexto.comentarios.push(`${d.titulo}: ${d.definicao || d.explicacao || ''}`);
      contexto.fontes.push({
        tipo: 'dicionario',
        texto: `${d.titulo}: ${d.definicao || d.explicacao || ''}`,
        relevancia: 0.7,
        referencia: `Dicionário: ${d.titulo}`,
      });
    });

    return contexto;
  }

  async montarPrompt(consulta: string, contexto: ContextoRAG, tradicaoTeologica?: string): Promise<string> {
    const partes: string[] = ['Você é um especialista em estudos bíblicos acadêmicos.', ''];

    if (tradicaoTeologica) {
      partes.push(`Considere a perspectiva da tradição ${tradicaoTeologica} quando aplicável.`);
      partes.push('');
    }

    if (contexto.textoBiblico.length > 0) {
      partes.push('=== CONTEXTO BÍBLICO ===');
      partes.push(contexto.textoBiblico.join('\n'));
      partes.push('');
    }

    if (contexto.lexico.length > 0) {
      partes.push('=== LÉXICO / STRONG ===');
      partes.push(contexto.lexico.join('\n'));
      partes.push('');
    }

    if (contexto.teologia.length > 0) {
      partes.push('=== TEOLOGIA ===');
      partes.push(contexto.teologia.join('\n'));
      partes.push('');
    }

    if (contexto.historia.length > 0) {
      partes.push('=== HISTÓRIA / PERSONAGENS ===');
      partes.push(contexto.historia.join('\n'));
      partes.push('');
    }

    if (contexto.geografia.length > 0) {
      partes.push('=== GEOGRAFIA ===');
      partes.push(contexto.geografia.join('\n'));
      partes.push('');
    }

    if (contexto.comentarios.length > 0) {
      partes.push('=== COMENTÁRIOS / DICIONÁRIO ===');
      partes.push(contexto.comentarios.join('\n'));
      partes.push('');
    }

    partes.push('=== PERGUNTA DO USUÁRIO ===');
    partes.push(consulta);
    partes.push('');
    partes.push('Instruções:');
    partes.push('- Responda em português brasileiro');
    partes.push('- Baseie-se NO CONTEXTO fornecido acima');
    partes.push('- Se não houver contexto suficiente, indique isso claramente');
    partes.push('- Cite fontes e referências bíblicas sempre que possível');
    partes.push('- Identifique claramente interpretações específicas de tradições teológicas');
    partes.push('- Seja acadêmico mas acessível');

    return partes.join('\n');
  }

  private extrairTermos(consulta: string): string[] {
    const palavrasComuns = new Set([
      'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
      'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
      'por', 'para', 'com', 'sem', 'sob', 'sobre',
      'e', 'ou', 'mas', 'porém', 'entretanto',
      'que', 'qual', 'quais', 'quem', 'onde', 'como', 'quando',
      'é', 'são', 'esta', 'estão', 'foi', 'foram',
      'isto', 'isso', 'aquilo', 'esse', 'essa', 'esse',
      'perguntar', 'explique', 'fale', 'conte', 'descreva',
    ]);

    return consulta
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(p => p.length > 2 && !palavrasComuns.has(p))
      .slice(0, 10);
  }

  private async buscarVersiculos(termos: string[]): Promise<Versiculo[]> {
    if (termos.length === 0) return [];
    
    const conditions = termos.map(termo => `v.texto ILIKE :termo${termos.indexOf(termo)}`);
    const parameters: any = {};
    termos.forEach((termo, i) => {
      parameters[`termo${i}`] = `%${termo}%`;
    });

    return this.versiculoRepo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.livro', 'livro')
      .where(conditions.join(' OR '), parameters)
      .limit(5)
      .getMany();
  }

  private async buscarLexico(termos: string[]): Promise<(PalavraGrega | PalavraHebraica)[]> {
    if (termos.length === 0) return [];

    const gregos = await this.gregoRepo
      .createQueryBuilder('g')
      .where(
        termos.map((t, i) => `(g.definicao_curta ILIKE :t${i} OR g.lemma ILIKE :t${i} OR g.transliteracao ILIKE :t${i})`).join(' OR "),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();

    const hebraicos = await this.hebraicoRepo
      .createQueryBuilder('h')
      .where(
        termos.map((t, i) => `(h.definicao_curta ILIKE :t${i} OR h.lemma ILIKE :t${i} OR h.transliteracao ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();

    return [...gregos, ...hebraicos];
  }

  private async buscarDoutrinas(termos: string[]): Promise<Doutrina[]> {
    if (termos.length === 0) return [];

    return this.doutrinaRepo
      .createQueryBuilder('d')
      .where(
        termos.map((t, i) => `(d.nome ILIKE :t${i} OR d.definicao ILIKE :t${i} OR d.explicacao ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();
  }

  private async buscarPersonagens(termos: string[]): Promise<Personagem[]> {
    if (termos.length === 0) return [];

    return this.personagemRepo
      .createQueryBuilder('p')
      .where(
        termos.map((t, i) => `(p.nome_portugues ILIKE :t${i} OR p.nome_hebraico ILIKE :t${i} OR p.nome_grego ILIKE :t${i} OR p.biografia ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();
  }

  private async buscarHistorico(termos: string[]): Promise<ContextoHistorico[]> {
    if (termos.length === 0) return [];

    return this.historiaRepo
      .createQueryBuilder('h')
      .where(
        termos.map((t, i) => `(h.contexto_politico ILIKE :t${i} OR h.contexto_religioso ILIKE :t${i} OR h.contexto_cultural ILIKE :t${i} OR h.significado_teologico ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();
  }

  private async buscarGeografia(termos: string[]): Promise<Localizacao[]> {
    if (termos.length === 0) return [];

    return this.geografiaRepo
      .createQueryBuilder('g')
      .where(
        termos.map((t, i) => `(g.nome ILIKE :t${i} OR g.descricao ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();
  }

  private async buscarDicionario(termos: string[]): Promise<Verbete[]> {
    if (termos.length === 0) return [];

    return this.dicionarioRepo
      .createQueryBuilder('v')
      .where(
        termos.map((t, i) => `(v.titulo ILIKE :t${i} OR v.definicao ILIKE :t${i} OR v.explicacao ILIKE :t${i})`).join(' OR '),
        Object.fromEntries(termos.map((t, i) => [`t${i}`, `%${t}%`]))
      )
      .limit(3)
      .getMany();
  }
}
