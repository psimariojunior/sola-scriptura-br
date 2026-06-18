"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuracoes = exports.configuracaoIA = exports.configuracaoAWS = exports.configuracaoRedis = exports.configuracaoJWT = exports.configuracaoBanco = void 0;
const config_1 = require("@nestjs/config");
exports.configuracaoBanco = (0, config_1.registerAs)('banco', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    usuario: process.env.DB_USER || 'sola_scriptura',
    senha: process.env.DB_PASSWORD || 'sola_scriptura',
    nome: process.env.DB_NAME || 'sola_scriptura',
    ssl: process.env.DB_SSL === 'true',
}));
exports.configuracaoJWT = (0, config_1.registerAs)('jwt', () => ({
    segredo: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
    expiracao: process.env.JWT_EXPIRATION || '15m',
    refreshExpiracao: process.env.JWT_REFRESH_EXPIRATION || '7d',
}));
exports.configuracaoRedis = (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    senha: process.env.REDIS_PASSWORD || '',
}));
exports.configuracaoAWS = (0, config_1.registerAs)('aws', () => ({
    regiao: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucketS3: process.env.AWS_S3_BUCKET || 'sola-scriptura',
}));
exports.configuracaoIA = (0, config_1.registerAs)('ia', () => ({
    provedor: process.env.IA_PROVIDER || 'openai',
    apiKey: process.env.OPENAI_API_KEY || '',
    modelo: process.env.IA_MODEL || 'gpt-4',
    temperatura: parseFloat(process.env.IA_TEMPERATURE) || 0.3,
    maxTokens: parseInt(process.env.IA_MAX_TOKENS, 10) || 4096,
    embeddingModelo: process.env.EMBEDDING_MODEL || 'text-embedding-3-large',
}));
exports.configuracoes = [
    exports.configuracaoBanco,
    exports.configuracaoJWT,
    exports.configuracaoRedis,
    exports.configuracaoAWS,
    exports.configuracaoIA,
];
//# sourceMappingURL=configuracao.js.map