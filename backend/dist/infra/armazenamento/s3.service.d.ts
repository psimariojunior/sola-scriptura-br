import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private readonly logger;
    private client;
    private bucket;
    constructor(configService: ConfigService);
    upload(caminho: string, arquivo: Buffer, tipoMime: string): Promise<string>;
    getUrl(caminho: string, expiracao?: number): Promise<string>;
    remover(caminho: string): Promise<void>;
}
