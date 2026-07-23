import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_notes')
export class UserNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ default: '' })
  titulo: string;

  @Column('text')
  conteudo: string;

  @Column('simple-array', { default: '' })
  tags: string[];

  @Column({ default: '' })
  versiculoRef: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
