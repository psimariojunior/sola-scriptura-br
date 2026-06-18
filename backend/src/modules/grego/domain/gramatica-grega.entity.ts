import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('gramatica_grega')
export class GramaticaGrega {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true, name: 'categoria' })
  categoria: string;

  @Column({ type: 'text', name: 'conteudo' })
  conteudo: string;

  @Column({ type: 'simple-json', nullable: true, name: 'exemplos' })
  exemplos: any[];

  @Column({ type: 'text', nullable: true, name: 'regra_gramatical' })
  regraGramatical: string;

  @Column({ type: 'text', nullable: true, name: 'observacoes' })
  observacoes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
