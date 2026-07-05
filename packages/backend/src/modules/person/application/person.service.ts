import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { BiblePerson } from '../../../infrastructure/database/entities/person.entity';

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);

  constructor(
    @InjectRepository(BiblePerson)
    private readonly personRepo: Repository<BiblePerson>,
  ) {}

  async listarTodos(q?: string): Promise<BiblePerson[]> {
    if (q) {
      return this.personRepo.find({
        where: { nome: ILike(`%${q}%`) },
        order: { nome: 'ASC' },
      });
    }
    return this.personRepo.find({ order: { nome: 'ASC' } });
  }

  async buscarPorId(id: string): Promise<BiblePerson> {
    const person = await this.personRepo.findOne({ where: { id } });
    if (!person) throw new NotFoundException(`Personagem com ID ${id} não encontrado`);
    return person;
  }

  async buscarPorNome(nome: string): Promise<BiblePerson[]> {
    return this.personRepo.find({
      where: { nome: ILike(`%${nome}%`) },
      order: { nome: 'ASC' },
    });
  }
}
