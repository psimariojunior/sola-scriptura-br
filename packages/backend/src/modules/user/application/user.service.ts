import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../infrastructure/database/entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async criarUsuario(data: { email: string; senha: string; nome: string; tradicao?: string }): Promise<User> {
    const existente = await this.userRepo.findOne({ where: { email: data.email } });
    if (existente) {
      throw new ConflictException('Email já cadastrado');
    }

    const usuario = this.userRepo.create({
      email: data.email,
      senha: data.senha,
      nome: data.nome,
      tradicao: data.tradicao,
      preferencias: {
        versaoPadrao: 'ARA',
        tema: 'claro',
        fontSize: 16,
        modoOffline: false,
      },
    });

    return this.userRepo.save(usuario);
  }

  async buscarUsuario(id: string): Promise<User> {
    const usuario = await this.userRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async atualizarPreferencias(
    id: string,
    preferencias: Partial<User['preferencias']>,
  ): Promise<User> {
    const usuario = await this.buscarUsuario(id);
    usuario.preferencias = { ...usuario.preferencias, ...preferencias } as any;
    return this.userRepo.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }
}
