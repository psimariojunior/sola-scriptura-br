import { Repository } from 'typeorm';
import { EventoHistorico } from '../domain/evento-historico.entity';
export declare class CronologiaService {
    private eventoRepo;
    private readonly logger;
    constructor(eventoRepo: Repository<EventoHistorico>);
    listarPorEra(era: string): Promise<EventoHistorico[]>;
    listarPorPeriodo(anoInicio: number, anoFim: number): Promise<EventoHistorico[]>;
    listarPorCategoria(categoria: string): Promise<EventoHistorico[]>;
    linhaDoTempo(): Promise<EventoHistorico[]>;
}
