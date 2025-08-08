import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMockFoldersAndFiles1691180000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO folder (name, created_at) VALUES
      ('Документы', NOW()),
      ('Фотографии', NOW()),
      ('Проекты', NOW());
    `);

    await queryRunner.query(`
      INSERT INTO file (name, path, uploaded_at, "folderId") VALUES
      ('doc1.pdf', 'doc1.pdf', NOW(), 1),
      ('photo1.jpg', 'photo1.jpg', NOW(), 2),
      ('project.zip', 'project.zip', NOW(), 3);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM file`);
    await queryRunner.query(`DELETE FROM folder`);
  }
}
