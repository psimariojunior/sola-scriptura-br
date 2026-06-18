import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Usuario } from '../../usuario/domain/usuario.entity';
import { RefreshToken } from '../domain/refresh-token.entity';
export declare class AutenticacaoService {
    private usuarioRepo;
    private refreshRepo;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(usuarioRepo: Repository<Usuario>, refreshRepo: Repository<RefreshToken>, jwtService: JwtService, configService: ConfigService);
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
    login(email: string, senha: string): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
    refresh(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
    logout(usuarioId: string): Promise<void>;
    private gerarTokens;
}
