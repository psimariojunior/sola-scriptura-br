import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlanoLeituraService } from '../application/plano-leitura.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Plano de Leitura')
@Controller('plano-leitura')
export class PlanoLeituraController {
  constructor(private readonly planoSchema: PlanoLeituraService) {}

  @Publico()
  @Get()
  @ApiOperation({ summary: 'Lista planos de leitura disponíveis' })
  listarPlanos() {
    return this.planoSchema.listarPlanos();
  }

  @Publico()
  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de um plano de leitura' })
  buscarPlano(@Param('id') id: string) {
    return this.planoSchema.buscarPlano(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':planoId/iniciar')
  @ApiOperation({ summary: 'Inicia um plano de leitura' })
  iniciar(@UsuarioAtual('id') usuarioId: string, @Param('planoId') planoId: string) {
    return this.planoSchema.iniciarPlano(usuarioId, planoId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('progresso/:progressoId/avancar')
  @ApiOperation({ summary: 'Avança um dia no plano' })
  avancar(@UsuarioAtual('id') usuarioId: string, @Param('progressoId') progressoId: string) {
    return this.planoSchema.avancarDia(usuarioId, progressoId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('usuario/progresso')
  @ApiOperation({ summary: 'Progresso do usuário nos planos' })
  progresso(@UsuarioAtual('id') usuarioId: string) {
    return this.planoSchema.progressoUsuario(usuarioId);
  }
}
