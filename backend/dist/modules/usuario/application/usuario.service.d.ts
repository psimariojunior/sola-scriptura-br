import { Repository } from 'typeorm';
import { Usuario } from '../domain/usuario.entity';
import { PreferenciaUsuario } from '../domain/preferencia-usuario.entity';
import { PerfilUsuario } from '../domain/perfil-usuario.entity';
export declare class UsuarioService {
    private usuarioRepo;
    private preferenciaRepo;
    private perfilRepo;
    private readonly logger;
    constructor(usuarioRepo: Repository<Usuario>, preferenciaRepo: Repository<PreferenciaUsuario>, perfilRepo: Repository<PerfilUsuario>);
    buscarPerfil(usuarioId: string): Promise<Usuario>;
    atualizarPerfil(usuarioId: string, dados: Partial<PerfilUsuario>): Promise<PerfilUsuario>;
    atualizarPreferencias(usuarioId: string, dados: Partial<PreferenciaUsuario>): Promise<PreferenciaUsuario>;
    listarUsuarios(pagina?: number, limite?: number): Promise<{
        usuarios: Usuario[];
        total: number;
        pagina: number;
        limite: number;
    }>;
}
