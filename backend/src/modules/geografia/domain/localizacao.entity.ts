import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('localizacoes')
export class Localizacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'nome_portugues' })
  nomePortugues: string;

  @Column({ length: 100, nullable: true, name: 'nome_original' })
  nomeOriginal: string;

  @Column({ length: 100, nullable: true, name: 'nome_ingles' })
  nomeIngles: string;

  @Column({ length: 100, nullable: true, name: 'nome_hebraico' })
  nomeHebraico: string;

  @Column({ length: 100, nullable: true, name: 'nome_grego' })
  nomeGrego: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ length: 50, name: 'tipo' })
  tipo: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true, name: 'latitude' })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true, name: 'longitude' })
  longitude: number;

  @Column({ type: 'text', nullable: true, name: 'regiao' })
  regiao: string;

  @Column({ type: 'text', nullable: true, name: 'pais_atual' })
  paisAtual: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'text', nullable: true, name: 'historia' })
  historia: string;

  @Column({ type: 'text', nullable: true, name: 'significado_biblico' })
  significadoBiblico: string;

  @Column({ type: 'simple-json', nullable: true, name: 'eventos_relacionados' })
  eventosRelacionados: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'personagens_relacionados' })
  personagensRelacionados: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'versoes_referencias' })
  versoesReferencias: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'fotos' })
  fotos: string[];

  @Column({ type: 'text', nullable: true, name: 'fontes' })
  fontes: string;

  @Column({ type: 'float8', nullable: true, name: 'vetor_embedding', array: true })
  vetorEmbedding: number[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
