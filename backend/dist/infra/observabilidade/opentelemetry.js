"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetry = void 0;
const common_1 = require("@nestjs/common");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
class OpenTelemetry {
    static iniciar() {
        const exporter = new exporter_trace_otlp_http_1.OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
        });
        this.sdk = new sdk_node_1.NodeSDK({
            resource: new resources_1.Resource({
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: 'sola-scriptura-backend',
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
                [semantic_conventions_1.SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
            }),
            traceExporter: exporter,
            instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
        });
        try {
            this.sdk.start();
            this.logger.log('OpenTelemetry inicializado');
        }
        catch (erro) {
            this.logger.error('Erro ao inicializar OpenTelemetry', erro);
        }
    }
    static async encerrar() {
        try {
            await this.sdk?.shutdown();
            this.logger.log('OpenTelemetry encerrado');
        }
        catch (erro) {
            this.logger.error('Erro ao encerrar OpenTelemetry', erro);
        }
    }
}
exports.OpenTelemetry = OpenTelemetry;
OpenTelemetry.logger = new common_1.Logger('OpenTelemetry');
//# sourceMappingURL=opentelemetry.js.map