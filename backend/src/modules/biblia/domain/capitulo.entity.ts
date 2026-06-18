import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { Livro } from './livro.entity';
import { Versiculo } from './versiculo.entity';

@Entity('capitulos')
@Index(['livroId', 'numero'], { unique: true })
export class Capitulo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'int', name: 'total_versiculos', default: 0 })
  totalVersiculos: number;

  @Column({ type: 'text', nullable: true, name: 'resumo' })
  resumo: string;

  @Column({ type: 'text', nullable: true, name: 'temas_principais', array: true })
  temasPrincipais: string[];

  @Column({ name: 'livro_id' })
  livroId: string;

  @ManyToOne(() => Livro, (livro) => livro.capitulos)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @OneToMany(() => Versiculo, (versiculo) => versiculo.capitulo)
  versiculos: Versiculo[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
