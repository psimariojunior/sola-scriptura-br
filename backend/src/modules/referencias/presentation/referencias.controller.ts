import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReferenciasService } from '../application/referencias.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Referências')
@Controller('referencias')
export class ReferenciasController {
  constructor(private readonly referenciasService: ReferenciasService) {}

  @Publico()
  @Get('versiculo/:versiculoId')
  @ApiOperation({ summary: 'Referências cruzadas de um versículo' })
  buscarPorVersiculo(@Param('versiculoId') versiculoId: string) {
    return this.referenciasService.buscarPorVersiculo(versiculoId);
  }

  @Publico()
  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Referências por tipo de relação' })
  buscarPorTipo(@Param('tipo') tipo: string) {
    return this.referenciasService.buscarPorTipo(tipo);
  }
}
