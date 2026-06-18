import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('eventos_historicos')
@Index(['anoInicio', 'anoFim'])
export class EventoHistorico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ length: 50, name: 'categoria' })
  categoria: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'int', name: 'ano_inicio' })
  anoInicio: number;

  @Column({ type: 'int', nullable: true, name: 'ano_fim' })
  anoFim: number;

  @Column({ type: 'varchar', length: 10, default: 'AC', name: 'era' })
  era: string;

  @Column({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' })
  referenciasBiblicas: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'personagens_envolvidos' })
  personagensEnvolvidos: string[];

  @Column({ type: 'text', nullable: true, name: 'significado_teologico' })
  significadoTeologico: string;

  @Column({ type: 'text', nullable: true, name: 'fontes' })
  fontes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
