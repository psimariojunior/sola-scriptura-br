import { PlanoLeituraService } from '../application/plano-leitura.service';
export declare class PlanoLeituraController {
    private readonly planoSchema;
    constructor(planoSchema: PlanoLeituraService);
    listarPlanos(): Promise<import("../domain/plano-leitura.entity").PlanoLeitura[]>;
    buscarPlano(id: string): Promise<import("../domain/plano-leitura.entity").PlanoLeitura>;
    iniciar(usuarioId: string, planoId: string): Promise<import("../domain/progresso-leitura.entity").ProgressoLeitura>;
    avancar(usuarioId: string, progressoId: string): Promise<import("../domain/progresso-leitura.entity").ProgressoLeitura>;
    progresso(usuarioId: string): Promise<import("../domain/progresso-leitura.entity").ProgressoLeitura[]>;
}
