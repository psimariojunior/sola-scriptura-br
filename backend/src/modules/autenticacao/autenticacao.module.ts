import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutenticacaoController } from './presentation/autenticacao.controller';
import { AutenticacaoService } from './application/autenticacao.service';
import { Usuario } from '../usuario/domain/usuario.entity';
import { RefreshToken } from './domain/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || (config.get('NODE_ENV') === 'production' ? (() => { throw new Error('JWT_SECRET é obrigatório em produção'); })() : 'super-secret-key-dev-only'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRATION', '24h'),
        },
      }),
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}
