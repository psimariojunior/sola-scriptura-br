import { Repository } from 'typeorm';
import { ContextoHistorico } from '../domain/contexto-historico.entity';
export declare class HistoriaService {
    private contextoRepo;
    private readonly logger;
    constructor(contextoRepo: Repository<ContextoHistorico>);
    buscarPorEntidade(tipo: string, id: string): Promise<ContextoHistorico>;
    buscarPorLivro(livroId: string): Promise<ContextoHistorico>;
}
