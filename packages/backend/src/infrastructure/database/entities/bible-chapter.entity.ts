import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { BibleBook } from './bible-book.entity';
import { BibleVerse } from './bible-verse.entity';

@Entity('bible_chapters')
export class BibleChapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'livro_id' })
  livroId: string;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'int', nullable: true })
  totalVersiculos: number;

  @ManyToOne(() => BibleBook, (livro) => livro.capitulos)
  @JoinColumn({ name: 'livro_id' })
  livro: BibleBook;

  @OneToMany(() => BibleVerse, (versiculo) => versiculo.capitulo)
  versiculos: BibleVerse[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
