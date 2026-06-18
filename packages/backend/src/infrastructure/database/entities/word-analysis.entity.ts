import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('word_analysis')
@Index(['palavra', 'idioma'])
export class WordAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  palavra: string;

  @Column({ length: 20 })
  idioma: string;

  @Column({ length: 20, nullable: true })
  strong: string;

  @Column({ length: 100, nullable: true })
  lemma: string;

  @Column({ length: 100, nullable: true })
  transliteracao: string;

  @Column({ length: 200, nullable: true })
  pronuncia: string;

  @Column({ length: 50, nullable: true })
  classeGramatical: string;

  @Column({ length: 30, nullable: true })
  tempoVerbal: string;

  @Column({ length: 30, nullable: true })
  modoVerbal: string;

  @Column({ length: 30, nullable: true })
  vozVerbal: string;

  @Column({ length: 20, nullable: true })
  pessoa: string;

  @Column({ length: 20, nullable: true })
  numero: string;

  @Column({ length: 20, nullable: true })
  genero: string;

  @Column({ length: 50, nullable: true })
  caso: string;

  @Column({ type: 'text', nullable: true })
  definicao: string;

  @Column({ type: 'text', nullable: true })
  usoHistorico: string;

  @Column({ type: 'int', nullable: true })
  frequencia: number;

  @Column({ type: 'float', nullable: true, name: 'peso_semantico' })
  pesoSemantico: number;

  @Column('float', { array: true, nullable: true })
  embedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
