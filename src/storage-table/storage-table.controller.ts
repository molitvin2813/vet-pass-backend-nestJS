import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StorageTable } from 'src/entities/StorageTable';

import { StorageTableService } from './storage-table.service';
@Controller('storage')
export class StorageTableController {
  constructor(private service: StorageTableService) {}

  @Get()
  getAllStorage() {
    return this.service.getStorage();
  }

  @Get(':id')
  getSomeStorage(@Param('id') id: number) {
    return this.service.getSomeStorage(id);
  }

  @Post()
  postSomeStorage(@Body() req: StorageTable) {
    const newVar = plainToInstance(StorageTable, req);
    return this.service.createStorage(newVar);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: number, @Body() req: StorageTable) {
    const newVar = plainToInstance(StorageTable, req);
    return this.service.updateStorage(id, newVar);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteStorage(id);
  }
}
