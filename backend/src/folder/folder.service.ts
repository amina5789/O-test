// src/folder/folder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  // Получить все папки с вложенными файлами
  getAllFolders(): Promise<Folder[]> {
    return this.folderRepository.find({
      relations: ['files', 'files.folder'],
    });
  }

  // Создать новую папку
  async createFolder(name: string): Promise<Folder> {
    const folder = this.folderRepository.create({ name });
    return this.folderRepository.save(folder);
  }

  // Получить папку по ID
  async getFolderById(id: number): Promise<Folder | null> {
    return this.folderRepository.findOne({
      where: { id },
      relations: ['files'],
    });
  }
}
