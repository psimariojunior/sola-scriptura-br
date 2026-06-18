import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('verbetes')
export class Verbete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  titulo: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'categoria' })
  categoria: string;

  @Column({ type: 'text' })
  definicao: string;

  @Column({ type: 'text', nullable: true, name: 'explicacao' })
  explicacao: string;

  @Column({ type: 'simple-json', nullable: true, name: 'sinonimos' })
  sinonimos: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' })
  referenciasBiblicas: string[];

  @Column({ type: 'text', nullable: true, name: 'fonte' })
  fonte: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
