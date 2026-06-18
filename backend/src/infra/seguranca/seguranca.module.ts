import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { MfaService } from './mfa.service';
import { CriptografiaService } from './criptografia.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'super-secret-key'),
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
