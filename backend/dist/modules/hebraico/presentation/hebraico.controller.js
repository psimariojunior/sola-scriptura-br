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
exports.HebraicoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hebraico_service_1 = require("../application/hebraico.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let HebraicoController = class HebraicoController {
    constructor(hebraicoService) {
        this.hebraicoService = hebraicoService;
    }
    buscarPorStrong(strong) {
        return this.hebraicoService.buscarPorStrong(strong);
    }
    buscar(consulta) {
        return this.hebraicoService.buscarPorTransliteracao(consulta);
    }
    buscarPorRaiz(raiz) {
        return this.hebraicoService.buscarPorRaiz(raiz);
    }
    frequentes(limite) {
        return this.hebraicoService.buscarFrequentes(limite ? +limite : 100);
    }
};
exports.HebraicoController = HebraicoController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('strong/:strong'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca palavra hebraica pelo código Strong' }),
    __param(0, (0, common_1.Param)('strong')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HebraicoController.prototype, "buscarPorStrong", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisa por transliteração ou texto original' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HebraicoController.prototype, "buscar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('raiz/:raiz'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca palavras pela raiz' }),
    __param(0, (0, common_1.Param)('raiz')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HebraicoController.prototype, "buscarPorRaiz", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('frequentes'),
    (0, swagger_1.ApiOperation)({ summary: 'Palavras hebraicas mais frequentes no AT' }),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HebraicoController.prototype, "frequentes", null);
exports.HebraicoController = HebraicoController = __decorate([
    (0, swagger_1.ApiTags)('Hebraico'),
    (0, common_1.Controller)('hebraico'),
    __metadata("design:paramtypes", [hebraico_service_1.HebraicoService])
], HebraicoController);
//# sourceMappingURL=hebraico.controller.js.map