import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { File } from '../file/file.entity';
import { Folder } from '../folder/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Folder])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
