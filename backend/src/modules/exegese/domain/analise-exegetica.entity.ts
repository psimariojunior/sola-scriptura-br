import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('analises_exegeticas')
export class AnaliseExegetica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'versiculo_id' })
  versiculoId: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_imediato' })
  contextoImediato: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_capitulo' })
  contextoCapitulo: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_livro' })
  contextoLivro: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_testamento' })
  contextoTestamento: string;

  @Column({ type: 'text', nullable: true, name: 'contexto_canonico' })
  contextoCanonico: string;

  @Column({ type: 'text', nullable: true, name: 'estrutura_literaria' })
  estruturaLiteraria: string;

  @Column({ type: 'text', nullable: true, name: 'analise_sintatica' })
  analiseSintatica: string;

  @Column({ type: 'text', nullable: true, name: 'analise_semantica' })
  analiseSemantica: string;

  @Column({ type: 'simple-json', nullable: true, name: 'palavras_chave' })
  palavrasChave: any;

  @Column({ type: 'simple-json', nullable: true, name: 'figuras_linguagem' })
  figurasLinguagem: any[];

  @Column({ type: 'simple-json', nullable: true, name: 'conexoes_teologicas' })
  conexoesTeologicas: any;

  @Column({ type: 'text', nullable: true, name: 'observacoes' })
  observacoes: string;

  @Column({ type: 'text', nullable: true, name: 'gerado_por_ia', default: false })
  geradoPorIa: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
