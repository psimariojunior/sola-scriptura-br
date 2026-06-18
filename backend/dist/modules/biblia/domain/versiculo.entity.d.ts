import { Capitulo } from './capitulo.entity';
import { Palavra } from './palavra.entity';
import { ReferenciaCruzada } from '../../referencias/domain/referencia-cruzada.entity';
import { Nota } from '../../notas/domain/nota.entity';
export declare class Versiculo {
    id: string;
    numero: number;
    texto: string;
    textoFormatado: string;
    livroId: string;
    capituloId: string;
    capituloNumero: number;
    traducaoId: string;
    testamentoId: string;
    capitulo: Capitulo;
    palavras: Palavra[];
    referenciasOrigem: ReferenciaCruzada[];
    referenciasDestino: ReferenciaCruzada[];
    notas: Nota[];
    criadoEm: Date;
    atualizadoEm: Date;
}
