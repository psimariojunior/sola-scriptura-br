import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Publico } from '../../common/decorators/publico.decorator';
import { ColaborativoService } from './colaborativo.service';
import { StudyRoom, RoomMessage, RoomParticipant } from './entities/study-room.entity';

@Controller('colaborativo')
export class ColaborativoController {
  constructor(private readonly service: ColaborativoService) {}

  @Publico()
  @Post('rooms')
  @HttpCode(HttpStatus.CREATED)
  async createRoom(@Body() body: { code: string; name: string; hostUserId: string }): Promise<StudyRoom> {
    return this.service.createRoom(body.code, body.name, body.hostUserId);
  }

  @Publico()
  @Get('rooms/:code')
  async getRoom(@Param('code') code: string): Promise<StudyRoom | null> {
    return this.service.findByCode(code);
  }

  @Publico()
  @Post('rooms/:code/participants')
  async addParticipant(
    @Param('code') code: string,
    @Body() body: RoomParticipant,
  ): Promise<StudyRoom | null> {
    return this.service.addParticipant(code, body);
  }

  @Publico()
  @Post('rooms/:code/participants/:participantId/leave')
  async removeParticipant(
    @Param('code') code: string,
    @Param('participantId') participantId: string,
  ): Promise<StudyRoom | null> {
    return this.service.removeParticipant(code, participantId);
  }

  @Publico()
  @Post('rooms/:code/messages')
  async addMessage(
    @Param('code') code: string,
    @Body() body: RoomMessage,
  ): Promise<StudyRoom | null> {
    return this.service.addMessage(code, body);
  }

  @Publico()
  @Post('rooms/:code/notes')
  async updateNotes(
    @Param('code') code: string,
    @Body() body: { notes: Record<string, string> },
  ): Promise<StudyRoom | null> {
    return this.service.updateSharedNotes(code, body.notes);
  }

  @Publico()
  @Post('rooms/:code/deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivateRoom(@Param('code') code: string): Promise<void> {
    return this.service.deactivateRoom(code);
  }
}
