// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { Folder } from '../folder/folder.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,

    @InjectRepository(Folder)
    private readonly folderRepo: Repository<Folder>,
  ) {}

  async saveFile(fileName: string, folderId: number) {
    const folder = await this.folderRepo.findOne({ where: { id: folderId } });
    if (!folder) {
      throw new Error('Папка не найдена');
    }

    const file = this.fileRepo.create({
      name: fileName,
      path: fileName,
      uploadedAt: new Date(),
      folder: folder,
    });

    return await this.fileRepo.save(file);
  }
}
