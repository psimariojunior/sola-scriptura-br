import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200, name: 'titulo' })
  titulo: string;

  @Column({ length: 100, name: 'autor' })
  autor: string;

  @Column({ type: 'text', nullable: true, name: 'referencia' })
  referencia: string;

  @Column({ name: 'livro_id', nullable: true })
  livroId: string;

  @Column({ type: 'int', nullable: true, name: 'capitulo' })
  capitulo: number;

  @Column({ type: 'int', nullable: true, name: 'versiculo_inicio' })
  versiculoInicio: number;

  @Column({ type: 'int', nullable: true, name: 'versiculo_fim' })
  versiculoFim: number;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ type: 'text', nullable: true, name: 'tradicao_teologica' })
  tradicaoTeologica: string;

  @Column({ type: 'text', nullable: true, name: 'fonte' })
  fonte: string;

  @Column({ type: 'boolean', default: false, name: 'licenca_publica' })
  licencaPublica: boolean;

  @Column({ type: 'text', nullable: true, name: 'idioma', default: 'pt-BR' })
  idioma: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
