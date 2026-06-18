import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('knowledge_graph_entities')
export class KnowledgeGraphEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column('simple-json', { nullable: true })
  propriedades: Record<string, any>;

  @Column('float', { array: true, nullable: true })
  embedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}

@Entity('knowledge_graph_relationships')
@Index(['origemId', 'destinoId', 'tipoRelacao'], { unique: true })
export class KnowledgeGraphRelationship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'origem_id' })
  origemId: string;

  @Column({ name: 'destino_id' })
  destinoId: string;

  @Column({ length: 50 })
  tipoRelacao: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column('simple-json', { nullable: true })
  referenciasBiblicas: string[];

  @Column({ type: 'float', default: 1.0 })
  peso: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
