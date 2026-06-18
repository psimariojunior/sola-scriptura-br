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
exports.GeografiaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const geografia_service_1 = require("../application/geografia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let GeografiaController = class GeografiaController {
    constructor(geografiaService) {
        this.geografiaService = geografiaService;
    }
    listarLocalizacoes(tipo) {
        return this.geografiaService.listarLocalizacoes(tipo);
    }
    buscarLocalizacao(slug) {
        return this.geografiaService.buscarLocalizacao(slug);
    }
    listarRotas() {
        return this.geografiaService.listarRotas();
    }
    proximos(lat, lng, raio) {
        return this.geografiaService.buscarProximos(lat, lng, raio);
    }
};
exports.GeografiaController = GeografiaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('localizacoes'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as localizações bíblicas' }),
    (0, swagger_1.ApiQuery)({ name: 'tipo', required: false }),
    __param(0, (0, common_1.Query)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GeografiaController.prototype, "listarLocalizacoes", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('localizacoes/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhes de uma localização' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GeografiaController.prototype, "buscarLocalizacao", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('rotas'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as rotas bíblicas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GeografiaController.prototype, "listarRotas", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('proximos'),
    (0, swagger_1.ApiOperation)({ summary: 'Localizações próximas' }),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __param(2, (0, common_1.Query)('raio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], GeografiaController.prototype, "proximos", null);
exports.GeografiaController = GeografiaController = __decorate([
    (0, swagger_1.ApiTags)('Geografia'),
    (0, common_1.Controller)('geografia'),
    __metadata("design:paramtypes", [geografia_service_1.GeografiaService])
], GeografiaController);
//# sourceMappingURL=geografia.controller.js.map