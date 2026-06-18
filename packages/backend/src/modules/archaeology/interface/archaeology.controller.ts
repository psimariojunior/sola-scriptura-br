import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArchaeologyService } from '../application/archaeology.service';

@ApiTags('Arqueologia Bíblica')
@Controller('arqueologia')
export class ArchaeologyController {
  constructor(private readonly archaeologyService: ArchaeologyService) {}

  @Get('descoberta/:nome')
  @ApiOperation({ summary: 'Buscar descoberta arqueológica' })
  async buscarDescoberta(@Param('nome') nome: string) {
    return this.archaeologyService.buscarDescoberta(nome);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Listar descobertas por tipo' })
  async listarPorTipo(@Param('tipo') tipo: string) {
    return this.archaeologyService.listarPorTipo(tipo);
  }

  @Get('local/:localId')
  @ApiOperation({ summary: 'Listar descobertas por local' })
  async listarPorLocal(@Param('localId') localId: string) {
    return this.archaeologyService.listarPorLocal(localId);
  }

  @Get('importantes')
  @ApiOperation({ summary: 'Listar descobertas importantes' })
  async listarImportantes() {
    return this.archaeologyService.listarDescobertasImportantes();
  }
}
