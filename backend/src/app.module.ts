import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from './file/file.entity';
import { Folder } from './folder/folder.entity';

import { FilesService } from './file/files.service';
import { FilesController } from './file/files.controller';

import { FolderModule } from './folder/folder.module';

import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pdf_folder_viewer',
      entities: [File, Folder],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([File, Folder]),
    FolderModule,
  ],
  controllers: [FilesController, UploadController],
  providers: [FilesService, UploadService],
})
export class AppModule {}
