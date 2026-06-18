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
exports.ExegeseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exegese_service_1 = require("../application/exegese.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let ExegeseController = class ExegeseController {
    constructor(exegeseService) {
        this.exegeseService = exegeseService;
    }
    analisar(versiculoId) {
        return this.exegeseService.buscarPorVersiculo(versiculoId);
    }
    contextos(versiculoId) {
        return this.exegeseService.listarContextos(versiculoId);
    }
};
exports.ExegeseController = ExegeseController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('versiculo/:versiculoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Análise exegética completa de um versículo' }),
    __param(0, (0, common_1.Param)('versiculoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExegeseController.prototype, "analisar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('versiculo/:versiculoId/contextos'),
    (0, swagger_1.ApiOperation)({ summary: 'Contextos exegéticos de um versículo' }),
    __param(0, (0, common_1.Param)('versiculoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExegeseController.prototype, "contextos", null);
exports.ExegeseController = ExegeseController = __decorate([
    (0, swagger_1.ApiTags)('Exegese'),
    (0, common_1.Controller)('exegese'),
    __metadata("design:paramtypes", [exegese_service_1.ExegeseService])
], ExegeseController);
//# sourceMappingURL=exegese.controller.js.map