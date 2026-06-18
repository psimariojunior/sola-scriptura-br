import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('lexicon_entries')
@Index(['strong', 'idioma'])
export class LexiconEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  strong: string;

  @Column({ length: 20 })
  idioma: string;

  @Column({ length: 100 })
  lemma: string;

  @Column({ length: 100, nullable: true })
  transliteracao: string;

  @Column({ length: 50, nullable: true })
  classeGramatical: string;

  @Column({ type: 'text' })
  definicao: string;

  @Column({ type: 'text', nullable: true })
  definicaoOriginal: string;

  @Column({ length: 100, nullable: true })
  fonte: string;

  @Column('simple-json', { nullable: true })
  significados: string[];

  @Column('simple-json', { nullable: true })
  ocorrencias: Array<{ livro: string; capitulo: number; versiculo: number }>;

  @Column({ type: 'int', nullable: true })
  totalOcorrencias: number;

  @Column('float', { array: true, nullable: true })
  embedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
