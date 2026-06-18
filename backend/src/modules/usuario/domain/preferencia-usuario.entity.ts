import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('preferencias_usuario')
export class PreferenciaUsuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', unique: true })
  usuarioId: string;

  @OneToOne(() => Usuario, (usuario) => usuario.preferencias)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ length: 10, default: 'pt-BR', name: 'idioma' })
  idioma: string;

  @Column({ length: 10, default: 'pt-BR', name: 'locale' })
  locale: string;

  @Column({ length: 20, default: 'dracula', name: 'tema' })
  tema: string;

  @Column({ length: 10, default: '18', name: 'tamanho_fonte' })
  tamanhoFonte: string;

  @Column({ length: 50, default: 'nova-versao-internacional', name: 'traducao_padrao' })
  traducaoPadrao: string;

  @Column({ type: 'boolean', default: true, name: 'mostrar_strong' })
  mostrarStrong: boolean;

  @Column({ type: 'boolean', default: true, name: 'mostrar_notas_rodape' })
  mostrarNotasRodape: boolean;

  @Column({ type: 'boolean', default: false, name: 'mostrar_versiculos_paralelos' })
  mostrarVersiculosParalelos: boolean;

  @Column({ type: 'boolean', default: true, name: 'notificacoes_estudo' })
  notificacoesEstudo: boolean;

  @Column({ type: 'boolean', default: false, name: 'modo_escuro' })
  modoEscuro: boolean;

  @Column({ type: 'simple-json', nullable: true, name: 'layout_personalizado' })
  layoutPersonalizado: any;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
