import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CriptografiaService {
  private algoritmo = 'aes-256-gcm';
  private chave: Buffer;

  constructor(private configService: ConfigService) {
    const chaveSecreta = this.configService.get('ENCRYPTION_KEY', 'sola-scriptura-encryption-key-32bytes!');
    this.chave = crypto.scryptSync(chaveSecreta, 'salt', 32);
  }

  criptografar(texto: string): { iv: string; conteudo: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cifra = crypto.createCipheriv(this.algoritmo, this.chave, iv) as crypto.CipherGCM;
    let encrypted = cifra.update(texto, 'utf8', 'hex');
    encrypted += cifra.final('hex');
    const tag = cifra.getAuthTag().toString('hex');
    return { iv: iv.toString('hex'), conteudo: encrypted, tag };
  }

  descriptografar(dados: { iv: string; conteudo: string; tag: string }): string {
    const decipher = crypto.createDecipheriv(
      this.algoritmo,
      this.chave,
      Buffer.from(dados.iv, 'hex'),
    ) as crypto.DecipherGCM;
    decipher.setAuthTag(Buffer.from(dados.tag, 'hex'));
    let decrypted = decipher.update(dados.conteudo, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
