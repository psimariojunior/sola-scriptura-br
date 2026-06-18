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
exports.GramaticaGrega = void 0;
const typeorm_1 = require("typeorm");
let GramaticaGrega = class GramaticaGrega {
};
exports.GramaticaGrega = GramaticaGrega;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'categoria' }),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'conteudo' }),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'exemplos' }),
    __metadata("design:type", Array)
], GramaticaGrega.prototype, "exemplos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'regra_gramatical' }),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "regraGramatical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'observacoes' }),
    __metadata("design:type", String)
], GramaticaGrega.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], GramaticaGrega.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], GramaticaGrega.prototype, "atualizadoEm", void 0);
exports.GramaticaGrega = GramaticaGrega = __decorate([
    (0, typeorm_1.Entity)('gramatica_grega')
], GramaticaGrega);
//# sourceMappingURL=gramatica-grega.entity.js.map