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

  @Column({ name: 'host_user_id', nullable: true })
  hostUserId: string;

  @Column('jsonb', { name: 'participants', default: '[]' })
  participants: RoomParticipant[];

  @Column('jsonb', { name: 'messages', default: '[]' })
  messages: RoomMessage[];

  @Column('jsonb', { name: 'shared_notes', default: '{}' })
  sharedNotes: Record<string, string>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
