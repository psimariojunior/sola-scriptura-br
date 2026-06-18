import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/domain/usuario.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'token', unique: true })
  token: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'boolean', default: true, name: 'ativo' })
  ativo: boolean;

  @Column({ name: 'expira_em', type: 'timestamp' })
  expiraEm: Date;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
