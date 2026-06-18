import { Doutrina } from './doutrina.entity';
export declare class DoutrinaVersiculo {
    id: string;
    doutrinaId: string;
    versiculoId: string;
    relevancia: string;
    peso: number;
    doutrina: Doutrina;
}
