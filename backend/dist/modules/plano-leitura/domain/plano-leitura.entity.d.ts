import { ProgressoLeitura } from './progresso-leitura.entity';
export declare class PlanoLeitura {
    id: string;
    nome: string;
    descricao: string;
    totalDias: number;
    capitulosPorDia: number;
    programacao: any;
    categoria: string;
    publico: boolean;
    progressos: ProgressoLeitura[];
    criadoEm: Date;
    atualizadoEm: Date;
}
