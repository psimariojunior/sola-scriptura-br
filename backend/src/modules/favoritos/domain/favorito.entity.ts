import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('favoritos')
export class Favorito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ name: 'versiculo_id' })
  versiculoId: string;

  @Column({ type: 'text', nullable: true, name: 'etiquetas', array: true })
  etiquetas: string[];

  @Column({ type: 'text', nullable: true, name: 'nota_pessoal' })
  notaPessoal: string;

  @Column({ type: 'int', default: 0, name: 'ordem' })
  ordem: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
