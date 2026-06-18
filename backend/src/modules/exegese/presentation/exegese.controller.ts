import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExegeseService } from '../application/exegese.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Exegese')
@Controller('exegese')
export class ExegeseController {
  constructor(private readonly exegeseService: ExegeseService) {}

  @Publico()
  @Get('versiculo/:versiculoId')
  @ApiOperation({ summary: 'Análise exegética completa de um versículo' })
  analisar(@Param('versiculoId') versiculoId: string) {
    return this.exegeseService.buscarPorVersiculo(versiculoId);
  }

  @Publico()
  @Get('versiculo/:versiculoId/contextos')
  @ApiOperation({ summary: 'Contextos exegéticos de um versículo' })
  contextos(@Param('versiculoId') versiculoId: string) {
    return this.exegeseService.listarContextos(versiculoId);
  }
}
