import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotasService } from '../application/notas.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';

@ApiTags('Notas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista notas do usuário' })
  listar(@UsuarioAtual('id') usuarioId: string, @Query('versiculoId') versiculoId?: string) {
    return this.notasService.listar(usuarioId, versiculoId);
  }

  @Post()
  @ApiOperation({ summary: 'Cria nova nota' })
  criar(@UsuarioAtual('id') usuarioId: string, @Body() dados: any) {
    return this.notasService.criar(usuarioId, dados);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza nota' })
  atualizar(@UsuarioAtual('id') usuarioId: string, @Param('id') id: string, @Body() dados: any) {
    return this.notasService.atualizar(id, usuarioId, dados);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove nota' })
  remover(@UsuarioAtual('id') usuarioId: string, @Param('id') id: string) {
    return this.notasService.remover(id, usuarioId);
  }
}
