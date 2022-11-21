import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserRemoveAvatar1665956730349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users","avatar");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name : "avatar",
            type: "varchar"
        }));
    }
}
