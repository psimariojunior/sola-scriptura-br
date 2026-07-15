import { Injectable, Logger, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Usuario } from '../../usuario/domain/usuario.entity';
import { RefreshToken } from '../domain/refresh-token.entity';

@Injectable()
export class AutenticacaoService {
  private readonly logger = new Logger(AutenticacaoService.name);

  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(RefreshToken) private refreshRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async cadastrar(dados: { nome: string; email: string; senha: string }) {
    const existe = await this.usuarioRepo.findOne({ where: { email: dados.email } });
    if (existe) throw new ConflictException('Email já cadastrado');

    const senhaHash = await bcrypt.hash(dados.senha, 12);
    const usuario = this.usuarioRepo.create({
      nome: dados.nome,
      email: dados.email,
      senhaHash,
      role: 'user',
    });
    await this.usuarioRepo.save(usuario);
    await this.promoverAdminSeAplicavel(usuario);
    return this.gerarTokens(usuario);
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepo.findOne({
      where: { email },
      select: ['id', 'nome', 'email', 'senhaHash', 'ativo', 'role'],
    });
    if (!usuario) throw new UnauthorizedException('Credenciais inválidas');
    if (!usuario.ativo) throw new UnauthorizedException('Conta desativada');

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) throw new UnauthorizedException('Credenciais inválidas');

    await this.promoverAdminSeAplicavel(usuario);
    return this.gerarTokens(usuario);
  }

  private async promoverAdminSeAplicavel(usuario: Usuario): Promise<void> {
    const adminEmails = (this.configService.get<string>('ADMIN_EMAILS') || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (adminEmails.includes(usuario.email.toLowerCase()) && usuario.role !== 'admin') {
      usuario.role = 'admin';
      await this.usuarioRepo.save(usuario);
      this.logger.log(`Usuário ${usuario.email} promovido a admin (ADMIN_EMAILS)`);
    }
  }

  async refresh(token: string) {
    const refreshToken = await this.refreshRepo.findOne({
      where: { token, ativo: true },
      relations: ['usuario'],
    });
    if (!refreshToken || refreshToken.expiraEm < new Date()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
    refreshToken.ativo = false;
    await this.refreshRepo.save(refreshToken);
    return this.gerarTokens(refreshToken.usuario);
  }

  async logout(usuarioId: string) {
    await this.refreshRepo.update(
      { usuarioId, ativo: true },
      { ativo: false },
    );
  }

  private async gerarTokens(usuario: Usuario) {
    const payload = { sub: usuario.id, email: usuario.email };

    const accessToken = this.jwtService.sign(payload);

    const refreshTokenStr = uuid();
    const refreshToken = this.refreshRepo.create({
      token: refreshTokenStr,
      usuarioId: usuario.id,
      expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await this.refreshRepo.save(refreshToken);

    return {
      accessToken,
      refreshToken: refreshTokenStr,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
    };
  }

  private getApiBaseUrl(): string {
    return (
      this.configService.get<string>('API_BASE_URL') ||
      process.env.API_BASE_URL ||
      'https://api.solascripturabr.com.br'
    );
  }

  async googleAuthUrl(): Promise<string> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    if (!clientId || !clientSecret) {
      throw new BadRequestException('OAUTH_GOOGLE_NAO_CONFIGURADO');
    }
    const redirectUri = `${this.getApiBaseUrl()}/api/v1/auth/google/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'select_account',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async googleCallback(code: string): Promise<{ accessToken: string; refreshToken: string; usuario: any }> {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    if (!clientId || !clientSecret) {
      throw new BadRequestException('OAUTH_GOOGLE_NAO_CONFIGURADO');
    }
    const redirectUri = `${this.getApiBaseUrl()}/api/v1/auth/google/callback`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    const tokenData: any = await tokenRes.json();
    if (!tokenData.access_token) {
      throw new UnauthorizedException('Falha ao obter token do Google');
    }

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile: any = await profileRes.json();
    if (!profile.email) {
      throw new UnauthorizedException('Email do Google indisponível');
    }

    let usuario = await this.usuarioRepo.findOne({ where: { email: profile.email } });
    if (!usuario) {
      usuario = this.usuarioRepo.create({
        nome: profile.name || profile.email.split('@')[0],
        email: profile.email,
        senhaHash: await bcrypt.hash(uuid(), 12),
        role: 'user',
        emailVerificado: true,
        provedoresOAuth: ['google'],
      });
      await this.usuarioRepo.save(usuario);
    }
    await this.promoverAdminSeAplicavel(usuario);
    return this.gerarTokens(usuario);
  }

  async appleIniciar(): Promise<string> {
    const clientId = this.configService.get<string>('APPLE_CLIENT_ID');
    if (!clientId) {
      throw new BadRequestException('OAUTH_APPLE_NAO_CONFIGURADO');
    }
    const redirectUri = `${this.getApiBaseUrl()}/api/v1/auth/apple/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code id_token',
      scope: 'name email',
      response_mode: 'form_post',
    });
    return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  }
}
