import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('push_subscriptions')
export class PushSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', nullable: true })
  @Index()
  usuarioId: string;

  @Column({ type: 'text', name: 'endpoint' })
  endpoint: string;

  @Column({ type: 'text', name: 'p256dh' })
  p256dh: string;

  @Column({ type: 'text', name: 'auth' })
  auth: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'user_agent' })
  userAgent: string;

  @Column({ type: 'boolean', default: true, name: 'ativo' })
  ativo: boolean;

  @Column({ type: 'varchar', length: 20, default: 'browser', name: 'plataforma' })
  plataforma: string;

  @Column({ type: 'timestamp', nullable: true, name: 'ultimo_push_enviado' })
  ultimoPushEnviado: Date;

  @Column({ type: 'int', default: 0, name: 'total_pushes_enviados' })
  totalPushesEnviados: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
