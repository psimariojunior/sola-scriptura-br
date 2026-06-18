import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoriaDoutrina } from './categoria-doutrina.entity';
import { DoutrinaVersiculo } from './doutrina-versiculo.entity';

@Entity('doutrinas')
export class Doutrina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'definicao' })
  definicao: string;

  @Column({ type: 'text', nullable: true, name: 'explicacao' })
  explicacao: string;

  @Column({ type: 'text', nullable: true, name: 'base_scriptura' })
  baseScriptura: string;

  @Column({ type: 'simple-json', nullable: true, name: 'interpretacoes' })
  interpretacoes: any;

  @Column({ type: 'simple-json', nullable: true, name: 'tradicoes' })
  tradicoes: any;

  @Column({ type: 'simple-json', nullable: true, name: 'controversias' })
  controversias: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'passagens_chave' })
  passagensChave: string[];

  @Column({ name: 'categoria_id' })
  categoriaId: string;

  @ManyToOne(() => CategoriaDoutrina, (cat) => cat.doutrinas)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaDoutrina;

  @OneToMany(() => DoutrinaVersiculo, (dv) => dv.doutrina)
  referencias: DoutrinaVersiculo[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
