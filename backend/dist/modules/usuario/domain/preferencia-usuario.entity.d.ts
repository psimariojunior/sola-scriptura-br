import { Usuario } from './usuario.entity';
export declare class PreferenciaUsuario {
    id: string;
    usuarioId: string;
    usuario: Usuario;
    idioma: string;
    locale: string;
    tema: string;
    tamanhoFonte: string;
    traducaoPadrao: string;
    mostrarStrong: boolean;
    mostrarNotasRodape: boolean;
    mostrarVersiculosParalelos: boolean;
    notificacoesEstudo: boolean;
    modoEscuro: boolean;
    layoutPersonalizado: any;
    criadoEm: Date;
    atualizadoEm: Date;
}
