import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ComentariosService } from '../application/comentarios.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Comentários')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Publico()
  @Get('autores')
  @ApiOperation({ summary: 'Lista autores de comentários' })
  listarAutores() {
    return this.comentariosService.listarAutores();
  }

  @Publico()
  @Get('autor/:autor')
  @ApiOperation({ summary: 'Comentários por autor' })
  buscarPorAutor(@Param('autor') autor: string) {
    return this.comentariosService.buscarPorAutor(autor);
  }

  @Publico()
  @Get(':livroId/:capitulo')
  @ApiOperation({ summary: 'Comentários de um capítulo' })
  @ApiQuery({ name: 'versiculo', required: false })
  buscarPorCapitulo(
    @Param('livroId') livroId: string,
    @Param('capitulo') capitulo: number,
    @Query('versiculo') versiculo?: number,
  ) {
    return this.comentariosService.buscarPorReferencia(livroId, +capitulo, versiculo ? +versiculo : undefined);
  }
}
