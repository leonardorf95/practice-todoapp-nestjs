import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714087317999 implements MigrationInterface {
    name = 'Init1714087317999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "REL_53511787e1f412d746c4bf223f" UNIQUE ("user_id"), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca8cafd59ca6faaf6799534422" ON "todos" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_80f8e110328b670dc7ad7c4b1b" ON "todos" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_ad2c5b4967dd89e27c96945c41" ON "todos" ("is_completed") `);
        await queryRunner.query(`CREATE INDEX "IDX_53511787e1f412d746c4bf223f" ON "todos" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0adc0a8834ea0f252e96d154de" ON "users" ("full_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_token" character varying(4000) NOT NULL, "user_id" integer, CONSTRAINT "REL_085d540d9f418cfbdc7bd55bb1" UNIQUE ("user_id"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3238ef96f18b355b671619111b" ON "sessions" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b02a7acc05fe8194bed8433cf2" ON "sessions" ("access_token") `);
        await queryRunner.query(`CREATE INDEX "IDX_085d540d9f418cfbdc7bd55bb1" ON "sessions" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_085d540d9f418cfbdc7bd55bb1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b02a7acc05fe8194bed8433cf2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3238ef96f18b355b671619111b"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0adc0a8834ea0f252e96d154de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53511787e1f412d746c4bf223f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad2c5b4967dd89e27c96945c41"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80f8e110328b670dc7ad7c4b1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca8cafd59ca6faaf6799534422"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
