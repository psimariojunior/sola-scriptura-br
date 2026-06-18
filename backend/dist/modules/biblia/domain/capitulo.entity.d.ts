import { Livro } from './livro.entity';
import { Versiculo } from './versiculo.entity';
export declare class Capitulo {
    id: string;
    numero: number;
    totalVersiculos: number;
    resumo: string;
    temasPrincipais: string[];
    livroId: string;
    livro: Livro;
    versiculos: Versiculo[];
    criadoEm: Date;
    atualizadoEm: Date;
}
