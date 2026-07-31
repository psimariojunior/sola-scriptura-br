import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAnalyticsEvents1700000002000 implements MigrationInterface {
  name = 'AddAnalyticsEvents1700000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_type VARCHAR(100) NOT NULL,
        page VARCHAR(255),
        user_id VARCHAR(255),
        session_id VARCHAR(255),
        metadata JSONB DEFAULT '{}',
        ip VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
      CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
      CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_events(user_id);
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS study_rooms (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(6) NOT NULL,
        name VARCHAR NOT NULL,
        host_user_id VARCHAR,
        participants JSONB DEFAULT '[]',
        messages JSONB DEFAULT '[]',
        shared_notes JSONB DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_study_rooms_code ON study_rooms(code);
      CREATE INDEX IF NOT EXISTS idx_study_rooms_active ON study_rooms(is_active);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS analytics_events');
    await queryRunner.query('DROP TABLE IF EXISTS study_rooms');
  }
}
