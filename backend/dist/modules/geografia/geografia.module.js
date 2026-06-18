"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeografiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const geografia_controller_1 = require("./presentation/geografia.controller");
const geografia_service_1 = require("./application/geografia.service");
const localizacao_entity_1 = require("./domain/localizacao.entity");
const rota_entity_1 = require("./domain/rota.entity");
let GeografiaModule = class GeografiaModule {
};
exports.GeografiaModule = GeografiaModule;
exports.GeografiaModule = GeografiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([localizacao_entity_1.Localizacao, rota_entity_1.Rota])],
        controllers: [geografia_controller_1.GeografiaController],
        providers: [geografia_service_1.GeografiaService],
        exports: [geografia_service_1.GeografiaService],
    })
], GeografiaModule);
//# sourceMappingURL=geografia.module.js.map