import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavorite } from './entities/user-favorite.entity';
import { UserNote } from './entities/user-note.entity';
import { UserCollection } from './entities/user-collection.entity';
import { UserProgress } from './entities/user-progress.entity';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(UserFavorite) private favoriteRepo: Repository<UserFavorite>,
    @InjectRepository(UserNote) private noteRepo: Repository<UserNote>,
    @InjectRepository(UserCollection) private collectionRepo: Repository<UserCollection>,
    @InjectRepository(UserProgress) private progressRepo: Repository<UserProgress>,
  ) {}

  // Favorites
  async getFavorites(userId: string) { return this.favoriteRepo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async addFavorite(userId: string, data: Partial<UserFavorite>) { return this.favoriteRepo.save(this.favoriteRepo.create({ ...data, userId })); }
  async removeFavorite(userId: string, id: string) { return this.favoriteRepo.delete({ id, userId }); }

  // Notes
  async getNotes(userId: string) { return this.noteRepo.find({ where: { userId }, order: { updatedAt: 'DESC' } }); }
  async saveNote(userId: string, data: Partial<UserNote>) { return this.noteRepo.save(this.noteRepo.create({ ...data, userId })); }
  async deleteNote(userId: string, id: string) { return this.noteRepo.delete({ id, userId }); }

  // Collections
  async getCollections(userId: string) { return this.collectionRepo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async saveCollection(userId: string, data: Partial<UserCollection>) { return this.collectionRepo.save(this.collectionRepo.create({ ...data, userId })); }
  async deleteCollection(userId: string, id: string) { return this.collectionRepo.delete({ id, userId }); }

  // Progress
  async getProgress(userId: string) { return this.progressRepo.findOne({ where: { userId } }); }
  async saveProgress(userId: string, data: Partial<UserProgress>) {
    const existing = await this.getProgress(userId);
    if (existing) { Object.assign(existing, data); return this.progressRepo.save(existing); }
    return this.progressRepo.save(this.progressRepo.create({ ...data, userId }));
  }
}
