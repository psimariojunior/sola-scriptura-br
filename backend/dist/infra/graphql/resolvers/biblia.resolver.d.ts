import { BibliaService } from '../../modules/biblia/application/biblia.service';
export declare class BibliaResolver {
    private bibliaService;
    constructor(bibliaService: BibliaService);
    livro(slug: string): Promise<any>;
    capitulo(livroId: string, numero: number): Promise<any>;
    versiculo(livroId: string, capitulo: number, versiculo: number, traducaoId?: string): Promise<any>;
    buscarTexto(consulta: string): Promise<any>;
    capitulos(livro: any): Promise<any>;
}
