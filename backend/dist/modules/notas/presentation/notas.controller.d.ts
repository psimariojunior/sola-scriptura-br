import { NotasService } from '../application/notas.service';
export declare class NotasController {
    private readonly notasService;
    constructor(notasService: NotasService);
    listar(usuarioId: string, versiculoId?: string): Promise<import("../domain/nota.entity").Nota[]>;
    criar(usuarioId: string, dados: any): Promise<import("../domain/nota.entity").Nota>;
    atualizar(usuarioId: string, id: string, dados: any): Promise<import("../domain/nota.entity").Nota>;
    remover(usuarioId: string, id: string): Promise<void>;
}
