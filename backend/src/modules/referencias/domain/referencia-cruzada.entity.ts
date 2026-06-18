import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Versiculo } from '../../biblia/domain/versiculo.entity';

@Entity('referencias_cruzadas')
export class ReferenciaCruzada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'versiculo_origem_id' })
  versiculoOrigemId: string;

  @Column({ name: 'versiculo_destino_id' })
  versiculoDestinoId: string;

  @Column({ length: 50, name: 'tipo_relacao' })
  tipoRelacao: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'int', default: 1, name: 'peso' })
  peso: number;

  @ManyToOne(() => Versiculo, (v) => v.referenciasOrigem)
  @JoinColumn({ name: 'versiculo_origem_id' })
  versiculoOrigem: Versiculo;

  @ManyToOne(() => Versiculo, (v) => v.referenciasDestino)
  @JoinColumn({ name: 'versiculo_destino_id' })
  versiculoDestino: Versiculo;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
