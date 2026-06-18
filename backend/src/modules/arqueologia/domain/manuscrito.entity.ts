import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('manuscritos')
export class Manuscrito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ type: 'text', nullable: true, name: 'tipo' })
  tipo: string;

  @Column({ type: 'text', nullable: true, name: 'material' })
  material: string;

  @Column({ type: 'text', nullable: true, name: 'data_estimada' })
  dataEstimada: string;

  @Column({ type: 'text', nullable: true, name: 'local_descoberta' })
  localDescoberta: string;

  @Column({ type: 'text', nullable: true, name: 'local_atual' })
  localAtual: string;

  @Column({ type: 'text', nullable: true, name: 'idioma' })
  idioma: string;

  @Column({ type: 'text', nullable: true, name: 'conteudo' })
  conteudo: string;

  @Column({ type: 'simple-json', nullable: true, name: 'passagens_incluidas' })
  passagensIncluidas: string[];

  @Column({ type: 'text', nullable: true, name: 'significado' })
  significado: string;

  @Column({ type: 'simple-json', nullable: true, name: 'imagens' })
  imagens: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
