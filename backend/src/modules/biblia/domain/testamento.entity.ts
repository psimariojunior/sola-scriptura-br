import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from './livro.entity';

@Entity('testamentos')
export class Testamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 20, unique: true })
  slug: string;

  @Column({ type: 'int', name: 'ordem' })
  ordem: number;

  @Column({ type: 'int', name: 'total_livros', default: 0 })
  totalLivros: number;

  @OneToMany(() => Livro, (livro) => livro.testamento)
  livros: Livro[];
}
