import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('doctrines')
export class Doctrine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  nome: string;

  @Column({ length: 50 })
  categoria: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  fundamentoScriptureiro: string;

  @Column('simple-json', { nullable: true })
  tradicoes: Record<string, string>;

  @Column('simple-json', { nullable: true })
  debatesTeologicos: Array<{ posicao: string; descricao: string }>;

  @Column('simple-json', { nullable: true })
  referenciasChave: string[];

  @Column('float', { array: true, nullable: true })
  embedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
