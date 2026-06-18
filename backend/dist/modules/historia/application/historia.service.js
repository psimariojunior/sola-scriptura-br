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
var HistoriaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contexto_historico_entity_1 = require("../domain/contexto-historico.entity");
let HistoriaService = HistoriaService_1 = class HistoriaService {
    constructor(contextoRepo) {
        this.contextoRepo = contextoRepo;
        this.logger = new common_1.Logger(HistoriaService_1.name);
    }
    async buscarPorEntidade(tipo, id) {
        const contexto = await this.contextoRepo.findOne({
            where: { entidadeTipo: tipo, entidadeId: id },
        });
        if (!contexto) {
            throw new common_1.NotFoundException(`Contexto histórico não encontrado para ${tipo}:${id}`);
        }
        return contexto;
    }
    async buscarPorLivro(livroId) {
        return this.buscarPorEntidade('livro', livroId);
    }
};
exports.HistoriaService = HistoriaService;
exports.HistoriaService = HistoriaService = HistoriaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contexto_historico_entity_1.ContextoHistorico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HistoriaService);
//# sourceMappingURL=historia.service.js.map