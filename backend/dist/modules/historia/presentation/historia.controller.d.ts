import { HistoriaService } from '../application/historia.service';
export declare class HistoriaController {
    private readonly historiaService;
    constructor(historiaService: HistoriaService);
    contextoHistorico(livroId: string): Promise<import("../domain/contexto-historico.entity").ContextoHistorico>;
    contextoPorEntidade(tipo: string, entidadeId: string): Promise<import("../domain/contexto-historico.entity").ContextoHistorico>;
}
