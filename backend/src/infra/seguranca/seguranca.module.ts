import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { MfaService } from './mfa.service';
import { CriptografiaService } from './criptografia.service';
import { Usuario } from '../../modules/usuario/domain/usuario.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || (config.get('NODE_ENV') === 'production' ? (() => { throw new Error('JWT_SECRET é obrigatório em produção'); })() : 'super-secret-key-dev-only'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRATION', '15m'),
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  providers: [JwtStrategy, MfaService, CriptografiaService],
  exports: [JwtModule, JwtStrategy, PassportModule, MfaService, CriptografiaService],
})
export class SegurancaModule {}
