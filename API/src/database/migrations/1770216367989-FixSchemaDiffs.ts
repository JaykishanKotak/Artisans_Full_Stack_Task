import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSchemaDiffs1770216367989 implements MigrationInterface {
  name = 'FixSchemaDiffs1770216367989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_USER_EMAIL"`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_USER_EMAIL" ON "users" ("email") `,
    );
  }
}
