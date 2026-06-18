import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TheologyService } from '../application/theology.service';

@ApiTags('Teologia Sistemática')
@Controller('teologia')
export class TheologyController {
  constructor(private readonly theologyService: TheologyService) {}

  @Get(':livro/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Análise teológica completa de um versículo' })
  @ApiQuery({
    name: 'tradicao',
    required: false,
    description: 'Tradição teológica (arminiana, reformada, batista, pentecostal, wesleyana)',
  })
  async analisarTeologia(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('tradicao') tradicao?: string,
  ) {
    return this.theologyService.analisarTeologia(livro, capitulo, versiculo, tradicao);
  }

  @Get('doutrinas')
  @ApiOperation({ summary: 'Listar doutrinas sistemáticas' })
  async listarDoutrinas(@Query('categoria') categoria?: string) {
    return this.theologyService.listarDoutrinas(categoria);
  }

  @Get('doutrinas/:nome')
  @ApiOperation({ summary: 'Buscar doutrina específica' })
  async buscarDoutrina(@Param('nome') nome: string) {
    return this.theologyService.buscarDoutrina(nome);
  }
}
