import { Injectable, Logger, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
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
    });
    await this.usuarioRepo.save(usuario);
    return this.gerarTokens(usuario);
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepo.findOne({
      where: { email },
      select: ['id', 'nome', 'email', 'senhaHash', 'ativo'],
    });
    if (!usuario) throw new UnauthorizedException('Credenciais inválidas');
    if (!usuario.ativo) throw new UnauthorizedException('Conta desativada');

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) throw new UnauthorizedException('Credenciais inválidas');

    return this.gerarTokens(usuario);
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
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    };
  }
}
