import { ReferenciasService } from '../application/referencias.service';
export declare class ReferenciasController {
    private readonly referenciasService;
    constructor(referenciasService: ReferenciasService);
    buscarPorVersiculo(versiculoId: string): Promise<import("../domain/referencia-cruzada.entity").ReferenciaCruzada[]>;
    buscarPorTipo(tipo: string): Promise<import("../domain/referencia-cruzada.entity").ReferenciaCruzada[]>;
}
