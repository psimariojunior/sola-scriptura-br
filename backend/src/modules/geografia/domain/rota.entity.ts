import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('rotas')
export class Rota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'simple-json', name: 'pontos' })
  pontos: any[];

  @Column({ type: 'text', nullable: true, name: 'cor_rota' })
  corRota: string;

  @Column({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' })
  referenciasBiblicas: string[];

  @Column({ type: 'text', nullable: true, name: 'personagens_envolvidos', array: true })
  personagensEnvolvidos: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
