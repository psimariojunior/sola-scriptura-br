import { Usuario } from './usuario.entity';
export declare class PerfilUsuario {
    id: string;
    usuarioId: string;
    usuario: Usuario;
    bio: string;
    denominacao: string;
    interesses: string[];
    idiomasPreferidos: string[];
    tradicaoTeologica: string;
    nivelEstudo: string;
    criadoEm: Date;
    atualizadoEm: Date;
}
