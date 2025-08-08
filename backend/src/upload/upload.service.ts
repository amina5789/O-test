import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../file/file.entity';
import { Folder } from '../folder/folder.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async saveFileMetadata(
    file: Express.Multer.File,
    folderId: number,
  ): Promise<File> {
    console.log('Saving file metadata:', { file, folderId });

    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
    });
    if (!folder) {
      throw new NotFoundException('Папка не найдена');
    }

    const fileEntity = this.fileRepository.create({
      name: file.originalname,
      path: file.filename,
      uploadedAt: new Date(),
      folder: folder,
    });

    return await this.fileRepository.save(fileEntity);
  }

  async deleteFile(filename: string): Promise<void> {
    const fileRecord = await this.fileRepository.findOne({
      where: { path: filename },
    });

    if (!fileRecord) {
      throw new NotFoundException('Файл не найден в базе');
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.fileRepository.remove(fileRecord);
  }
}
