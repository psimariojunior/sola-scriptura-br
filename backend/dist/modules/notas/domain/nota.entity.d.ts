import { Versiculo } from '../../biblia/domain/versiculo.entity';
export declare class Nota {
    id: string;
    usuarioId: string;
    versiculoId: string;
    versiculo: Versiculo;
    conteudo: string;
    etiquetas: string[];
    corDestaque: string;
    publica: boolean;
    sincronizado: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
}
