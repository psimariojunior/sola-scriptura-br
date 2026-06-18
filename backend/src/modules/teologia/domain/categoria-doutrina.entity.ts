import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doutrina } from './doutrina.entity';

@Entity('categorias_doutrina')
export class CategoriaDoutrina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'int', name: 'ordem' })
  ordem: number;

  @Column({ type: 'text', nullable: true, name: 'categoria_mae_id' })
  categoriaMaeId: string;

  @OneToMany(() => Doutrina, (doutrina) => doutrina.categoria)
  doutrinas: Doutrina[];
}
