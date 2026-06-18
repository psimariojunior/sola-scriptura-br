import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DicionarioService } from '../application/dicionario.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Dicionário')
@Controller('dicionario')
export class DicionarioController {
  constructor(private readonly dicionarioService: DicionarioService) {}

  @Publico()
  @Get('buscar')
  @ApiOperation({ summary: 'Pesquisa no dicionário bíblico' })
  @ApiQuery({ name: 'q', required: true })
  pesquisar(@Query('q') consulta: string) {
    return this.dicionarioService.pesquisar(consulta);
  }

  @Publico()
  @Get('categoria/:categoria')
  @ApiOperation({ summary: 'Verbetes por categoria' })
  porCategoria(@Param('categoria') categoria: string) {
    return this.dicionarioService.listarPorCategoria(categoria);
  }

  @Publico()
  @Get(':slug')
  @ApiOperation({ summary: 'Busca verbete pelo slug' })
  buscarPorSlug(@Param('slug') slug: string) {
    return this.dicionarioService.buscarPorSlug(slug);
  }
}
