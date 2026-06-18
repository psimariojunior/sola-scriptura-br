import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { BibleChapter } from './bible-chapter.entity';

@Entity('bible_verses')
@Index(['livroId', 'capituloId', 'numero'], { unique: true })
export class BibleVerse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'versao_id' })
  versaoId: string;

  @Column({ name: 'livro_id' })
  livroId: string;

  @Column({ name: 'capitulo_id' })
  capituloId: string;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'text' })
  texto: string;

  @Column({ type: 'text', nullable: true })
  textoOriginal: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  strongs: string;

  @Column({ type: 'tsvector', nullable: true })
  buscaTexto: string;

  @ManyToOne(() => BibleChapter, (capitulo) => capitulo.versiculos)
  @JoinColumn({ name: 'capitulo_id' })
  capitulo: BibleChapter;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
