import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HistoriaService } from '../application/historia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('História')
@Controller('historia')
export class HistoriaController {
  constructor(private readonly historiaService: HistoriaService) {}

  @Publico()
  @Get('livro/:livroId')
  @ApiOperation({ summary: 'Contexto histórico de um livro' })
  contextoHistorico(@Param('livroId') livroId: string) {
    return this.historiaService.buscarPorLivro(livroId);
  }

  @Publico()
  @Get(':tipo/:entidadeId')
  @ApiOperation({ summary: 'Contexto histórico por tipo de entidade' })
  contextoPorEntidade(@Param('tipo') tipo: string, @Param('entidadeId') entidadeId: string) {
    return this.historiaService.buscarPorEntidade(tipo, entidadeId);
  }
}
