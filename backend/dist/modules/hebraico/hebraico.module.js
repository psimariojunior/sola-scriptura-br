"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HebraicoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hebraico_controller_1 = require("./presentation/hebraico.controller");
const hebraico_service_1 = require("./application/hebraico.service");
const palavra_hebraica_entity_1 = require("./domain/palavra-hebraica.entity");
let HebraicoModule = class HebraicoModule {
};
exports.HebraicoModule = HebraicoModule;
exports.HebraicoModule = HebraicoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([palavra_hebraica_entity_1.PalavraHebraica])],
        controllers: [hebraico_controller_1.HebraicoController],
        providers: [hebraico_service_1.HebraicoService],
        exports: [hebraico_service_1.HebraicoService],
    })
], HebraicoModule);
//# sourceMappingURL=hebraico.module.js.map