import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IaService } from '../application/ia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Publico()
  @Post('perguntar')
  @ApiOperation({ summary: 'Faz uma pergunta ao assistente bíblico IA' })
  @ApiQuery({ name: 'tradicao', required: false, description: 'Tradição teológica (arminiana, reformada, batista, pentecostal, wesleyana)' })
  perguntar(
    @Body() dados: { consulta: string },
    @Query('tradicao') tradicao?: string,
  ) {
    return this.iaService.perguntar(dados.consulta, tradicao);
  }

  @Publico()
  @Post('exegese')
  @ApiOperation({ summary: 'Análise exegética via IA' })
  analisarExegese(@Body() dados: { versiculoId: string; texto: string }) {
    return this.iaService.analisarExegese(dados.versiculoId, dados.texto);
  }

  @Publico()
  @Post('grego')
  @ApiOperation({ summary: 'Análise de texto grego via IA' })
  analisarGrego(@Body() dados: { texto: string }) {
    return this.iaService.analisarGrego(dados.texto);
  }

  @Publico()
  @Post('comparar')
  @ApiOperation({ summary: 'Compara passagens bíblicas via IA' })
  comparar(@Body() dados: { passagens: string[] }) {
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
