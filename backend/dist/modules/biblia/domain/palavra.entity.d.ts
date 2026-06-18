import { Versiculo } from './versiculo.entity';
export declare class Palavra {
    id: string;
    texto: string;
    posicao: number;
    textoOriginal: string;
    idiomaOriginal: string;
    strongGrego: string;
    strongHebraico: string;
    lemma: string;
    transliteracao: string;
    pronuncia: string;
    definicao: string;
    morfologia: string;
    classeGramatical: string;
    tempoVerbal: string;
    vozVerbal: string;
    modoVerbal: string;
    frequencia: number;
    tipoEntidade: string;
    entidadeId: string;
    versiculoId: string;
    versiculo: Versiculo;
    criadoEm: Date;
    atualizadoEm: Date;
}
