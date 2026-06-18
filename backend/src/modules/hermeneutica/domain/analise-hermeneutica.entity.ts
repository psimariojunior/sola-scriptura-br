import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('analises_hermeneuticas')
export class AnaliseHermeneutica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'versiculo_id' })
  versiculoId: string;

  @Column({ type: 'text', name: 'genero_literario' })
  generoLiterario: string;

  @Column({ type: 'text', nullable: true, name: 'principios_hermeneuticos' })
  principiosHermeneuticos: string;

  @Column({ type: 'text', nullable: true, name: 'interpretacao_historica' })
  interpretacaoHistorica: string;

  @Column({ type: 'text', nullable: true, name: 'interpretacao_gramatical' })
  interpretacaoGramatical: string;

  @Column({ type: 'text', nullable: true, name: 'interpretacao_contextual' })
  interpretacaoContextual: string;

  @Column({ type: 'text', nullable: true, name: 'interpretacao_teologica' })
  interpretacaoTeologica: string;

  @Column({ type: 'text', nullable: true, name: 'aplicacao_contemporanea' })
  aplicacaoContemporanea: string;

  @Column({ type: 'simple-json', nullable: true, name: 'principios_aplicados' })
  principiosAplicados: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'interpretacoes_tradicoes' })
  interpretacoesTradicoes: any;

  @Column({ type: 'text', nullable: true, name: 'observacoes' })
  observacoes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
