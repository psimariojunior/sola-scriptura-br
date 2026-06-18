import { PlanoLeitura } from './plano-leitura.entity';
export declare class ProgressoLeitura {
    id: string;
    usuarioId: string;
    planoId: string;
    plano: PlanoLeitura;
    diaAtual: number;
    diasCompletos: number[];
    dataInicio: Date;
    dataConclusao: Date;
    concluido: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
}
