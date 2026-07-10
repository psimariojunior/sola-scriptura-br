import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IaService } from '../application/ia.service';
import { Publico } from '../../../common/decorators/publico.decorator';
import {
  PerguntaDto,
  ExegeseIaDto,
  AnaliseGregoDto,
  CompararPassagensDto,
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
  @Get('grafo/:entidadeId')
  @ApiOperation({ summary: 'Busca entidade no grafo de conhecimento' })
  buscarGrafo(@Param('entidadeId') entidadeId: string, @Query('profundidade') profundidade?: number) {
    return this.iaService.buscarNoGrafo(entidadeId, profundidade ? +profundidade : 2);
  }

  @Publico()
  @Get('grafo/estatisticas')
  @ApiOperation({ summary: 'Estatísticas do grafo de conhecimento' })
  estatisticasGrafo() {
    return this.iaService.estatisticasGrafo();
  }
}
