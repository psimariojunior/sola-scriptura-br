import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../common/decorators/usuario-atual.decorator';

@Controller('api/v1/user-data')
@UseGuards(JwtAuthGuard)
export class UserDataController {
  constructor(private readonly service: UserDataService) {}

  @Get('favorites')
  getFavorites(@UsuarioAtual('id') userId: string) {
    return this.service.getFavorites(userId);
  }

  @Post('favorites')
  addFavorite(@UsuarioAtual('id') userId: string, @Body() body: any) {
    return this.service.addFavorite(userId, body);
  }

  @Delete('favorites/:id')
  removeFavorite(@UsuarioAtual('id') userId: string, @Param('id') id: string) {
    return this.service.removeFavorite(userId, id);
  }

  @Get('notes')
  getNotes(@UsuarioAtual('id') userId: string) {
    return this.service.getNotes(userId);
  }

  @Post('notes')
  saveNote(@UsuarioAtual('id') userId: string, @Body() body: any) {
    return this.service.saveNote(userId, body);
  }

  @Delete('notes/:id')
  deleteNote(@UsuarioAtual('id') userId: string, @Param('id') id: string) {
    return this.service.deleteNote(userId, id);
  }

  @Get('collections')
  getCollections(@UsuarioAtual('id') userId: string) {
    return this.service.getCollections(userId);
  }

  @Post('collections')
  saveCollection(@UsuarioAtual('id') userId: string, @Body() body: any) {
    return this.service.saveCollection(userId, body);
  }

  @Delete('collections/:id')
  deleteCollection(@UsuarioAtual('id') userId: string, @Param('id') id: string) {
    return this.service.deleteCollection(userId, id);
  }

  @Get('progress')
  getProgress(@UsuarioAtual('id') userId: string) {
    return this.service.getProgress(userId);
  }

  @Post('progress')
  saveProgress(@UsuarioAtual('id') userId: string, @Body() body: any) {
    return this.service.saveProgress(userId, body);
  }
}
