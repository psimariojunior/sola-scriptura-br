import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contextos_historicos')
export class ContextoHistorico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'entidade_tipo', length: 50 })
  entidadeTipo: string;

  @Column({ name: 'entidade_id' })
  entidadeId: string;

  @Column({ type: 'text', nullable: true, name: 'autor' })
  autor: string;

  @Column({ type: 'text', nullable: true, name: 'data_estimada' })
  dataEstimada: string;

  @Column({ type: 'text', nullable: true, name: 'destinatarios' })
  destinatarios: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_politico' })
  contextoPolitico: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_religioso' })
  contextoReligioso: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_economico' })
  contextoEconomico: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_cultural' })
  contextoCultural: string;

  @Column({ type: 'simple-json', nullable: true, name: 'imperios_envolvidos' })
  imperiosEnvolvidos: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'governantes' })
  governantes: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'eventos_contemporaneos' })
  eventosContemporaneos: any[];

  @Column({ type: 'text', nullable: true, name: 'significado_teologico' })
  significadoTeologico: string;

  @Column({ type: 'text', nullable: true, name: 'fontes' })
  fontes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
