import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('palavras_gregas')
export class PalavraGrega {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  strong: string;

  @Column({ type: 'text', name: 'palavra_original' })
  palavraOriginal: string;

  @Column({ type: 'text' })
  lemma: string;

  @Column({ type: 'text' })
  transliteracao: string;

  @Column({ type: 'text', nullable: true })
  pronuncia: string;

  @Column({ type: 'text', name: 'definicao_curta' })
  definicaoCurta: string;

  @Column({ type: 'text', name: 'definicao_completa', nullable: true })
  definicaoCompleta: string;

  @Column({ type: 'text', nullable: true })
  morfologia: string;

  @Column({ type: 'text', name: 'classe_gramatical' })
  classeGramatical: string;

  @Column({ type: 'text', nullable: true, name: 'tempo_verbal' })
  tempoVerbal: string;

  @Column({ type: 'text', nullable: true, name: 'voz_verbal' })
  vozVerbal: string;

  @Column({ type: 'text', nullable: true, name: 'modo_verbal' })
  modoVerbal: string;

  @Column({ type: 'text', nullable: true, name: 'caso' })
  caso: string;

  @Column({ type: 'text', nullable: true, name: 'numero' })
  numero: string;

  @Column({ type: 'text', nullable: true, name: 'genero' })
  genero: string;

  @Column({ type: 'text', nullable: true, name: 'pessoa' })
  pessoa: string;

  @Column({ type: 'int', nullable: true, name: 'frequencia_at' })
  frequenciaAT: number;

  @Column({ type: 'int', nullable: true, name: 'frequencia_nt' })
  frequenciaNT: number;

  @Column({ type: 'text', nullable: true, name: 'ocorrencias' })
  ocorrencias: string;

  @Column({ type: 'text', nullable: true, name: 'fonetica' })
  fonetica: string;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_bdag' })
  definicoesBdag: any;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_thayer' })
  definicoesThayer: any;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_louw_nida' })
  definicoesLouwNida: any;

  @Column({ type: 'simple-json', nullable: true, name: 'dominio_semantico' })
  domainSemantico: any;

  @Column({ type: 'simple-json', nullable: true, name: 'sinonimos' })
  sinonimos: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'antonimos' })
  antonimos: string[];

  @Column({ type: 'text', nullable: true, name: 'palavras_relacionadas', array: true })
  palavrasRelacionadas: string[];

  @Column({ type: 'text', nullable: true, name: 'notas_gramaticais' })
  notasGramaticais: string;

  @Column({ type: 'float8', nullable: true, name: 'vetor_embedding', array: true })
  vetorEmbedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
