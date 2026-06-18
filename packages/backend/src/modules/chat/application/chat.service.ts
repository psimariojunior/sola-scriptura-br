import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../../ai/application/ai.service';
import { RagService } from '../../rag/application/rag.service';

interface MensagemChat {
  id: string;
  papel: 'usuario' | 'assistente';
  conteudo: string;
  timestamp: Date;
}

interface SessaoChat {
  id: string;
  mensagens: MensagemChat[];
  contexto: string;
}

interface RespostaChat {
  mensagem: string;
  fontes: string[];
  referencias: string[];
  sugestoes: string[];
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly sessoes: Map<string, SessaoChat> = new Map();

  constructor(
    private readonly aiService: AiService,
    private readonly ragService: RagService,
  ) {}

  async enviarMensagem(
    sessaoId: string,
    mensagem: string,
    tradicao?: string,
  ): Promise<RespostaChat> {
    if (!this.sessoes.has(sessaoId)) {
      this.sessoes.set(sessaoId, {
        id: sessaoId,
        mensagens: [],
        contexto: '',
      });
    }

    const sessao = this.sessoes.get(sessaoId)!;
    sessao.mensagens.push({
      id: crypto.randomUUID(),
      papel: 'usuario',
      conteudo: mensagem,
      timestamp: new Date(),
    });

    const resposta = await this.aiService.gerarResposta(mensagem, tradicao);

    sessao.mensagens.push({
      id: crypto.randomUUID(),
      papel: 'assistente',
      conteudo: resposta.resposta,
      timestamp: new Date(),
    });

    const sugestoes = await this.gerarSugestoes(mensagem);

    return {
      mensagem: resposta.resposta,
      fontes: resposta.fontesUtilizadas,
      referencias: resposta.referenciasCruzadas || [],
      sugestoes,
    };
  }

  async historico(sessaoId: string): Promise<MensagemChat[]> {
    return this.sessoes.get(sessaoId)?.mensagens || [];
  }

  async novaSessao(): Promise<string> {
    const id = crypto.randomUUID();
    this.sessoes.set(id, {
      id,
      mensagens: [],
      contexto: '',
    });
    return id;
  }

  private async gerarSugestoes(pergunta: string): Promise<string[]> {
    const tiposPergunta: Record<string, string[]> = {
      exegese: ['Explique o grego/hebraico', 'Qual o contexto histórico?', 'Mostre as referências cruzadas'],
      doutrina: ['Como outras tradições interpretam?', 'Qual base bíblica?', 'Debates teológicos'],
      historia: ['Linha do tempo', 'Personagens relacionados', 'Contexto cultural'],
      geografia: ['Mostrar no mapa', 'Rotas relacionadas', 'Locais mencionados'],
      profecia: ['Cumprimento no NT', 'Interpretações', 'Linha profética'],
    };

    const perguntaLower = pergunta.toLowerCase();
    for (const [tipo, sugestoes] of Object.entries(tiposPergunta)) {
      if (perguntaLower.includes(tipo)) {
        return sugestoes;
      }
    }

    return [
      'Explique o contexto histórico',
      'Mostre referências cruzadas',
      'Analise o texto original',
      'Quais doutrinas estão envolvidas?',
    ];
  }
}
