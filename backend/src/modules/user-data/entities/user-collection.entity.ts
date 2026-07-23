import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_collections')
export class UserCollection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  nome: string;

  @Column({ default: '' })
  descricao: string;

  @Column('simple-json', { default: '[]' })
  versiculos: Array<{ livro: string; capitulo: number; verso: number; texto: string }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
