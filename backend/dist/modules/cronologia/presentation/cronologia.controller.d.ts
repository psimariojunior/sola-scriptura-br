import { CronologiaService } from '../application/cronologia.service';
export declare class CronologiaController {
    private readonly cronologiaService;
    constructor(cronologiaService: CronologiaService);
    linhaDoTempo(): Promise<import("../domain/evento-historico.entity").EventoHistorico[]>;
    porEra(era: string): Promise<import("../domain/evento-historico.entity").EventoHistorico[]>;
    porPeriodo(inicio: number, fim: number): Promise<import("../domain/evento-historico.entity").EventoHistorico[]>;
    porCategoria(categoria: string): Promise<import("../domain/evento-historico.entity").EventoHistorico[]>;
}
