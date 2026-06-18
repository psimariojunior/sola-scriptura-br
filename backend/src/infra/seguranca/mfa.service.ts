import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';
import * as crypto from 'crypto';

@Injectable()
export class MfaService {
  constructor(private configService: ConfigService) {}

  gerarSegredo(): { base32: string; otpauth_url: string } {
    const segredo = speakeasy.generateSecret({
      name: `Sola Scriptura:${this.configService.get('MFA_APP_NAME', 'Sola Scriptura BR')}`,
      issuer: 'Sola Scriptura BR',
    });
    return { base32: segredo.base32, otpauth_url: segredo.otpauth_url };
  }

  validarToken(segredo: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: segredo,
      encoding: 'base32',
      token,
      window: 2,
    });
  }

  gerarRecoveryCodes(): string[] {
    const codigos: string[] = [];
    for (let i = 0; i < 10; i++) {
      codigos.push(crypto.randomBytes(4).toString('hex').toUpperCase());
    }
    return codigos;
  }
}
