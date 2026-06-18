import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CronologiaService } from '../application/cronologia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Cronologia')
@Controller('cronologia')
export class CronologiaController {
  constructor(private readonly cronologiaService: CronologiaService) {}

  @Publico()
  @Get('linha-do-tempo')
  @ApiOperation({ summary: 'Linha do tempo completa' })
  linhaDoTempo() {
    return this.cronologiaService.linhaDoTempo();
  }

  @Publico()
  @Get('era/:era')
  @ApiOperation({ summary: 'Eventos por era (AC/DC)' })
  porEra(@Param('era') era: string) {
    return this.cronologiaService.listarPorEra(era);
  }

  @Publico()
  @Get('periodo')
  @ApiOperation({ summary: 'Eventos em um período específico' })
  porPeriodo(@Query('inicio') inicio: number, @Query('fim') fim: number) {
    return this.cronologiaService.listarPorPeriodo(+inicio, +fim);
  }

  @Publico()
  @Get('categoria/:categoria')
  @ApiOperation({ summary: 'Eventos por categoria' })
  porCategoria(@Param('categoria') categoria: string) {
    return this.cronologiaService.listarPorCategoria(categoria);
  }
}
