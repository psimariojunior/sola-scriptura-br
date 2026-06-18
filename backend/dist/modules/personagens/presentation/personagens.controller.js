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
exports.PersonagensController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const personagens_service_1 = require("../application/personagens.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let PersonagensController = class PersonagensController {
    constructor(personagensService) {
        this.personagensService = personagensService;
    }
    listar(limite) {
        return this.personagensService.listarPersonagens(limite ? +limite : 50);
    }
    buscar(consulta) {
        return this.personagensService.buscarPorNome(consulta);
    }
    buscarPorSlug(slug) {
        return this.personagensService.buscarPorSlug(slug);
    }
};
exports.PersonagensController = PersonagensController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista personagens bíblicos' }),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PersonagensController.prototype, "listar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisa personagens pelo nome' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonagensController.prototype, "buscar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhes de um personagem' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonagensController.prototype, "buscarPorSlug", null);
exports.PersonagensController = PersonagensController = __decorate([
    (0, swagger_1.ApiTags)('Personagens'),
    (0, common_1.Controller)('personagens'),
    __metadata("design:paramtypes", [personagens_service_1.PersonagensService])
], PersonagensController);
//# sourceMappingURL=personagens.controller.js.map