import { ConfigService } from '@nestjs/config';
export declare class LLMService {
    private configService;
    private readonly logger;
    private apiKey;
    private modelo;
    private temperatura;
    private maxTokens;
    constructor(configService: ConfigService);
    gerarResposta(prompt: string): Promise<string>;
    gerarEmbedding(texto: string): Promise<number[]>;
    private respostaFallback;
}
