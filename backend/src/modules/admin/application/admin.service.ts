import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from '../../usuario/application/usuario.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private usuarioService: UsuarioService) {}

  async dashboard(): Promise<any> {
    const usuarios = await this.usuarioService.listarUsuarios(1, 5);
    return {
      totalUsuarios: usuarios.total,
      usuariosRecentes: usuarios.usuarios,
      metricas: {
        usuariosAtivos: usuarios.total,
        planosGratuitos: 0,
        planosPremium: 0,
        totalEstudos: 0,
      },
      versao: '1.0.0',
      uptime: process.uptime(),
    };
  }
}
