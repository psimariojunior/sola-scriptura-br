import { Capitulo } from './capitulo.entity';
import { Traducao } from './traducao.entity';
import { Testamento } from './testamento.entity';
export declare class Livro {
    id: string;
    nome: string;
    nomeAbreviado: string;
    nomeIngles: string;
    nomeHebraico: string;
    nomeGrego: string;
    slug: string;
    ordemTestamento: number;
    ordemGeral: number;
    totalCapitulos: number;
    autor: string;
    dataEscrita: string;
    contextoHistorico: string;
    proposito: string;
    temasPrincipais: string;
    palavrasChave: string[];
    generoLiterario: string;
    testamentoId: string;
    testamento: Testamento;
    capitulos: Capitulo[];
    traducoes: Traducao[];
    criadoEm: Date;
    atualizadoEm: Date;
}
