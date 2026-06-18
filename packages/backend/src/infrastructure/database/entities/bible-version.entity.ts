import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { BibleBook } from './bible-book.entity';

@Entity('bible_versions')
export class BibleVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, unique: true })
  sigla: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  idioma: string;

  @Column({ length: 20 })
  tipo: string;

  @Column({ type: 'int', default: 0 })
  ano: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => BibleBook, (book) => book.versao)
  livros: BibleBook[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
