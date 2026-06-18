"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historia_controller_1 = require("./presentation/historia.controller");
const historia_service_1 = require("./application/historia.service");
const contexto_historico_entity_1 = require("./domain/contexto-historico.entity");
let HistoriaModule = class HistoriaModule {
};
exports.HistoriaModule = HistoriaModule;
exports.HistoriaModule = HistoriaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contexto_historico_entity_1.ContextoHistorico])],
        controllers: [historia_controller_1.HistoriaController],
        providers: [historia_service_1.HistoriaService],
        exports: [historia_service_1.HistoriaService],
    })
], HistoriaModule);
//# sourceMappingURL=historia.module.js.map