import { Controller, Post, Get, Body, Param, Query, Sse, MessageEvent } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Observable, Subject } from 'rxjs';
import { IaService } from '../application/ia.service';
import { Publico } from '../../../common/decorators/publico.decorator';
import {
  PerguntaDto,
  PerguntaStreamDto,
  ExegeseIaDto,
  AnaliseGregoDto,
  CompararPassagensDto,
  GerarEmbeddingsDto,
  EmbeddingTextoDto,
} from './dto/ia.dto';
import { ThrottleIa } from '../../../common/decorators/throttle.decorator';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Publico()
  @ThrottleIa()
  @Post('perguntar')
  @ApiOperation({ summary: 'Faz uma pergunta ao assistente bíblico IA' })
  perguntar(
    @Body() dados: PerguntaDto,
    @Query('tradicao') tradicao?: string,
  ) {
    return this.iaService.perguntar(dados.consulta, tradicao ?? dados.tradicao);
  }

  @Publico()
  @ThrottleIa()
  @Sse('perguntar-stream')
  @ApiOperation({ summary: 'Stream de resposta IA via SSE' })
  async perguntarStream(
    @Body() dados: PerguntaStreamDto,
  ): Promise<Observable<MessageEvent>> {
    const subject = new Subject<MessageEvent>();

    (async () => {
      try {
        for await (const evento of this.iaService.perguntarStream(
          dados.pergunta,
          dados.tradicao,
        )) {
          subject.next({
            data: evento,
            type: evento.tipo,
          } as MessageEvent);
        }
        subject.complete();
      } catch (erro) {
        subject.next({
          data: { tipo: 'erro', dados: { message: erro.message || 'Erro interno' } },
          type: 'erro',
        } as MessageEvent);
        subject.complete();
      }
    })();

    return subject.asObservable();
  }

  @Publico()
  @ThrottleIa()
  @Post('exegese')
  @ApiOperation({ summary: 'Análise exegética via IA' })
  analisarExegese(@Body() dados: ExegeseIaDto) {
    return this.iaService.analisarExegese(dados.versiculoId, dados.texto);
  }

  @Publico()
  @ThrottleIa()
  @Post('grego')
  @ApiOperation({ summary: 'Análise de texto grego via IA' })
  analisarGrego(@Body() dados: AnaliseGregoDto) {
    return this.iaService.analisarGrego(dados.texto);
  }

  @Publico()
  @ThrottleIa()
  @Post('comparar')
  @ApiOperation({ summary: 'Compara passagens bíblicas via IA' })
  comparar(@Body() dados: CompararPassagensDto) {
    return this.iaService.compararPassagens(dados.passagens);
  }

  @Publico()
  @Post('embeddings')
  @ApiOperation({ summary: 'Gera embedding para um texto' })
  async gerarEmbedding(@Body() dados: EmbeddingTextoDto) {
    const embedding = await this.iaService.gerarEmbeddingTexto(dados.texto);
    return {
      texto: dados.texto,
      embedding,
      dimensao: embedding.length,
    };
  }

  @Publico()
  @Post('embeddings/batch')
  @ApiOperation({ summary: 'Gera embeddings em batch para entidades' })
  async gerarEmbeddingsBatch(@Body() dados: GerarEmbeddingsDto) {
    if (dados.ids && dados.ids.length > 0) {
      return this.iaService.gerarEmbeddings(dados.tipo, dados.ids);
    }
    return this.iaService.popularEmbeddings(dados.tipo);
  }

  @Publico()
  @Get('embeddings/status')
  @ApiOperation({ summary: 'Status dos embeddings por tipo de entidade' })
  async statusEmbeddings() {
    return this.iaService.statusEmbeddings();
  }

  @Publico()
  @Get('grafo/:entidadeId')
  @ApiOperation({ summary: 'Busca entidade no grafo de conhecimento' })
  buscarGrafo(
    @Param('entidadeId') entidadeId: string,
    @Query('profundidade') profundidade?: number,
    @Query('tipo') tipo?: string,
  ) {
    return this.iaService.buscarNoGrafo(entidadeId, profundidade ? +profundidade : 2);
  }

  @Publico()
  @Get('grafo/estatisticas')
  @ApiOperation({ summary: 'Estatísticas do grafo de conhecimento' })
  estatisticasGrafo() {
    return this.iaService.estatisticasGrafo();
  }

  @Publico()
  @Get('custo')
  @ApiOperation({ summary: 'Estatísticas de custo da IA' })
  estatisticasCusto() {
    return this.iaService.obterEstatisticasCusto();
  }
}
