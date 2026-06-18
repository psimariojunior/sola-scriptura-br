import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('bible_locations')
@Index(['nome'])
export class BibleLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, nullable: true })
  nomeOriginal: string;

  @Column({ length: 50, nullable: true })
  tipo: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  historia: string;

  @Column({ type: 'text', nullable: true })
  significado: string;

  @Column('simple-json', { nullable: true })
  referenciasBiblicas: string[];

  @Column('simple-json', { nullable: true })
  imagemUrls: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
