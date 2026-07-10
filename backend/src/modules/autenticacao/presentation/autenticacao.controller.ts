import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AutenticacaoService } from '../application/autenticacao.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';
import { Publico } from '../../../common/decorators/publico.decorator';
import { ThrottleLogin } from '../../../common/decorators/throttle.decorator';
import { CadastroDto, LoginDto, RefreshTokenDto } from './dto/autenticacao.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly authService: AutenticacaoService) {}

  @Publico()
  @Post('cadastrar')
  @ApiOperation({ summary: 'Cadastro de novo usuário' })
  cadastrar(@Body() dados: CadastroDto) {
    return this.authService.cadastrar(dados);
  }

  @Publico()
  @ThrottleLogin()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário' })
  login(@Body() credenciais: LoginDto) {
    return this.authService.login(credenciais.email, credenciais.senha);
  }

  @Publico()
  @ThrottleLogin()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar token de acesso' })
  refresh(@Body() dados: RefreshTokenDto) {
    return this.authService.refresh(dados.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout de usuário' })
  logout(@UsuarioAtual('id') usuarioId: string) {
    return this.authService.logout(usuarioId);
  }
}
