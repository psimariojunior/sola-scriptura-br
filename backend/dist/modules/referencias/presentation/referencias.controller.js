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
exports.ReferenciasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const referencias_service_1 = require("../application/referencias.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let ReferenciasController = class ReferenciasController {
    constructor(referenciasService) {
        this.referenciasService = referenciasService;
    }
    buscarPorVersiculo(versiculoId) {
        return this.referenciasService.buscarPorVersiculo(versiculoId);
    }
    buscarPorTipo(tipo) {
        return this.referenciasService.buscarPorTipo(tipo);
    }
};
exports.ReferenciasController = ReferenciasController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('versiculo/:versiculoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Referências cruzadas de um versículo' }),
    __param(0, (0, common_1.Param)('versiculoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenciasController.prototype, "buscarPorVersiculo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('tipo/:tipo'),
    (0, swagger_1.ApiOperation)({ summary: 'Referências por tipo de relação' }),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferenciasController.prototype, "buscarPorTipo", null);
exports.ReferenciasController = ReferenciasController = __decorate([
    (0, swagger_1.ApiTags)('Referências'),
    (0, common_1.Controller)('referencias'),
    __metadata("design:paramtypes", [referencias_service_1.ReferenciasService])
], ReferenciasController);
//# sourceMappingURL=referencias.controller.js.map