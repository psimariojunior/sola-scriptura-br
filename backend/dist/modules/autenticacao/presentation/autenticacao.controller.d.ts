import { AutenticacaoService } from '../application/autenticacao.service';
export declare class AutenticacaoController {
    private readonly authService;
    constructor(authService: AutenticacaoService);
    cadastrar(dados: {
        nome: string;
        email: string;
        senha: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
    login(credenciais: {
        email: string;
        senha: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
    refresh(dados: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
    logout(usuarioId: string): Promise<void>;
}
