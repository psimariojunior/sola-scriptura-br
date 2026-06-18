import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../application/user.service';

@ApiTags('Usuário')
@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  async criar(@Body() data: { email: string; senha: string; nome: string; tradicao?: string }) {
    return this.userService.criarUsuario(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  async buscar(@Param('id') id: string) {
    return this.userService.buscarUsuario(id);
  }

  @Patch(':id/preferencias')
  @ApiOperation({ summary: 'Atualizar preferências do usuário' })
  async atualizarPreferencias(
    @Param('id') id: string,
    @Body() preferencias: any,
  ) {
    return this.userService.atualizarPreferencias(id, preferencias);
  }
}
