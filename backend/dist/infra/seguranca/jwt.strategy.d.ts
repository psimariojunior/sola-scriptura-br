import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Usuario } from '../../modules/usuario/domain/usuario.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usuarioRepo;
    constructor(configService: ConfigService, usuarioRepo: Repository<Usuario>);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string;
        email: string;
        perfil: import("../../modules/usuario/domain/perfil-usuario.entity").PerfilUsuario;
    }>;
}
export {};
