import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../modules/usuario/domain/usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || (configService.get('NODE_ENV') === 'production' ? (() => { throw new Error('JWT_SECRET é obrigatório em produção'); })() : 'super-secret-key-dev-only'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: payload.sub },
      relations: ['perfil', 'preferencias'],
    });
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException('Usuário não encontrado ou inativo');
    }
    return { id: usuario.id, email: usuario.email, perfil: usuario.perfil };
  }
}
