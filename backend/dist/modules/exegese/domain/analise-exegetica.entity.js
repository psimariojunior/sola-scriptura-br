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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnaliseExegetica = void 0;
const typeorm_1 = require("typeorm");
let AnaliseExegetica = class AnaliseExegetica {
};
exports.AnaliseExegetica = AnaliseExegetica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_id' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "versiculoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_imediato' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "contextoImediato", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_capitulo' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "contextoCapitulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_livro' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "contextoLivro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_testamento' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "contextoTestamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_canonico' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "contextoCanonico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'estrutura_literaria' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "estruturaLiteraria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'analise_sintatica' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "analiseSintatica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'analise_semantica' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "analiseSemantica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'palavras_chave' }),
    __metadata("design:type", Object)
], AnaliseExegetica.prototype, "palavrasChave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'figuras_linguagem' }),
    __metadata("design:type", Array)
], AnaliseExegetica.prototype, "figurasLinguagem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'conexoes_teologicas' }),
    __metadata("design:type", Object)
], AnaliseExegetica.prototype, "conexoesTeologicas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'observacoes' }),
    __metadata("design:type", String)
], AnaliseExegetica.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'gerado_por_ia', default: false }),
    __metadata("design:type", Boolean)
], AnaliseExegetica.prototype, "geradoPorIa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], AnaliseExegetica.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], AnaliseExegetica.prototype, "atualizadoEm", void 0);
exports.AnaliseExegetica = AnaliseExegetica = __decorate([
    (0, typeorm_1.Entity)('analises_exegeticas')
], AnaliseExegetica);
//# sourceMappingURL=analise-exegetica.entity.js.map