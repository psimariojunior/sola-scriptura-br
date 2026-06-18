import { ExegeseService } from '../application/exegese.service';
export declare class ExegeseController {
    private readonly exegeseService;
    constructor(exegeseService: ExegeseService);
    analisar(versiculoId: string): Promise<import("../domain/analise-exegetica.entity").AnaliseExegetica>;
    contextos(versiculoId: string): Promise<any>;
}
