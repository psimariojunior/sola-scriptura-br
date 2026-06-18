import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Versiculo } from '../../biblia/domain/versiculo.entity';

@Entity('notas')
export class Nota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ name: 'versiculo_id', nullable: true })
  versiculoId: string;

  @ManyToOne(() => Versiculo, (v) => v.notas)
  @JoinColumn({ name: 'versiculo_id' })
  versiculo: Versiculo;

  @Column({ type: 'text', name: 'conteudo' })
  conteudo: string;

  @Column({ type: 'simple-json', nullable: true, name: 'etiquetas' })
  etiquetas: string[];

  @Column({ type: 'text', nullable: true, name: 'cor_destaque' })
  corDestaque: string;

  @Column({ type: 'boolean', default: false, name: 'publica' })
  publica: boolean;

  @Column({ type: 'boolean', default: false, name: 'sincronizado' })
  sincronizado: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
