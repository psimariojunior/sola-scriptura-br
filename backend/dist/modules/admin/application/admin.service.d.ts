import { UsuarioService } from '../../usuario/application/usuario.service';
export declare class AdminService {
    private usuarioService;
    private readonly logger;
    constructor(usuarioService: UsuarioService);
    dashboard(): Promise<any>;
}
