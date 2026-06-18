import { BibliaService } from '../application/biblia.service';
export declare class BibliaController {
    private readonly bibliaService;
    constructor(bibliaService: BibliaService);
    listarTestamentos(): Promise<import("../domain/testamento.entity").Testamento[]>;
    listarLivros(testamentoId?: string): Promise<import("../domain/livro.entity").Livro[]>;
    buscarLivro(slug: string): Promise<import("../domain/livro.entity").Livro>;
    buscarCapitulo(livroId: string, numero: number): Promise<import("../domain/capitulo.entity").Capitulo>;
    buscarVersiculo(livroId: string, capitulo: number, versiculo: number, traducaoId?: string): Promise<import("../domain/versiculo.entity").Versiculo>;
    buscarPassagem(livroId: string, capitulo: number, inicio: number, fim?: number, traducaoId?: string): Promise<import("../domain/versiculo.entity").Versiculo[]>;
    listarTraducoes(): Promise<import("../domain/traducao.entity").Traducao[]>;
    pesquisar(consulta: string, traducaoId?: string): Promise<import("../domain/versiculo.entity").Versiculo[]>;
    buscarPalavra(id: string): Promise<import("../domain/palavra.entity").Palavra>;
}
