import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: Connection;
  private channel: Channel;
  private readonly filas: string[] = [
    'indexacao-biblia',
    'processamento-ia',
    'notificacoes',
    'sync-offline',
    'analytics',
    'geracao-grafo',
  ];

  constructor(private configService: ConfigService) {
    const url = this.configService.get('RABBITMQ_URL');
    if (url) {
      this.inicializar();
    } else {
      this.logger.warn('RABBITMQ_URL não configurado — RabbitMQ desabilitado');
    }
  }

  private async inicializar(): Promise<void> {
    try {
      const url = this.configService.get('RABBITMQ_URL', 'amqp://localhost:5672');
      this.connection = await connect(url);
      this.channel = await this.connection.createChannel();
      for (const fila of this.filas) {
        await this.channel.assertQueue(fila, { durable: true });
      }
      this.logger.log('RabbitMQ conectado');
    } catch (erro) {
      this.logger.error('Erro ao conectar RabbitMQ', erro);
    }
  }

  async publicar(fila: string, mensagem: any): Promise<void> {
    if (!this.channel) await this.inicializar();
    this.channel.sendToQueue(fila, Buffer.from(JSON.stringify(mensagem)), {
      persistent: true,
      contentType: 'application/json',
    });
  }

  async consumir(fila: string, callback: (msg: any) => Promise<void>): Promise<void> {
    if (!this.channel) await this.inicializar();
    await this.channel.consume(fila, async (msg) => {
      if (msg) {
        try {
          const conteudo = JSON.parse(msg.content.toString());
          await callback(conteudo);
          this.channel.ack(msg);
        } catch (erro) {
          this.logger.error(`Erro ao processar mensagem da fila ${fila}`, erro);
          this.channel.nack(msg, false, true);
        }
      }
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}
