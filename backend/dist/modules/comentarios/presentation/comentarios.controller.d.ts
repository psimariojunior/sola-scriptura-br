import { ComentariosService } from '../application/comentarios.service';
export declare class ComentariosController {
    private readonly comentariosService;
    constructor(comentariosService: ComentariosService);
    listarAutores(): Promise<string[]>;
    buscarPorAutor(autor: string): Promise<import("../domain/comentario.entity").Comentario[]>;
    buscarPorCapitulo(livroId: string, capitulo: number, versiculo?: number): Promise<import("../domain/comentario.entity").Comentario[]>;
}
