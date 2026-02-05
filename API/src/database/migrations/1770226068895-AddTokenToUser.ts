import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenToUser1770226068895 implements MigrationInterface {
  name = 'AddTokenToUser1770226068895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
  }
}
