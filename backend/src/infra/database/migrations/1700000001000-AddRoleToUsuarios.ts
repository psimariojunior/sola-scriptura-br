import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUsuarios1700000001000 implements MigrationInterface {
  name = 'AddRoleToUsuarios1700000001000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "role" varchar(20) NOT NULL DEFAULT 'user'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN IF EXISTS "role"`);
  }
}
