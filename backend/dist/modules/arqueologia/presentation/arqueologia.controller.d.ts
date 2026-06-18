import { ArqueologiaService } from '../application/arqueologia.service';
export declare class ArqueologiaController {
    private readonly arqueologiaService;
    constructor(arqueologiaService: ArqueologiaService);
    listarArtefatos(tipo?: string): Promise<import("../domain/artefato.entity").Artefato[]>;
    buscarArtefato(id: string): Promise<import("../domain/artefato.entity").Artefato>;
    listarManuscritos(): Promise<import("../domain/manuscrito.entity").Manuscrito[]>;
}
