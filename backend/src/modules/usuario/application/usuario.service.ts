import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../domain/usuario.entity';
import { PreferenciaUsuario } from '../domain/preferencia-usuario.entity';
import { PerfilUsuario } from '../domain/perfil-usuario.entity';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(PreferenciaUsuario) private preferenciaRepo: Repository<PreferenciaUsuario>,
    @InjectRepository(PerfilUsuario) private perfilRepo: Repository<PerfilUsuario>,
  ) {}

  async buscarPerfil(usuarioId: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
      relations: ['perfil', 'preferencias'],
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async atualizarPerfil(usuarioId: string, dados: Partial<PerfilUsuario>): Promise<PerfilUsuario> {
    let perfil = await this.perfilRepo.findOne({ where: { usuarioId } });
    if (!perfil) {
      perfil = this.perfilRepo.create({ usuarioId, ...dados });
    } else {
      Object.assign(perfil, dados);
    }
    return this.perfilRepo.save(perfil);
  }

  async atualizarPreferencias(usuarioId: string, dados: Partial<PreferenciaUsuario>): Promise<PreferenciaUsuario> {
    let preferencias = await this.preferenciaRepo.findOne({ where: { usuarioId } });
    if (!preferencias) {
      preferencias = this.preferenciaRepo.create({ usuarioId, ...dados });
    } else {
      Object.assign(preferencias, dados);
    }
    return this.preferenciaRepo.save(preferencias);
  }

  async listarUsuarios(pagina = 1, limite = 20) {
    const [usuarios, total] = await this.usuarioRepo.findAndCount({
      skip: (pagina - 1) * limite,
      take: limite,
      order: { criadoEm: 'DESC' },
    });
    return { usuarios, total, pagina, limite };
  }
}
