import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('cross_references')
@Index(['origemRef', 'destinoRef'])
export class CrossReference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  origemRef: string;

  @Column({ length: 20 })
  destinoRef: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'float', default: 1.0 })
  relevancia: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
