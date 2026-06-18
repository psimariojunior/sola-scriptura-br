import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { Capitulo } from './capitulo.entity';
import { Traducao } from './traducao.entity';
import { Testamento } from './testamento.entity';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ name: 'nome_abreviado', length: 30 })
  nomeAbreviado: string;

  @Column({ name: 'nome_ingles', length: 100, nullable: true })
  nomeIngles: string;

  @Column({ name: 'nome_hebraico', length: 100, nullable: true })
  nomeHebraico: string;

  @Column({ name: 'nome_grego', length: 100, nullable: true })
  nomeGrego: string;

  @Column({ length: 10, unique: true })
  slug: string;

  @Column({ type: 'int', name: 'ordem_testamento' })
  ordemTestamento: number;

  @Column({ type: 'int', name: 'ordem_geral' })
  ordemGeral: number;

  @Column({ type: 'int', name: 'total_capitulos', default: 0 })
  totalCapitulos: number;

  @Column({ type: 'text', nullable: true })
  autor: string;

  @Column({ type: 'text', nullable: true, name: 'data_escrita' })
  dataEscrita: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_historico' })
  contextoHistorico: string;

  @Column({ type: 'text', nullable: true, name: 'proposito' })
  proposito: string;

  @Column({ type: 'text', nullable: true, name: 'temas_principais' })
  temasPrincipais: string;

  @Column({ type: 'text', nullable: true, name: 'palavras_chave', array: true })
  palavrasChave: string[];

  @Column({ type: 'text', nullable: true, name: 'genero_literario' })
  generoLiterario: string;

  @Column({ name: 'testamento_id' })
  testamentoId: string;

  @ManyToOne(() => Testamento, (testamento) => testamento.livros)
  @JoinColumn({ name: 'testamento_id' })
  testamento: Testamento;

  @OneToMany(() => Capitulo, (capitulo) => capitulo.livro)
  capitulos: Capitulo[];

  @OneToMany(() => Traducao, (traducao) => traducao.livro)
  traducoes: Traducao[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
