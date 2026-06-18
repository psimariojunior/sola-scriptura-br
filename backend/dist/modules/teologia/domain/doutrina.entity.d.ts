import { CategoriaDoutrina } from './categoria-doutrina.entity';
import { DoutrinaVersiculo } from './doutrina-versiculo.entity';
export declare class Doutrina {
    id: string;
    nome: string;
    slug: string;
    definicao: string;
    explicacao: string;
    baseScriptura: string;
    interpretacoes: any;
    tradicoes: any;
    controversias: any[];
    passagensChave: string[];
    categoriaId: string;
    categoria: CategoriaDoutrina;
    referencias: DoutrinaVersiculo[];
    criadoEm: Date;
    atualizadoEm: Date;
}
