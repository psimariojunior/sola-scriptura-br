import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '../busca/elasticsearch.service';

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
    private elasticsearchService: ElasticsearchService,
  ) {}

  async buscarContexto(consulta: string): Promise<ContextoRAG> {
    const [resultadosBiblia, resultadosLexico, resultadosTeologia, resultadosComentarios] =
      await Promise.all([
        this.elasticsearchService.buscarTextoCompleto('biblia', consulta, 1, 10),
        this.elasticsearchService.buscarTextoCompleto('lexico', consulta, 1, 5),
        this.elasticsearchService.buscarTextoCompleto('teologia', consulta, 1, 5),
        this.elasticsearchService.buscarTextoCompleto('comentarios', consulta, 1, 5),
      ]);

    return {
      textoBiblico: resultadosBiblia.map((r) => r.fonte['texto']),
      lexico: resultadosLexico.map((r) => r.fonte['definicao']),
      comentarios: resultadosComentarios.map((r) => r.fonte['conteudo']),
      teologia: resultadosTeologia.map((r) => r.fonte['explicacao']),
      historia: [],
      geografia: [],
      arqueologia: [],
      fontes: this.montarFontes(resultadosBiblia, resultadosLexico, resultadosTeologia, resultadosComentarios),
    };
  }

  async montarPrompt(consulta: string, contexto: ContextoRAG, tradicaoTeologica?: string): Promise<string> {
    const partes: string[] = ['Você é um especialista em estudos bíblicos acadêmicos.', ''];

    if (tradicaoTeologica) {
      partes.push(`Considere a perspectiva da tradição ${tradicaoTeologica} quando aplicável.`);
      partes.push('');
    }

    partes.push('=== CONTEXTO BÍBLICO ===');
    partes.push(contexto.textoBiblico.join('\n') || 'Nenhum texto encontrado');

    if (contexto.lexico.length > 0) {
      partes.push('');
      partes.push('=== LÉXICO / STRONG ===');
      partes.push(contexto.lexico.join('\n'));
    }

    if (contexto.teologia.length > 0) {
      partes.push('');
      partes.push('=== TEOLOGIA ===');
      partes.push(contexto.teologia.join('\n'));
    }

    if (contexto.comentarios.length > 0) {
      partes.push('');
      partes.push('=== COMENTÁRIOS ===');
      partes.push(contexto.comentarios.join('\n'));
    }

    partes.push('');
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

  private montarFontes(...grupos: any[][]): Array<{ tipo: string; texto: string; relevancia: number; referencia: string }> {
    const tipos = ['Bíblia', 'Léxico', 'Teologia', 'Comentários'];
    const fontes: Array<{ tipo: string; texto: string; relevancia: number; referencia: string }> = [];
    grupos.forEach((grupo, idx) => {
      if (grupo) {
        grupo.forEach((r) => {
          fontes.push({
            tipo: tipos[idx] || 'Desconhecido',
            texto: r.fonte?.texto || r.fonte?.conteudo || r.fonte?.definicao || '',
            relevancia: r.score || 0,
            referencia: r.fonte?.referencia || r.id || '',
          });
        });
      }
    });
    return fontes.sort((a, b) => b.relevancia - a.relevancia).slice(0, 20);
  }
}
