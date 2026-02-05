import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameColumnToUser1770267200976 implements MigrationInterface {
  name = 'AddNameColumnToUser1770267200976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying NOT NULL DEFAULT 'User'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
