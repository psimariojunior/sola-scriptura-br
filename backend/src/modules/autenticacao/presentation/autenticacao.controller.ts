import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AutenticacaoService } from '../application/autenticacao.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';
import { Publico } from '../../../common/decorators/publico.decorator';
import { ThrottleLogin } from '../../../common/decorators/throttle.decorator';
import { ConfigService } from '@nestjs/config';
import { CadastroDto, LoginDto, RefreshTokenDto } from './dto/autenticacao.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AutenticacaoController {
  constructor(
    private readonly authService: AutenticacaoService,
    private readonly configService: ConfigService,
  ) {}

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

  private frontendCallback(base: string, params: Record<string, string>): string {
    const url = new URL('/auth/callback', base);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  }

  @Publico()
  @Get('google')
  @ApiOperation({ summary: 'Iniciar login com Google' })
  async googleAuth(@Res() res: Response) {
    try {
      const url = await this.authService.googleAuthUrl();
      return res.redirect(url);
    } catch (e: any) {
      const frontend = this.configService.get<string>('FRONTEND_URL') || 'https://solascripturabr.com.br';
      return res.redirect(this.frontendCallback(frontend, { erro: e?.message || 'OAUTH_NAO_CONFIGURADO' }));
    }
  }

  @Publico()
  @Get('google/callback')
  @ApiOperation({ summary: 'Callback do Google' })
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    const frontend = this.configService.get<string>('FRONTEND_URL') || 'https://solascripturabr.com.br';
    if (!code) {
      return res.redirect(this.frontendCallback(frontend, { erro: 'CODE_AUSENTE' }));
    }
    try {
      const tokens = await this.authService.googleCallback(code);
      return res.redirect(
        this.frontendCallback(frontend, {
          token: tokens.accessToken,
          refresh: tokens.refreshToken,
          usuario: encodeURIComponent(JSON.stringify(tokens.usuario)),
        }),
      );
    } catch (e: any) {
      return res.redirect(this.frontendCallback(frontend, { erro: e?.message || 'OAUTH_FALHOU' }));
    }
  }

  @Publico()
  @Get('apple')
  @ApiOperation({ summary: 'Iniciar login com Apple' })
  async appleAuth(@Res() res: Response) {
    try {
      const url = await this.authService.appleIniciar();
      return res.redirect(url);
    } catch (e: any) {
      const frontend = this.configService.get<string>('FRONTEND_URL') || 'https://solascripturabr.com.br';
      return res.redirect(this.frontendCallback(frontend, { erro: e?.message || 'OAUTH_NAO_CONFIGURADO' }));
    }
  }
}
