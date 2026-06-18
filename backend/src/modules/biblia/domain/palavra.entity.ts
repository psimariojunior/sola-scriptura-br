import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { Versiculo } from './versiculo.entity';

@Entity('palavras')
@Index(['versiculoId', 'posicao'])
export class Palavra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  texto: string;

  @Column({ type: 'int' })
  posicao: number;

  @Column({ type: 'text', nullable: true, name: 'texto_original' })
  textoOriginal: string;

  @Column({ type: 'text', nullable: true, name: 'idioma_original' })
  idiomaOriginal: string;

  @Column({ length: 10, nullable: true, name: 'strong_grego' })
  strongGrego: string;

  @Column({ length: 10, nullable: true, name: 'strong_hebraico' })
  strongHebraico: string;

  @Column({ type: 'text', nullable: true, name: 'lemma' })
  lemma: string;

  @Column({ type: 'text', nullable: true, name: 'transliteracao' })
  transliteracao: string;

  @Column({ type: 'text', nullable: true, name: 'pronuncia' })
  pronuncia: string;

  @Column({ type: 'text', nullable: true, name: 'definicao' })
  definicao: string;

  @Column({ type: 'text', nullable: true, name: 'morfologia' })
  morfologia: string;

  @Column({ type: 'text', nullable: true, name: 'classe_gramatical' })
  classeGramatical: string;

  @Column({ type: 'text', nullable: true, name: 'tempo_verbal' })
  tempoVerbal: string;

  @Column({ type: 'text', nullable: true, name: 'voz_verbal' })
  vozVerbal: string;

  @Column({ type: 'text', nullable: true, name: 'modo_verbal' })
  modoVerbal: string;

  @Column({ type: 'int', nullable: true, name: 'frequencia' })
  frequencia: number;

  @Column({ type: 'text', nullable: true, name: 'tipo_entidade' })
  tipoEntidade: string;

  @Column({ type: 'text', nullable: true, name: 'entidade_id' })
  entidadeId: string;

  @Column({ name: 'versiculo_id' })
  versiculoId: string;

  @ManyToOne(() => Versiculo, (versiculo) => versiculo.palavras)
  @JoinColumn({ name: 'versiculo_id' })
  versiculo: Versiculo;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
