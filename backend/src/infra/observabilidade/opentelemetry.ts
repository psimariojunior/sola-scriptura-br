import { Logger } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export class OpenTelemetry {
  private static sdk: NodeSDK;
  private static readonly logger = new Logger('OpenTelemetry');

  static iniciar(): void {
    const exporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
    });

    this.sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'sola-scriptura-backend',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
        [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
      }),
      traceExporter: exporter,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    try {
      this.sdk.start();
      this.logger.log('OpenTelemetry inicializado');
    } catch (erro) {
      this.logger.error('Erro ao inicializar OpenTelemetry', erro);
    }
  }

  static async encerrar(): Promise<void> {
    try {
      await this.sdk?.shutdown();
      this.logger.log('OpenTelemetry encerrado');
    } catch (erro) {
      this.logger.error('Erro ao encerrar OpenTelemetry', erro);
    }
  }
}
