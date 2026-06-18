"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RabbitMQService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqplib_1 = require("amqplib");
let RabbitMQService = RabbitMQService_1 = class RabbitMQService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RabbitMQService_1.name);
        this.filas = [
            'indexacao-biblia',
            'processamento-ia',
            'notificacoes',
            'sync-offline',
            'analytics',
            'geracao-grafo',
        ];
        this.inicializar();
    }
    async inicializar() {
        try {
            const url = this.configService.get('RABBITMQ_URL', 'amqp://localhost:5672');
            this.connection = await (0, amqplib_1.connect)(url);
            this.channel = await this.connection.createChannel();
            for (const fila of this.filas) {
                await this.channel.assertQueue(fila, { durable: true });
            }
            this.logger.log('RabbitMQ conectado');
        }
        catch (erro) {
            this.logger.error('Erro ao conectar RabbitMQ', erro);
        }
    }
    async publicar(fila, mensagem) {
        if (!this.channel)
            await this.inicializar();
        this.channel.sendToQueue(fila, Buffer.from(JSON.stringify(mensagem)), {
            persistent: true,
            contentType: 'application/json',
        });
    }
    async consumir(fila, callback) {
        if (!this.channel)
            await this.inicializar();
        await this.channel.consume(fila, async (msg) => {
            if (msg) {
                try {
                    const conteudo = JSON.parse(msg.content.toString());
                    await callback(conteudo);
                    this.channel.ack(msg);
                }
                catch (erro) {
                    this.logger.error(`Erro ao processar mensagem da fila ${fila}`, erro);
                    this.channel.nack(msg, false, true);
                }
            }
        });
    }
    async onModuleDestroy() {
        await this.channel?.close();
        await this.connection?.close();
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = RabbitMQService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map