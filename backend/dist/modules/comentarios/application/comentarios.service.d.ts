import { Repository } from 'typeorm';
import { Comentario } from '../domain/comentario.entity';
export declare class ComentariosService {
    private comentarioRepo;
    private readonly logger;
    constructor(comentarioRepo: Repository<Comentario>);
    buscarPorReferencia(livroId: string, capitulo: number, versiculo?: number): Promise<Comentario[]>;
    buscarPorAutor(autor: string): Promise<Comentario[]>;
    listarAutores(): Promise<string[]>;
}
