import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('escavacoes')
export class Escavacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ type: 'text', nullable: true, name: 'local' })
  local: string;

  @Column({ type: 'text', nullable: true, name: 'coordenadas' })
  coordenadas: string;

  @Column({ type: 'text', nullable: true, name: 'descricao' })
  descricao: string;

  @Column({ type: 'text', nullable: true, name: 'arqueologo_responsavel' })
  arqueologoResponsavel: string;

  @Column({ type: 'text', nullable: true, name: 'data_inicio' })
  dataInicio: string;

  @Column({ type: 'text', nullable: true, name: 'data_fim' })
  dataFim: string;

  @Column({ type: 'simple-json', nullable: true, name: 'descobertas' })
  descobertas: any[];

  @Column({ type: 'text', nullable: true, name: 'significado_biblico' })
  significadoBiblico: string;

  @Column({ type: 'simple-json', nullable: true, name: 'publicacoes' })
  publicacoes: string[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
