import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProgressoLeitura } from './progresso-leitura.entity';

@Entity('planos_leitura')
export class PlanoLeitura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'int', name: 'total_dias' })
  totalDias: number;

  @Column({ type: 'int', name: 'capitulos_por_dia', default: 1 })
  capitulosPorDia: number;

  @Column({ type: 'simple-json', name: 'programacao' })
  programacao: any;

  @Column({ type: 'text', nullable: true, name: 'categoria' })
  categoria: string;

  @Column({ type: 'boolean', default: true, name: 'publico' })
  publico: boolean;

  @OneToMany(() => ProgressoLeitura, (p) => p.plano)
  progressos: ProgressoLeitura[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
