import { ConfigService } from '@nestjs/config';
export declare class MfaService {
    private configService;
    constructor(configService: ConfigService);
    gerarSegredo(): {
        base32: string;
        otpauth_url: string;
    };
    validarToken(segredo: string, token: string): boolean;
    gerarRecoveryCodes(): string[];
}
