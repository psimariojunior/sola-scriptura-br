import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArqueologiaService } from '../application/arqueologia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Arqueologia')
@Controller('arqueologia')
export class ArqueologiaController {
  constructor(private readonly arqueologiaService: ArqueologiaService) {}

  @Publico()
  @Get('artefatos')
  @ApiOperation({ summary: 'Lista artefatos arqueológicos' })
  listarArtefatos(@Query('tipo') tipo?: string) {
    return this.arqueologiaService.listarArtefatos(tipo);
  }

  @Publico()
  @Get('artefatos/:id')
  @ApiOperation({ summary: 'Detalhes de um artefato' })
  buscarArtefato(@Param('id') id: string) {
    return this.arqueologiaService.buscarArtefato(id);
  }

  @Publico()
  @Get('manuscritos')
  @ApiOperation({ summary: 'Lista manuscritos antigos' })
  listarManuscritos() {
    return this.arqueologiaService.listarManuscritos();
  }
}
