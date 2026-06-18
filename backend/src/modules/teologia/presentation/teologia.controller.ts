import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TeologiaService } from '../application/teologia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Teologia')
@Controller('teologia')
export class TeologiaController {
  constructor(private readonly teologiaService: TeologiaService) {}

  @Publico()
  @Get('categorias')
  @ApiOperation({ summary: 'Lista categorias teológicas' })
  listarCategorias() {
    return this.teologiaService.listarCategorias();
  }

  @Publico()
  @Get('doutrinas/:slug')
  @ApiOperation({ summary: 'Busca doutrina pelo slug' })
  buscarDoutrina(@Param('slug') slug: string) {
    return this.teologiaService.buscarDoutrina(slug);
  }

  @Publico()
  @Get('versiculo/:versiculoId')
  @ApiOperation({ summary: 'Relaciona teologia com um versículo' })
  relacionarTexto(@Param('versiculoId') versiculoId: string) {
    return this.teologiaService.relacionarTexto(versiculoId);
  }
}
