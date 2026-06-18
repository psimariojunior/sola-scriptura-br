import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50, nullable: true })
  tradicao: string;

  @Column('simple-json', { nullable: true })
  preferencias: {
    versaoPadrao: string;
    tema: 'claro' | 'escuro';
    fontSize: number;
    modoOffline: boolean;
  };

  @Column({ default: true, name: 'ativo' })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
