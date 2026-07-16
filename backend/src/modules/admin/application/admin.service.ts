import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Usuario } from '../../usuario/domain/usuario.entity';
import { AtualizarUsuarioAdminDto } from '../presentation/dto/admin.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async dashboard() {
    const totalUsuarios = await this.usuarioRepo.count();
    const totalAdmins = await this.usuarioRepo.count({ where: { role: 'admin' } });
    const totalAtivos = await this.usuarioRepo.count({ where: { ativo: true } });
    const totalInativos = await this.usuarioRepo.count({ where: { ativo: false } });
    const totalPremium = await this.usuarioRepo.count({ where: { plano: 'premium' } });

    const usuariosRecentes = await this.usuarioRepo.find({
      order: { criadoEm: 'DESC' },
      take: 10,
    });

    const usuariosPorMes = await this.usuarioRepo
      .createQueryBuilder('u')
      .select("TO_CHAR(u.criado_em, 'YYYY-MM')", 'mes')
      .addSelect('COUNT(*)', 'total')
      .groupBy("TO_CHAR(u.criado_em, 'YYYY-MM')")
      .orderBy('mes', 'DESC')
      .limit(12)
      .getRawMany();

    return {
      totalUsuarios,
      totalAdmins,
      totalAtivos,
      totalInativos,
      totalPremium,
      usuariosRecentes,
      usuariosPorMes,
      metricas: {
        usuariosAtivos: totalAtivos,
        planosGratuitos: totalUsuarios - totalPremium,
        planosPremium: totalPremium,
        totalEstudos: 0,
      },
      versao: '2.0.0',
      uptime: process.uptime(),
    };
  }

  async listarUsuarios(filtros: {
    pagina?: number;
    limite?: number;
    busca?: string;
    role?: string;
    ativo?: string;
    plano?: string;
  }) {
    const pagina = filtros.pagina || 1;
    const limite = filtros.limite || 20;

    const qb = this.usuarioRepo.createQueryBuilder('u');

    if (filtros.busca) {
      qb.andWhere('(LOWER(u.nome) LIKE LOWER(:busca) OR LOWER(u.email) LIKE LOWER(:busca))', {
        busca: `%${filtros.busca}%`,
      });
    }

    if (filtros.role) {
      qb.andWhere('u.role = :role', { role: filtros.role });
    }

    if (filtros.ativo !== undefined && filtros.ativo !== '') {
      qb.andWhere('u.ativo = :ativo', { ativo: filtros.ativo === 'true' });
    }

    if (filtros.plano) {
      qb.andWhere('u.plano = :plano', { plano: filtros.plano });
    }

    qb.orderBy('u.criadoEm', 'DESC');
    qb.skip((pagina - 1) * limite);
    qb.take(limite);

    const [usuarios, total] = await qb.getManyAndCount();

    return {
      usuarios,
      total,
      pagina,
      limite,
      totalPaginas: Math.ceil(total / limite),
    };
  }

  async buscarUsuarioPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['perfil', 'preferencias'],
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async atualizarUsuario(id: string, dados: AtualizarUsuarioAdminDto): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    if (dados.role !== undefined) usuario.role = dados.role;
    if (dados.ativo !== undefined) usuario.ativo = dados.ativo;
    if (dados.plano !== undefined) usuario.plano = dados.plano;
    if (dados.nome !== undefined) usuario.nome = dados.nome;

    await this.usuarioRepo.save(usuario);
    this.logger.log(`Admin atualizou usuário ${id}: ${JSON.stringify(dados)}`);
    return usuario;
  }

  async desativarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    usuario.ativo = false;
    await this.usuarioRepo.save(usuario);
    this.logger.log(`Admin desativou usuário ${id}`);
    return usuario;
  }

  async reativarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    usuario.ativo = true;
    await this.usuarioRepo.save(usuario);
    this.logger.log(`Admin reativou usuário ${id}`);
    return usuario;
  }

  async promoverAdmin(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    usuario.role = 'admin';
    await this.usuarioRepo.save(usuario);
    this.logger.log(`Admin promoveu usuário ${id} a admin`);
    return usuario;
  }

  async rebaixarAdmin(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    usuario.role = 'user';
    await this.usuarioRepo.save(usuario);
    this.logger.log(`Admin rebaixou usuário ${id} para user`);
    return usuario;
  }
}
