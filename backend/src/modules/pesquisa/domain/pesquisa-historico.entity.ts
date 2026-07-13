import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('pesquisa_historico')
@Index(['usuarioId', 'criadoEm'])
@Index(['criadoEm'])
export class PesquisaHistorico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', nullable: true })
  usuarioId: string;

  @Column({ type: 'text' })
  consulta: string;

  @Column({ type: 'simple-json', nullable: true })
  filtros: {
    livro?: string;
    testamento?: string;
    tipo?: string;
    categoria?: string;
  };

  @Column({ type: 'int', name: 'resultados_count', default: 0 })
  resultadosCount: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
