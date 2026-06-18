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
var HermeneuticaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermeneuticaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const analise_hermeneutica_entity_1 = require("../domain/analise-hermeneutica.entity");
let HermeneuticaService = HermeneuticaService_1 = class HermeneuticaService {
    constructor(analiseRepo) {
        this.analiseRepo = analiseRepo;
        this.logger = new common_1.Logger(HermeneuticaService_1.name);
    }
    async buscarPorVersiculo(versiculoId) {
        const analise = await this.analiseRepo.findOne({ where: { versiculoId } });
        if (!analise)
            throw new common_1.NotFoundException('Análise hermenêutica não encontrada');
        return analise;
    }
    async identificarGenero(versiculoId) {
        const analise = await this.buscarPorVersiculo(versiculoId);
        return analise.generoLiterario;
    }
};
exports.HermeneuticaService = HermeneuticaService;
exports.HermeneuticaService = HermeneuticaService = HermeneuticaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(analise_hermeneutica_entity_1.AnaliseHermeneutica)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HermeneuticaService);
//# sourceMappingURL=hermeneutica.service.js.map