import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AtlasService } from '../application/atlas.service';

@ApiTags('Atlas Bíblico')
@Controller('atlas')
export class AtlasController {
  constructor(private readonly atlasService: AtlasService) {}

  @Get('completo')
  @ApiOperation({ summary: 'Mapa completo com todos os locais' })
  async mapaCompleto() {
    return this.atlasService.mapaCompleto();
  }

  @Get('imperios')
  @ApiOperation({ summary: 'Mapa dos impérios bíblicos' })
  async mapaImperios() {
    return this.atlasService.mapaImperios();
  }

  @Get('evento/:referencia')
  @ApiOperation({ summary: 'Mapa de evento bíblico' })
  async mapaEvento(@Param('referencia') referencia: string) {
    return this.atlasService.mapaEvento(referencia);
  }
}
