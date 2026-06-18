import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doutrina } from './doutrina.entity';

@Entity('doutrinas_versiculos')
export class DoutrinaVersiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'doutrina_id' })
  doutrinaId: string;

  @Column({ name: 'versiculo_id' })
  versiculoId: string;

  @Column({ type: 'text', nullable: true, name: 'relevancia' })
  relevancia: string;

  @Column({ type: 'int', name: 'peso', default: 1 })
  peso: number;

  @ManyToOne(() => Doutrina, (doutrina) => doutrina.referencias)
  @JoinColumn({ name: 'doutrina_id' })
  doutrina: Doutrina;
}
