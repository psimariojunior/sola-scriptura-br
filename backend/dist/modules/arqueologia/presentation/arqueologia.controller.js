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
exports.ArqueologiaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const arqueologia_service_1 = require("../application/arqueologia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let ArqueologiaController = class ArqueologiaController {
    constructor(arqueologiaService) {
        this.arqueologiaService = arqueologiaService;
    }
    listarArtefatos(tipo) {
        return this.arqueologiaService.listarArtefatos(tipo);
    }
    buscarArtefato(id) {
        return this.arqueologiaService.buscarArtefato(id);
    }
    listarManuscritos() {
        return this.arqueologiaService.listarManuscritos();
    }
};
exports.ArqueologiaController = ArqueologiaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('artefatos'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista artefatos arqueológicos' }),
    __param(0, (0, common_1.Query)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArqueologiaController.prototype, "listarArtefatos", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('artefatos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhes de um artefato' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArqueologiaController.prototype, "buscarArtefato", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('manuscritos'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista manuscritos antigos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArqueologiaController.prototype, "listarManuscritos", null);
exports.ArqueologiaController = ArqueologiaController = __decorate([
    (0, swagger_1.ApiTags)('Arqueologia'),
    (0, common_1.Controller)('arqueologia'),
    __metadata("design:paramtypes", [arqueologia_service_1.ArqueologiaService])
], ArqueologiaController);
//# sourceMappingURL=arqueologia.controller.js.map