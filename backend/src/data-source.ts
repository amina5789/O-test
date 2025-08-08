import { DataSource } from 'typeorm';
import { File } from './file/file.entity';
import { Folder } from './folder/folder.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pdf_folder_viewer',
  entities: [File, Folder],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
});
