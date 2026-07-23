import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_favorites')
export class UserFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  versiculo: string;

  @Column()
  livro: string;

  @Column()
  capitulo: number;

  @Column()
  verso: number;

  @Column('text')
  texto: string;

  @Column({ default: '#fbbf24' })
  cor: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
