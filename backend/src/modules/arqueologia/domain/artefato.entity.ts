import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('arte_fatos')
export class Artefato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

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

  @Column({ type: 'simple-json', nullable: true, name: 'dimensoes' })
  dimensoes: any;

  @Column({ type: 'simple-json', nullable: true, name: 'inscricoes' })
  inscricoes: any[];

  @Column({ type: 'text', nullable: true, name: 'significado_biblico' })
  significadoBiblico: string;

  @Column({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' })
  referenciasBiblicas: string[];

  @Column({ type: 'simple-json', nullable: true, name: 'imagens' })
  imagens: string[];

  @Column({ type: 'text', nullable: true, name: 'fontes' })
  fontes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
