import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('archaeological_finds')
@Index(['localId'])
export class ArchaeologicalFind {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ name: 'local_id', nullable: true })
  localId: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  significado: string;

  @Column({ length: 100, nullable: true })
  descobertoPor: string;

  @Column({ type: 'int', nullable: true })
  anoDescoberta: number;

  @Column({ type: 'text', nullable: true })
  datacao: string;

  @Column('simple-json', { nullable: true })
  referenciasBiblicas: string[];

  @Column('simple-json', { nullable: true })
  imagemUrls: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
