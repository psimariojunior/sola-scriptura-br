import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('bible_persons')
@Index(['nome'])
export class BiblePerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, nullable: true })
  nomeOriginal: string;

  @Column({ length: 50, nullable: true })
  categoria: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column({ type: 'text', nullable: true })
  significadoNome: string;

  @Column({ length: 100, nullable: true })
  pai: string;

  @Column({ length: 100, nullable: true })
  mae: string;

  @Column({ type: 'simple-json', nullable: true })
  filhos: string[];

  @Column({ type: 'simple-json', nullable: true })
  titulos: string[];

  @Column({ type: 'simple-json', nullable: true })
  eventosChave: string[];

  @Column({ type: 'int', nullable: true })
  anoNascimento: number;

  @Column({ type: 'int', nullable: true })
  anoMorte: number;

  @Column('simple-json', { nullable: true })
  referenciasBiblicas: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
