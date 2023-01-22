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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { StorageTable } from 'src/entities/StorageTable';

import { StorageTableService } from './storage-table.service';
@Controller('storage')
export class StorageTableController {
  constructor(private service: StorageTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllStorage() {
    return this.service.getStorage();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeStorage(@Param('id') id: number) {
    return this.service.getSomeStorage(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  postSomeStorage(@Body() req: StorageTable) {
    const newVar = plainToInstance(StorageTable, req);
    return this.service.createStorage(newVar);
  }

  @Post('date')
  getAllStorageByDate(@Body() date: DateBetween) {
    return this.service.getAllStorageByDate(date);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateAnimal(@Param('id') id: number, @Body() req: StorageTable) {
    const newVar = plainToInstance(StorageTable, req);
    return this.service.updateStorage(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteStorage(id);
  }
}
