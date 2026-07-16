import {
  Controller, Get, Patch, Delete, Post, Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../application/admin.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AtualizarUsuarioAdminDto, ListarUsuariosAdminDto } from '../presentation/dto/admin.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @Roles('admin')
  @ApiOperation({ summary: 'Dashboard administrativo' })
  dashboard() {
    return this.adminService.dashboard();
  }

  @Get('usuarios')
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos os usuários (admin)' })
  listarUsuarios(@Query() filtros: ListarUsuariosAdminDto) {
    return this.adminService.listarUsuarios(filtros);
  }

  @Get('usuarios/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Buscar usuário por ID (admin)' })
  buscarUsuario(@Param('id') id: string) {
    return this.adminService.buscarUsuarioPorId(id);
  }

  @Patch('usuarios/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar usuário (admin)' })
  atualizarUsuario(
    @Param('id') id: string,
    @Body() dados: AtualizarUsuarioAdminDto,
  ) {
    return this.adminService.atualizarUsuario(id, dados);
  }

  @Delete('usuarios/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Desativar usuário (admin)' })
  desativarUsuario(@Param('id') id: string) {
    return this.adminService.desativarUsuario(id);
  }

  @Post('usuarios/:id/reativar')
  @Roles('admin')
  @ApiOperation({ summary: 'Reativar usuário (admin)' })
  reativarUsuario(@Param('id') id: string) {
    return this.adminService.reativarUsuario(id);
  }

  @Post('usuarios/:id/promover')
  @Roles('admin')
  @ApiOperation({ summary: 'Promover a admin (admin)' })
  promoverAdmin(@Param('id') id: string) {
    return this.adminService.promoverAdmin(id);
  }

  @Post('usuarios/:id/rebaixar')
  @Roles('admin')
  @ApiOperation({ summary: 'Rebaixar de admin (admin)' })
  rebaixarAdmin(@Param('id') id: string) {
    return this.adminService.rebaixarAdmin(id);
  }
}
