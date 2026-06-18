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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlanoLeituraService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoLeituraService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plano_leitura_entity_1 = require("../domain/plano-leitura.entity");
const progresso_leitura_entity_1 = require("../domain/progresso-leitura.entity");
let PlanoLeituraService = PlanoLeituraService_1 = class PlanoLeituraService {
    constructor(planoSchema, progressoSchema) {
        this.planoSchema = planoSchema;
        this.progressoSchema = progressoSchema;
        this.logger = new common_1.Logger(PlanoLeituraService_1.name);
    }
    async listarPlanos() {
        return this.planoSchema.find({ where: { publico: true }, order: { nome: 'ASC' } });
    }
    async buscarPlano(id) {
        return (await this.planoSchema.findOne({ where: { id } }));
    }
    async iniciarPlano(usuarioId, planoId) {
        const progresso = this.progressoSchema.create({
            usuarioId, planoId, dataInicio: new Date(), diaAtual: 1,
        });
        return this.progressoSchema.save(progresso);
    }
    async avancarDia(usuarioId, progressoId) {
        const progresso = await this.progressoSchema.findOne({ where: { id: progressoId, usuarioId } });
        if (!progresso)
            throw new Error('Progresso não encontrado');
        progresso.diaAtual += 1;
        if (!progresso.diasCompletos)
            progresso.diasCompletos = [];
        progresso.diasCompletos.push(progresso.diaAtual - 1);
        const plano = await this.planoSchema.findOne({ where: { id: progresso.planoId } });
        if (progresso.diaAtual > (plano?.totalDias || 0)) {
            progresso.concluido = true;
            progresso.dataConclusao = new Date();
        }
        return this.progressoSchema.save(progresso);
    }
    async progressoUsuario(usuarioId) {
        return this.progressoSchema.find({
            where: { usuarioId },
            relations: ['plano'],
            order: { dataInicio: 'DESC' },
        });
    }
};
exports.PlanoLeituraService = PlanoLeituraService;
exports.PlanoLeituraService = PlanoLeituraService = PlanoLeituraService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plano_leitura_entity_1.PlanoLeitura)),
    __param(1, (0, typeorm_1.InjectRepository)(progresso_leitura_entity_1.ProgressoLeitura)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PlanoLeituraService);
//# sourceMappingURL=plano-leitura.service.js.map