import { Repository } from 'typeorm';
import { PlanoLeitura } from '../domain/plano-leitura.entity';
import { ProgressoLeitura } from '../domain/progresso-leitura.entity';
export declare class PlanoLeituraService {
    private planoSchema;
    private progressoSchema;
    private readonly logger;
    constructor(planoSchema: Repository<PlanoLeitura>, progressoSchema: Repository<ProgressoLeitura>);
    listarPlanos(): Promise<PlanoLeitura[]>;
    buscarPlano(id: string): Promise<PlanoLeitura>;
    iniciarPlano(usuarioId: string, planoId: string): Promise<ProgressoLeitura>;
    avancarDia(usuarioId: string, progressoId: string): Promise<ProgressoLeitura>;
    progressoUsuario(usuarioId: string): Promise<ProgressoLeitura[]>;
}
