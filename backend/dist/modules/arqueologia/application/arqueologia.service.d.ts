import { Repository } from 'typeorm';
import { Artefato } from '../domain/artefato.entity';
import { Manuscrito } from '../domain/manuscrito.entity';
export declare class ArqueologiaService {
    private artefatoRepo;
    private manuscritoRepo;
    private readonly logger;
    constructor(artefatoRepo: Repository<Artefato>, manuscritoRepo: Repository<Manuscrito>);
    listarArtefatos(tipo?: string): Promise<Artefato[]>;
    buscarArtefato(id: string): Promise<Artefato>;
    listarManuscritos(): Promise<Manuscrito[]>;
}
