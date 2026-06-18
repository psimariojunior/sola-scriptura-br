import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class RabbitMQService implements OnModuleDestroy {
    private configService;
    private readonly logger;
    private connection;
    private channel;
    private readonly filas;
    constructor(configService: ConfigService);
    private inicializar;
    publicar(fila: string, mensagem: any): Promise<void>;
    consumir(fila: string, callback: (msg: any) => Promise<void>): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
