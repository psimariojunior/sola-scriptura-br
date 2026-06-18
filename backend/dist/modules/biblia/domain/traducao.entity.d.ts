import { Livro } from './livro.entity';
import { Versiculo } from './versiculo.entity';
export declare class Traducao {
    id: string;
    nome: string;
    sigla: string;
    descricao: string;
    idioma: string;
    anoPublicacao: number;
    copyright: string;
    licencaPublica: boolean;
    gratuita: boolean;
    livroId: string;
    livro: Livro;
    versiculos: Versiculo[];
    criadoEm: Date;
    atualizadoEm: Date;
}
