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
import { AnimalTypeTable } from 'src/entities/AnimalTypeTable';

import { AnimalTypeTableService } from './animal-type-table.service';
@Controller('animal-type')
export class AnimalTypeTableController {
  constructor(private service: AnimalTypeTableService) {}

  @Get()

  getAllAnimalsTypes() {
    return this.service.getAllAnimalsTypes();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  postSomeAnimalType(@Body() req: AnimalTypeTable) {
    const newAnimal = plainToInstance(AnimalTypeTable, req);
    return this.service.createSomeAnimalType(newAnimal);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeAnimalType(@Param('id') id: number) {
    console.log('hui' + id);
    return this.service.getSomeAnimalType(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateAnimalTypes(@Param('id') id: number, @Body() req: AnimalTypeTable) {
    const newAnimal = plainToInstance(AnimalTypeTable, req);
    return this.service.updateAnimalTypes(id, newAnimal);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteAnimalType(id);
  }
}
