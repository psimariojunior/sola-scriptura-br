import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('personagens')
export class Personagem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'nome_portugues' })
  nomePortugues: string;

  @Column({ length: 100, nullable: true, name: 'nome_original' })
  nomeOriginal: string;

  @Column({ length: 100, nullable: true, name: 'nome_hebraico' })
  nomeHebraico: string;

  @Column({ length: 100, nullable: true, name: 'nome_grego' })
  nomeGrego: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'biografia' })
  biografia: string;

  @Column({ type: 'text', nullable: true, name: 'significado_nome' })
  significadoNome: string;

  @Column({ type: 'text', nullable: true, name: 'primeira_mencao' })
  primeiraMencao: string;

  @Column({ type: 'text', nullable: true, name: 'ultima_mençao' })
  ultimaMencao: string;

  @Column({ type: 'int', nullable: true, name: 'total_mencoes' })
  totalMencoes: number;

  @Column({ type: 'simple-json', nullable: true, name: 'familia' })
  familia: any;

  @Column({ type: 'simple-json', nullable: true, name: 'eventos_principais' })
  eventosPrincipais: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'relacoes' })
  relacoes: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'versoes_referencias' })
  versoesReferencias: string[];

  @Column({ type: 'text', nullable: true, name: 'genealogia' })
  genealogia: string;

  @Column({ type: 'text', nullable: true, name: 'significado_teologico' })
  significadoTeologico: string;

  @Column({ type: 'text', nullable: true, name: 'vetor_embedding', array: true, precision: 1536 })
  vetorEmbedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
