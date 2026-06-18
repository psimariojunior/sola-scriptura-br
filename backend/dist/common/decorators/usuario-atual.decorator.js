"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioAtual = void 0;
const common_1 = require("@nestjs/common");
exports.UsuarioAtual = (0, common_1.createParamDecorator)((dado, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return dado ? user?.[dado] : user;
});
//# sourceMappingURL=usuario-atual.decorator.js.map