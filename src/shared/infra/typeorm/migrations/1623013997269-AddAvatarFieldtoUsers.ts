import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarFieldtoUsers1622948768205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "avatar" VARCHAR(255) DEFAULT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
