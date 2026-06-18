import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritosService } from '../application/favoritos.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';

@ApiTags('Favoritos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista favoritos do usuário' })
  listar(@UsuarioAtual('id') usuarioId: string) {
    return this.favoritosService.listar(usuarioId);
  }

  @Post()
  @ApiOperation({ summary: 'Adiciona versículo aos favoritos' })
  adicionar(
    @UsuarioAtual('id') usuarioId: string,
    @Body() dados: { versiculoId: string; etiquetas?: string[]; notaPessoal?: string },
  ) {
    return this.favoritosService.adicionar(usuarioId, dados.versiculoId, dados.etiquetas, dados.notaPessoal);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove favorito' })
  remover(@UsuarioAtual('id') usuarioId: string, @Param('id') id: string) {
    return this.favoritosService.remover(usuarioId, id);
  }
}
