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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronologiaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cronologia_service_1 = require("../application/cronologia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let CronologiaController = class CronologiaController {
    constructor(cronologiaService) {
        this.cronologiaService = cronologiaService;
    }
    linhaDoTempo() {
        return this.cronologiaService.linhaDoTempo();
    }
    porEra(era) {
        return this.cronologiaService.listarPorEra(era);
    }
    porPeriodo(inicio, fim) {
        return this.cronologiaService.listarPorPeriodo(+inicio, +fim);
    }
    porCategoria(categoria) {
        return this.cronologiaService.listarPorCategoria(categoria);
    }
};
exports.CronologiaController = CronologiaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('linha-do-tempo'),
    (0, swagger_1.ApiOperation)({ summary: 'Linha do tempo completa' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronologiaController.prototype, "linhaDoTempo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('era/:era'),
    (0, swagger_1.ApiOperation)({ summary: 'Eventos por era (AC/DC)' }),
    __param(0, (0, common_1.Param)('era')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CronologiaController.prototype, "porEra", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('periodo'),
    (0, swagger_1.ApiOperation)({ summary: 'Eventos em um período específico' }),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CronologiaController.prototype, "porPeriodo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('categoria/:categoria'),
    (0, swagger_1.ApiOperation)({ summary: 'Eventos por categoria' }),
    __param(0, (0, common_1.Param)('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CronologiaController.prototype, "porCategoria", null);
exports.CronologiaController = CronologiaController = __decorate([
    (0, swagger_1.ApiTags)('Cronologia'),
    (0, common_1.Controller)('cronologia'),
    __metadata("design:paramtypes", [cronologia_service_1.CronologiaService])
], CronologiaController);
//# sourceMappingURL=cronologia.controller.js.map