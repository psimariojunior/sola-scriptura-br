import { Versiculo } from '../../biblia/domain/versiculo.entity';
export declare class ReferenciaCruzada {
    id: string;
    versiculoOrigemId: string;
    versiculoDestinoId: string;
    tipoRelacao: string;
    descricao: string;
    peso: number;
    versiculoOrigem: Versiculo;
    versiculoDestino: Versiculo;
    criadoEm: Date;
}
