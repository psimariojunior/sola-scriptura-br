import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { StudyRoom, RoomMessage, RoomParticipant } from './entities/study-room.entity';

@Injectable()
export class ColaborativoService {
  private logger = new Logger('ColaborativoService');

  constructor(
    @InjectRepository(StudyRoom)
    private roomRepo: Repository<StudyRoom>,
  ) {}

  async createRoom(code: string, name: string, hostUserId: string): Promise<StudyRoom> {
    const existing = await this.roomRepo.findOne({ where: { code, isActive: true } });
    if (existing) {
      this.logger.log(`Room reused: ${code} (id: ${existing.id})`);
      return existing;
    }

    const room = this.roomRepo.create({
      code,
      name,
      hostUserId,
      participants: [{ id: hostUserId, name: 'Host', joinedAt: new Date() }],
      messages: [],
      sharedNotes: {},
      isActive: true,
    });
    const saved = await this.roomRepo.save(room);
    this.logger.log(`Room created: ${code} (id: ${saved.id})`);
    return saved;
  }

  async findByCode(code: string): Promise<StudyRoom | null> {
    return this.roomRepo.findOne({ where: { code, isActive: true } });
  }

  async findById(id: string): Promise<StudyRoom | null> {
    return this.roomRepo.findOne({ where: { id, isActive: true } });
  }

  async addParticipant(code: string, participant: RoomParticipant): Promise<StudyRoom | null> {
    const room = await this.findByCode(code);
    if (!room) return null;

    room.participants = Array.isArray(room.participants) ? room.participants : [];
    if (!room.participants.some(p => p.id === participant.id)) {
      room.participants.push(participant);
      await this.roomRepo.save(room);
      this.logger.log(`${participant.name} joined room ${code}`);
    }
    return room;
  }

  async removeParticipant(code: string, participantId: string): Promise<StudyRoom | null> {
    const room = await this.findByCode(code);
    if (!room) return null;

    room.participants = room.participants.filter(p => p.id !== participantId);
    await this.roomRepo.save(room);
    this.logger.log(`${participantId} left room ${code}`);

    if (room.participants.length === 0) {
      room.isActive = false;
      await this.roomRepo.save(room);
      this.logger.log(`Room ${code} deactivated (empty)`);
    }
    return room;
  }

  async addMessage(code: string, message: RoomMessage): Promise<StudyRoom | null> {
    const room = await this.findByCode(code);
    if (!room) return null;

    room.messages = Array.isArray(room.messages) ? room.messages : [];
    room.messages.push(message);
    if (room.messages.length > 500) {
      room.messages = room.messages.slice(-500);
    }
    await this.roomRepo.save(room);
    return room;
  }

  async updateSharedNotes(code: string, notes: Record<string, string>): Promise<StudyRoom | null> {
    const room = await this.findByCode(code);
    if (!room) return null;

    room.sharedNotes = notes;
    await this.roomRepo.save(room);
    return room;
  }

  async deactivateRoom(code: string): Promise<void> {
    await this.roomRepo.update({ code }, { isActive: false });
    this.logger.log(`Room ${code} deactivated`);
  }

  async cleanupStaleRooms(hoursOld: number = 24): Promise<number> {
    const cutoff = new Date(Date.now() - hoursOld * 60 * 60 * 1000);
    const result = await this.roomRepo.update(
      { isActive: true, updatedAt: LessThan(cutoff) },
      { isActive: false },
    );
    if (result.affected && result.affected > 0) {
      this.logger.log(`Cleaned up ${result.affected} stale rooms`);
    }
    return result.affected || 0;
  }
}
