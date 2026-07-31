import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface RoomParticipant {
  id: string;
  name: string;
  joinedAt: Date;
}

export interface RoomMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  type: 'chat' | 'verse' | 'note' | 'system';
}

@Entity('study_rooms')
export class StudyRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  hostUserId: string;

  @Column('jsonb', { default: '[]' })
  participants: RoomParticipant[];

  @Column('jsonb', { default: '[]' })
  messages: RoomMessage[];

  @Column('jsonb', { default: '{}' })
  sharedNotes: Record<string, string>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
