import { PerfilUsuario } from './perfil-usuario.entity';
import { PreferenciaUsuario } from './preferencia-usuario.entity';
export declare class Usuario {
    id: string;
    nome: string;
    email: string;
    senhaHash: string;
    ativo: boolean;
    emailVerificado: boolean;
    mfaAtivado: boolean;
    mfaSegredo: string;
    mfaCodigosRecovery: string[];
    fotoUrl: string;
    provedoresOAuth: any;
    permissoes: string[];
    plano: string;
    ultimoAcesso: Date;
    perfil: PerfilUsuario;
    preferencias: PreferenciaUsuario;
    criadoEm: Date;
    atualizadoEm: Date;
}
