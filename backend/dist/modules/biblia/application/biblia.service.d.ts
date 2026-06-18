import { Repository } from 'typeorm';
import { Livro } from '../domain/livro.entity';
import { Capitulo } from '../domain/capitulo.entity';
import { Versiculo } from '../domain/versiculo.entity';
import { Palavra } from '../domain/palavra.entity';
import { Traducao } from '../domain/traducao.entity';
import { Testamento } from '../domain/testamento.entity';
export declare class BibliaService {
    private livroRepo;
    private capituloRepo;
    private versiculoRepo;
    private palavraRepo;
    private traducaoRepo;
    private testamentoRepo;
    private readonly logger;
    constructor(livroRepo: Repository<Livro>, capituloRepo: Repository<Capitulo>, versiculoRepo: Repository<Versiculo>, palavraRepo: Repository<Palavra>, traducaoRepo: Repository<Traducao>, testamentoRepo: Repository<Testamento>);
    listarTestamentos(): Promise<Testamento[]>;
    listarLivros(testamentoId?: string): Promise<Livro[]>;
    buscarPorSlug(slug: string): Promise<Livro>;
    buscarCapitulo(livroId: string, numero: number): Promise<Capitulo>;
    buscarVersiculo(livroId: string, capitulo: number, versiculo: number, traducaoId?: string): Promise<Versiculo>;
    buscarPassagem(livroId: string, capitulo: number, inicio: number, fim?: number, traducaoId?: string): Promise<Versiculo[]>;
    listarTraducoes(): Promise<Traducao[]>;
    pesquisar(consulta: string, traducaoId?: string, limite?: number): Promise<Versiculo[]>;
    buscarPalavraCompleta(palavraId: string): Promise<Palavra>;
}
