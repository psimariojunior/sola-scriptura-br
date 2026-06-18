"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibliaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const biblia_controller_1 = require("./presentation/biblia.controller");
const biblia_service_1 = require("./application/biblia.service");
const livro_entity_1 = require("./domain/livro.entity");
const capitulo_entity_1 = require("./domain/capitulo.entity");
const versiculo_entity_1 = require("./domain/versiculo.entity");
const palavra_entity_1 = require("./domain/palavra.entity");
const traducao_entity_1 = require("./domain/traducao.entity");
const testamento_entity_1 = require("./domain/testamento.entity");
let BibliaModule = class BibliaModule {
};
exports.BibliaModule = BibliaModule;
exports.BibliaModule = BibliaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([livro_entity_1.Livro, capitulo_entity_1.Capitulo, versiculo_entity_1.Versiculo, palavra_entity_1.Palavra, traducao_entity_1.Traducao, testamento_entity_1.Testamento]),
        ],
        controllers: [biblia_controller_1.BibliaController],
        providers: [biblia_service_1.BibliaService],
        exports: [biblia_service_1.BibliaService],
    })
], BibliaModule);
//# sourceMappingURL=biblia.module.js.map