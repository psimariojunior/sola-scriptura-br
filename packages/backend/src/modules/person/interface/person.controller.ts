import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PersonService } from '../application/person.service';

@ApiTags('Personagens')
@Controller('personagens')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os personagens bíblicos' })
  @ApiQuery({ name: 'q', required: false, description: 'Busca por nome' })
  async listarTodos(@Query('q') q?: string) {
    return this.personService.listarTodos(q);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar personagem por ID' })
  async buscarPorId(@Param('id') id: string) {
    return this.personService.buscarPorId(id);
  }

  @Get('busca/:nome')
  @ApiOperation({ summary: 'Buscar personagens por nome' })
  async buscarPorNome(@Param('nome') nome: string) {
    return this.personService.buscarPorNome(nome);
  }
}
