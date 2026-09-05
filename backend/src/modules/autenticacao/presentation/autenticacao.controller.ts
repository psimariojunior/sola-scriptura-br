import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Query, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AutenticacaoService } from '../application/autenticacao.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';
import { Publico } from '../../../common/decorators/publico.decorator';
import { ThrottleLogin } from '../../../common/decorators/throttle.decorator';
import { ConfigService } from '@nestjs/config';
import { CadastroDto, LoginDto, RefreshTokenDto } from './dto/autenticacao.dto';
import * as crypto from 'crypto';

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
  @Get('me')
  @ApiOperation({ summary: 'Usuário autenticado atual' })
  me(@UsuarioAtual() usuario: { id: string; email: string; role?: string }) {
    return {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role || 'user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout de usuário' })
  logout(@UsuarioAtual('id') usuarioId: string) {
    return this.authService.logout(usuarioId);
  }

  private getFrontendUrl(): string {
    return this.configService.get<string>('FRONTEND_URL') || 'https://solascripturabr.com.br';
  }

  private setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string; usuario: any }): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.cookie('ssb_token', tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    res.cookie('ssb_refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  private generateState(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  @Publico()
  @Get('google')
  @ApiOperation({ summary: 'Iniciar login com Google' })
  async googleAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const state = this.generateState();
      (req as any).session = (req as any).session || {};
      (req as any).session.oauthState = state;
      const url = await this.authService.googleAuthUrl(state);
      return res.redirect(url);
    } catch (e: any) {
      const frontend = this.getFrontendUrl();
      return res.redirect(`${frontend}/auth?erro=${encodeURIComponent(e?.message || 'OAUTH_NAO_CONFIGURADO')}`);
    }
  }

  @Publico()
  @Get('google/callback')
  @ApiOperation({ summary: 'Callback do Google' })
  async googleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const frontend = this.getFrontendUrl();
    if (!code) {
      return res.redirect(`${frontend}/auth?erro=CODE_AUSENTE`);
    }
    try {
      const tokens = await this.authService.googleCallback(code);
      this.setAuthCookies(res, tokens);
      return res.redirect(`${frontend}/auth/callback?sucesso=true`);
    } catch (e: any) {
      return res.redirect(`${frontend}/auth?erro=${encodeURIComponent(e?.message || 'OAUTH_FALHOU')}`);
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
      const frontend = this.getFrontendUrl();
      return res.redirect(`${frontend}/auth?erro=${encodeURIComponent(e?.message || 'OAUTH_NAO_CONFIGURADO')}`);
    }
  }
}
