import { UsuarioService } from '../application/usuario.service';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    buscarPerfil(usuarioId: string): Promise<import("../domain/usuario.entity").Usuario>;
    atualizarPerfil(usuarioId: string, dados: any): Promise<import("../domain/perfil-usuario.entity").PerfilUsuario>;
    atualizarPreferencias(usuarioId: string, dados: any): Promise<import("../domain/preferencia-usuario.entity").PreferenciaUsuario>;
}
