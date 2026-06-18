import { Usuario } from '../../usuario/domain/usuario.entity';
export declare class RefreshToken {
    id: string;
    token: string;
    usuarioId: string;
    usuario: Usuario;
    ativo: boolean;
    expiraEm: Date;
    criadoEm: Date;
}
