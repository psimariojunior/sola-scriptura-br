import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { BibleVersion } from './bible-version.entity';
import { BibleChapter } from './bible-chapter.entity';

@Entity('bible_books')
export class BibleBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'versao_id' })
  versaoId: string;

  @Column({ type: 'int' })
  ordem: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, nullable: true })
  nomeHebraico: string;

  @Column({ length: 100, nullable: true })
  nomeGrego: string;

  @Column({ length: 10 })
  testamento: string;

  @Column({ length: 20 })
  genero: string;

  @Column({ length: 50, nullable: true })
  autor: string;

  @Column({ type: 'int', nullable: true })
  totalCapitulos: number;

  @Column({ type: 'text', nullable: true })
  resumo: string;

  @ManyToOne(() => BibleVersion, (versao) => versao.livros)
  @JoinColumn({ name: 'versao_id' })
  versao: BibleVersion;

  @OneToMany(() => BibleChapter, (capitulo) => capitulo.livro)
  capitulos: BibleChapter[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
