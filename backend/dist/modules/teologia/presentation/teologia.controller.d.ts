import { TeologiaService } from '../application/teologia.service';
export declare class TeologiaController {
    private readonly teologiaService;
    constructor(teologiaService: TeologiaService);
    listarCategorias(): Promise<import("../domain/categoria-doutrina.entity").CategoriaDoutrina[]>;
    buscarDoutrina(slug: string): Promise<import("../domain/doutrina.entity").Doutrina>;
    relacionarTexto(versiculoId: string): Promise<any>;
}
