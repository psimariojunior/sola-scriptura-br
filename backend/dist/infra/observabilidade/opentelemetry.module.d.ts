import { OnModuleDestroy } from '@nestjs/common';
export declare class OpenTelemetryModule implements OnModuleDestroy {
    onModuleDestroy(): Promise<void>;
}
