import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { PerfilUsuario } from './perfil-usuario.entity';
import { PreferenciaUsuario } from './preferencia-usuario.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ name: 'senha_hash', select: false })
  senhaHash: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'varchar', length: 20, default: 'user', name: 'role' })
  role: string;

  @Column({ type: 'boolean', default: false, name: 'email_verificado' })
  emailVerificado: boolean;

  @Column({ type: 'boolean', default: false, name: 'mfa_ativado' })
  mfaAtivado: boolean;

  @Column({ type: 'text', nullable: true, name: 'mfa_segredo', select: false })
  mfaSegredo: string;

  @Column({ type: 'simple-json', nullable: true, name: 'mfa_codigos_recovery' })
  mfaCodigosRecovery: string[];

  @Column({ type: 'text', nullable: true, name: 'foto_url' })
  fotoUrl: string;

  @Column({ type: 'simple-json', nullable: true, name: 'provedores_oauth' })
  provedoresOAuth: any;

  @Column({ type: 'simple-json', nullable: true, name: 'permissoes' })
  permissoes: string[];

  @Column({ name: 'plano', length: 20, default: 'free' })
  plano: string;

  @Column({ type: 'timestamp', nullable: true, name: 'ultimo_acesso' })
  ultimoAcesso: Date;

  @OneToOne(() => PerfilUsuario, (perfil) => perfil.usuario, { cascade: true })
  perfil: PerfilUsuario;

  @OneToOne(() => PreferenciaUsuario, (pref) => pref.usuario, { cascade: true })
  preferencias: PreferenciaUsuario;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
