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
var LLMService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let LLMService = LLMService_1 = class LLMService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(LLMService_1.name);
        this.apiKey = this.configService.get('OPENAI_API_KEY', '');
        this.modelo = this.configService.get('IA_MODEL', 'gpt-4');
        this.temperatura = parseFloat(this.configService.get('IA_TEMPERATURE', '0.3'));
        this.maxTokens = parseInt(this.configService.get('IA_MAX_TOKENS', '4096'), 10);
    }
    async gerarResposta(prompt) {
        try {
            const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: this.modelo,
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é um especialista acadêmico em estudos bíblicos. Responda em português brasileiro com rigor acadêmico e clareza.',
                        },
                        { role: 'user', content: prompt },
                    ],
                    temperature: this.temperatura,
                    max_tokens: this.maxTokens,
                }),
            });
            if (!resposta.ok) {
                const erro = await resposta.text();
                this.logger.error(`Erro na API de IA: ${resposta.status} - ${erro}`);
                return this.respostaFallback(prompt);
            }
            const dados = await resposta.json();
            return dados.choices[0].message.content;
        }
        catch (erro) {
            this.logger.error('Erro ao chamar API de IA', erro);
            return this.respostaFallback(prompt);
        }
    }
    async gerarEmbedding(texto) {
        try {
            const resposta = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'text-embedding-3-large',
                    input: texto,
                }),
            });
            if (!resposta.ok)
                throw new Error('Erro ao gerar embedding');
            const dados = await resposta.json();
            return dados.data[0].embedding;
        }
        catch (erro) {
            this.logger.error('Erro ao gerar embedding', erro);
            return [];
        }
    }
    respostaFallback(prompt) {
        const linhas = prompt.split('\n');
        const pergunta = linhas.find((l) => l.startsWith('=== PERGUNTA'));
        const idx = linhas.indexOf(pergunta || '');
        const consulta = idx >= 0 ? linhas.slice(idx + 1).join(' ') : prompt.slice(0, 200);
        return `**Resposta baseada no contexto disponível**

Sobre "${consulta.slice(0, 100)}...":

O contexto bíblico disponível indica que este é um tema que requer análise cuidadosa das Escrituras. Recomendo consultar as referências cruzadas, comentários bíblicos e o estudo exegético disponível na plataforma para uma compreensão mais aprofundada.

*Nota: A IA especialista está temporariamente em modo offline. Ative sua assinatura Premium para respostas completas geradas por IA.*`;
    }
};
exports.LLMService = LLMService;
exports.LLMService = LLMService = LLMService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], LLMService);
//# sourceMappingURL=llm.service.js.map