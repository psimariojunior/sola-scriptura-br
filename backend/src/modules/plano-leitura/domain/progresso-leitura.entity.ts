import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PlanoLeitura } from './plano-leitura.entity';

@Entity('progressos_leitura')
export class ProgressoLeitura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ name: 'plano_id' })
  planoId: string;

  @ManyToOne(() => PlanoLeitura, (plano) => plano.progressos)
  @JoinColumn({ name: 'plano_id' })
  plano: PlanoLeitura;

  @Column({ type: 'int', default: 0, name: 'dia_atual' })
  diaAtual: number;

  @Column({ type: 'simple-json', nullable: true, name: 'dias_completos' })
  diasCompletos: number[];

  @Column({ type: 'date', nullable: true, name: 'data_inicio' })
  dataInicio: Date;

  @Column({ type: 'date', nullable: true, name: 'data_conclusao' })
  dataConclusao: Date;

  @Column({ type: 'boolean', default: false, name: 'concluido' })
  concluido: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
