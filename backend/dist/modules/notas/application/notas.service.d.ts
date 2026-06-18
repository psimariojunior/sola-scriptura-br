import { Repository } from 'typeorm';
import { Nota } from '../domain/nota.entity';
export declare class NotasService {
    private notaRepo;
    private readonly logger;
    constructor(notaRepo: Repository<Nota>);
    listar(usuarioId: string, versiculoId?: string): Promise<Nota[]>;
    criar(usuarioId: string, dados: Partial<Nota>): Promise<Nota>;
    atualizar(notaId: string, usuarioId: string, dados: Partial<Nota>): Promise<Nota>;
    remover(notaId: string, usuarioId: string): Promise<void>;
}
