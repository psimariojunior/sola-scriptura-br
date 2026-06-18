import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('perfis_usuario')
export class PerfilUsuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', unique: true })
  usuarioId: string;

  @OneToOne(() => Usuario, (usuario) => usuario.perfil)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'text', nullable: true, name: 'bio' })
  bio: string;

  @Column({ type: 'text', nullable: true, name: 'denominacao' })
  denominacao: string;

  @Column({ type: 'simple-json', nullable: true, name: 'interesses' })
  interesses: string[];

  @Column({ type: 'text', nullable: true, name: 'idiomas_preferidos', array: true })
  idiomasPreferidos: string[];

  @Column({ type: 'text', nullable: true, name: 'tradicao_teologica' })
  tradicaoTeologica: string;

  @Column({ type: 'text', nullable: true, name: 'nivel_estudo' })
  nivelEstudo: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
