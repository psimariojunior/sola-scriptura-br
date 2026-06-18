import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { Capitulo } from './capitulo.entity';
import { Palavra } from './palavra.entity';
import { ReferenciaCruzada } from '../../referencias/domain/referencia-cruzada.entity';
import { Nota } from '../../notas/domain/nota.entity';

@Entity('versiculos')
@Index(['capituloId', 'numero'], { unique: true })
@Index(['livroId', 'capituloNumero', 'numero'])
export class Versiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'text' })
  texto: string;

  @Column({ name: 'texto_formatado', type: 'text', nullable: true })
  textoFormatado: string;

  @Column({ name: 'livro_id' })
  livroId: string;

  @Column({ name: 'capitulo_id' })
  capituloId: string;

  @Column({ type: 'int', name: 'capitulo_numero' })
  capituloNumero: number;

  @Column({ name: 'traducao_id' })
  traducaoId: string;

  @Column({ name: 'testamento_id' })
  testamentoId: string;

  @ManyToOne(() => Capitulo, (capitulo) => capitulo.versiculos)
  @JoinColumn({ name: 'capitulo_id' })
  capitulo: Capitulo;

  @OneToMany(() => Palavra, (palavra) => palavra.versiculo)
  palavras: Palavra[];

  @OneToMany(() => ReferenciaCruzada, (ref) => ref.versiculoOrigem)
  referenciasOrigem: ReferenciaCruzada[];

  @OneToMany(() => ReferenciaCruzada, (ref) => ref.versiculoDestino)
  referenciasDestino: ReferenciaCruzada[];

  @OneToMany(() => Nota, (nota) => nota.versiculo)
  notas: Nota[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
