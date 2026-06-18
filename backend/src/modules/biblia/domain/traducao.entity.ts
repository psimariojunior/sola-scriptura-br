import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Livro } from './livro.entity';
import { Versiculo } from './versiculo.entity';

@Entity('traducoes')
export class Traducao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 10, unique: true })
  sigla: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'text', nullable: true, name: 'idioma' })
  idioma: string;

  @Column({ type: 'int', name: 'ano_publicacao', nullable: true })
  anoPublicacao: number;

  @Column({ length: 50, nullable: true, name: 'copyright' })
  copyright: string;

  @Column({ type: 'boolean', default: true, name: 'licenca_publica' })
  licencaPublica: boolean;

  @Column({ type: 'boolean', default: false, name: 'gratuita' })
  gratuita: boolean;

  @Column({ name: 'livro_id', nullable: true })
  livroId: string;

  @ManyToOne(() => Livro, (livro) => livro.traducoes)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @OneToMany(() => Versiculo, (versiculo) => versiculo.capitulo)
  versiculos: Versiculo[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
