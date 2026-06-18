import { ConfigService } from '@nestjs/config';
export declare class CriptografiaService {
    private configService;
    private algoritmo;
    private chave;
    constructor(configService: ConfigService);
    criptografar(texto: string): {
        iv: string;
        conteudo: string;
        tag: string;
    };
    descriptografar(dados: {
        iv: string;
        conteudo: string;
        tag: string;
    }): string;
}
