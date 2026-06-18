import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioService } from '../application/usuario.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';

@ApiTags('Usuário')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('perfil')
  @ApiOperation({ summary: 'Busca perfil do usuário logado' })
  buscarPerfil(@UsuarioAtual('id') usuarioId: string) {
    return this.usuarioService.buscarPerfil(usuarioId);
  }

  @Put('perfil')
  @ApiOperation({ summary: 'Atualiza perfil do usuário' })
  atualizarPerfil(@UsuarioAtual('id') usuarioId: string, @Body() dados: any) {
    return this.usuarioService.atualizarPerfil(usuarioId, dados);
  }

  @Put('preferencias')
  @ApiOperation({ summary: 'Atualiza preferências do usuário' })
  atualizarPreferencias(@UsuarioAtual('id') usuarioId: string, @Body() dados: any) {
    return this.usuarioService.atualizarPreferencias(usuarioId, dados);
  }
}
