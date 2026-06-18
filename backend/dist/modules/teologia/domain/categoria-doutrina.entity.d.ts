import { Doutrina } from './doutrina.entity';
export declare class CategoriaDoutrina {
    id: string;
    nome: string;
    slug: string;
    descricao: string;
    ordem: number;
    categoriaMaeId: string;
    doutrinas: Doutrina[];
}
