import { Controller, Get, Post, Delete, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UserDataService } from './user-data.service';

@Controller('api/v1/user-data')
export class UserDataController {
  constructor(private readonly service: UserDataService) {}

  private getUserId(auth: string): string {
    if (!auth) throw new UnauthorizedException('Token required');
    return auth.replace('Bearer ', '');
  }

  @Get('favorites') getFavorites(@Headers('authorization') auth: string) { return this.service.getFavorites(this.getUserId(auth)); }
  @Post('favorites') addFavorite(@Headers('authorization') auth: string, @Body() body: any) { return this.service.addFavorite(this.getUserId(auth), body); }
  @Delete('favorites/:id') removeFavorite(@Headers('authorization') auth: string, @Param('id') id: string) { return this.service.removeFavorite(this.getUserId(auth), id); }

  @Get('notes') getNotes(@Headers('authorization') auth: string) { return this.service.getNotes(this.getUserId(auth)); }
  @Post('notes') saveNote(@Headers('authorization') auth: string, @Body() body: any) { return this.service.saveNote(this.getUserId(auth), body); }
  @Delete('notes/:id') deleteNote(@Headers('authorization') auth: string, @Param('id') id: string) { return this.service.deleteNote(this.getUserId(auth), id); }

  @Get('collections') getCollections(@Headers('authorization') auth: string) { return this.service.getCollections(this.getUserId(auth)); }
  @Post('collections') saveCollection(@Headers('authorization') auth: string, @Body() body: any) { return this.service.saveCollection(this.getUserId(auth), body); }
  @Delete('collections/:id') deleteCollection(@Headers('authorization') auth: string, @Param('id') id: string) { return this.service.deleteCollection(this.getUserId(auth), id); }

  @Get('progress') getProgress(@Headers('authorization') auth: string) { return this.service.getProgress(this.getUserId(auth)); }
  @Post('progress') saveProgress(@Headers('authorization') auth: string, @Body() body: any) { return this.service.saveProgress(this.getUserId(auth), body); }
}
