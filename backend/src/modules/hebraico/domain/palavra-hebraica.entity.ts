import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('palavras_hebraicas')
export class PalavraHebraica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, unique: true })
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

  @Column({ type: 'text', nullable: true, name: 'raiz' })
  raiz: string;

  @Column({ type: 'text', nullable: true, name: 'padrao' })
  padrao: string;

  @Column({ type: 'text', nullable: true, name: 'radical' })
  radical: string;

  @Column({ type: 'text', nullable: true, name: 'tipo_verbo' })
  tipoVerbo: string;

  @Column({ type: 'text', nullable: true, name: 'conjugacao' })
  conjugacao: string;

  @Column({ type: 'text', nullable: true, name: 'tempo' })
  tempo: string;

  @Column({ type: 'text', nullable: true, name: 'pessoa' })
  pessoa: string;

  @Column({ type: 'text', nullable: true, name: 'genero' })
  genero: string;

  @Column({ type: 'text', nullable: true, name: 'numero' })
  numero: string;

  @Column({ type: 'text', nullable: true, name: 'estado' })
  estado: string;

  @Column({ type: 'int', nullable: true, name: 'frequencia_at' })
  frequenciaAT: number;

  @Column({ type: 'text', nullable: true, name: 'ocorrencias' })
  ocorrencias: string;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_bdb' })
  definicoesBdb: any;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_halot' })
  definicoesHalot: any;

  @Column({ type: 'simple-json', nullable: true, name: 'definicoes_gesenius' })
  definicoesGesenius: any;

  @Column({ type: 'simple-json', nullable: true, name: 'cognatos' })
  cognatos: string[];

  @Column({ type: 'text', nullable: true, name: 'palavras_relacionadas', array: true })
  palavrasRelacionadas: string[];

  @Column({ type: 'text', nullable: true, name: 'notas_gramaticais' })
  notasGramaticais: string;

  @Column({ type: 'text', nullable: true, name: 'ocorrencias_notaveis' })
  ocorrenciasNotaveis: string;

  @Column({ type: 'simple-json', nullable: true, name: 'versiculos_chave' })
  versiculosChave: string[];

  @Column({ type: 'float8', nullable: true, name: 'vetor_embedding', array: true })
  vetorEmbedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
