// src/folder/folder.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  getAll() {
    return this.folderService.getAllFolders();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.folderService.createFolder(name);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.folderService.getFolderById(id);
  }
}
