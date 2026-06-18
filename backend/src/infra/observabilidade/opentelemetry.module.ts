import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { OpenTelemetry } from './opentelemetry';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class OpenTelemetryModule implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await OpenTelemetry.encerrar();
  }
}
