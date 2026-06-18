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
var GeografiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeografiaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const localizacao_entity_1 = require("../domain/localizacao.entity");
const rota_entity_1 = require("../domain/rota.entity");
let GeografiaService = GeografiaService_1 = class GeografiaService {
    constructor(localizacaoRepo, rotaRepo) {
        this.localizacaoRepo = localizacaoRepo;
        this.rotaRepo = rotaRepo;
        this.logger = new common_1.Logger(GeografiaService_1.name);
    }
    async listarLocalizacoes(tipo) {
        const where = tipo ? { tipo } : {};
        return this.localizacaoRepo.find({ where, order: { nomePortugues: 'ASC' } });
    }
    async buscarLocalizacao(slug) {
        const loc = await this.localizacaoRepo.findOne({ where: { slug } });
        if (!loc)
            throw new common_1.NotFoundException(`Localização ${slug} não encontrada`);
        return loc;
    }
    async listarRotas() {
        return this.rotaRepo.find();
    }
    async buscarProximos(latitude, longitude, raioKm = 50) {
        return this.localizacaoRepo
            .createQueryBuilder('l')
            .where(`earth_distance(ll_to_earth(:lat, :lng), ll_to_earth(l.latitude, l.longitude)) < :raio`, { lat: latitude, lng: longitude, raio: raioKm * 1000 })
            .getMany();
    }
};
exports.GeografiaService = GeografiaService;
exports.GeografiaService = GeografiaService = GeografiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(localizacao_entity_1.Localizacao)),
    __param(1, (0, typeorm_1.InjectRepository)(rota_entity_1.Rota)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GeografiaService);
//# sourceMappingURL=geografia.service.js.map