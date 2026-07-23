import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('simple-json', { default: '{}' })
  readingSessions: Array<{ date: string; chaptersRead: number; timeSpent: number; books: string[] }>;

  @Column('simple-json', { default: '{}' })
  flashcards: Array<{ id: string; verso: string; referencia: string; interval: number; repetition: number; easeFactor: number; nextReview: number; lastReview: number }>;

  @Column('simple-json', { default: '{}' })
  quizScores: Array<{ date: string; score: number; mode: string }>;

  @Column({ default: 0 })
  streak: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
