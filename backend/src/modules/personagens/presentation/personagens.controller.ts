import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PersonagensService } from '../application/personagens.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Personagens')
@Controller('personagens')
export class PersonagensController {
  constructor(private readonly personagensService: PersonagensService) {}

  @Publico()
  @Get()
  @ApiOperation({ summary: 'Lista personagens bíblicos' })
  listar(@Query('limite') limite?: number) {
    return this.personagensService.listarPersonagens(limite ? +limite : 50);
  }

  @Publico()
  @Get('buscar')
  @ApiOperation({ summary: 'Pesquisa personagens pelo nome' })
  @ApiQuery({ name: 'q', required: true })
  buscar(@Query('q') consulta: string) {
    return this.personagensService.buscarPorNome(consulta);
  }

  @Publico()
  @Get(':slug')
  @ApiOperation({ summary: 'Detalhes de um personagem' })
  buscarPorSlug(@Param('slug') slug: string) {
    return this.personagensService.buscarPorSlug(slug);
  }
}
