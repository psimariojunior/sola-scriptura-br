import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, Index } from 'typeorm';

@Entity('pesquisa_sugestoes')
@Index(['termo'], { unique: true })
@Index(['peso'])
export class PesquisaSugestao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200, unique: true })
  termo: string;

  @Column({ type: 'int', default: 1 })
  peso: number;

  @Column({ length: 50, nullable: true })
  categoria: string;

  @Column({ type: 'simple-json', nullable: true })
  metadata: Record<string, any>;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
