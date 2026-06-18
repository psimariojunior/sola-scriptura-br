"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoLeituraModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plano_leitura_controller_1 = require("./presentation/plano-leitura.controller");
const plano_leitura_service_1 = require("./application/plano-leitura.service");
const plano_leitura_entity_1 = require("./domain/plano-leitura.entity");
const progresso_leitura_entity_1 = require("./domain/progresso-leitura.entity");
let PlanoLeituraModule = class PlanoLeituraModule {
};
exports.PlanoLeituraModule = PlanoLeituraModule;
exports.PlanoLeituraModule = PlanoLeituraModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plano_leitura_entity_1.PlanoLeitura, progresso_leitura_entity_1.ProgressoLeitura])],
        controllers: [plano_leitura_controller_1.PlanoLeituraController],
        providers: [plano_leitura_service_1.PlanoLeituraService],
        exports: [plano_leitura_service_1.PlanoLeituraService],
    })
], PlanoLeituraModule);
//# sourceMappingURL=plano-leitura.module.js.map