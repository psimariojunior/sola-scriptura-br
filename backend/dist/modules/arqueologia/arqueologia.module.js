"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArqueologiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arqueologia_controller_1 = require("./presentation/arqueologia.controller");
const arqueologia_service_1 = require("./application/arqueologia.service");
const artefato_entity_1 = require("./domain/artefato.entity");
const escavacao_entity_1 = require("./domain/escavacao.entity");
const manuscrito_entity_1 = require("./domain/manuscrito.entity");
let ArqueologiaModule = class ArqueologiaModule {
};
exports.ArqueologiaModule = ArqueologiaModule;
exports.ArqueologiaModule = ArqueologiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([artefato_entity_1.Artefato, escavacao_entity_1.Escavacao, manuscrito_entity_1.Manuscrito])],
        controllers: [arqueologia_controller_1.ArqueologiaController],
        providers: [arqueologia_service_1.ArqueologiaService],
        exports: [arqueologia_service_1.ArqueologiaService],
    })
], ArqueologiaModule);
//# sourceMappingURL=arqueologia.module.js.map