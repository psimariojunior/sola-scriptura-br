import { Livro } from './livro.entity';
export declare class Testamento {
    id: string;
    nome: string;
    slug: string;
    ordem: number;
    totalLivros: number;
    livros: Livro[];
}
