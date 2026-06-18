import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('commentaries')
@Index(['livro', 'capitulo', 'versiculo'])
export class Commentary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  titulo: string;

  @Column({ length: 100 })
  autor: string;

  @Column({ length: 50 })
  tradicao: string;

  @Column({ length: 50 })
  livro: string;

  @Column({ type: 'int', nullable: true })
  capitulo: number;

  @Column({ type: 'int', nullable: true })
  versiculo: number;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ type: 'text', nullable: true })
  contextoHistorico: string;

  @Column({ type: 'text', nullable: true })
  aplicacao: string;

  @Column('simple-json', { nullable: true })
  referencias: string[];

  @Column('float', { array: true, nullable: true })
  embedding: number[];

  @Column({ default: true })
  publico: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
