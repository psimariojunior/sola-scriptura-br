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
var CronologiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronologiaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evento_historico_entity_1 = require("../domain/evento-historico.entity");
let CronologiaService = CronologiaService_1 = class CronologiaService {
    constructor(eventoRepo) {
        this.eventoRepo = eventoRepo;
        this.logger = new common_1.Logger(CronologiaService_1.name);
    }
    async listarPorEra(era) {
        return this.eventoRepo.find({
            where: { era },
            order: { anoInicio: 'ASC' },
        });
    }
    async listarPorPeriodo(anoInicio, anoFim) {
        return this.eventoRepo.find({
            where: [
                { anoInicio: (0, typeorm_2.Between)(anoInicio, anoFim) },
                { anoFim: (0, typeorm_2.Between)(anoInicio, anoFim) },
            ],
            order: { anoInicio: 'ASC' },
        });
    }
    async listarPorCategoria(categoria) {
        return this.eventoRepo.find({
            where: { categoria },
            order: { anoInicio: 'ASC' },
        });
    }
    async linhaDoTempo() {
        return this.eventoRepo.find({ order: { anoInicio: 'ASC' }, take: 200 });
    }
};
exports.CronologiaService = CronologiaService;
exports.CronologiaService = CronologiaService = CronologiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evento_historico_entity_1.EventoHistorico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CronologiaService);
//# sourceMappingURL=cronologia.service.js.map