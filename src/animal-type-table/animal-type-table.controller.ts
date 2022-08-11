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
  postSomeAnimalType(@Body() req: AnimalTypeTable) {
    const newAnimal = plainToInstance(AnimalTypeTable, req);
    return this.service.createSomeAnimalType(newAnimal);
  }

  @Get(':id')
  getSomeAnimalType(@Param('id') id: number) {
    console.log('hui' + id);
    return this.service.getSomeAnimalType(id);
  }

  @Put(':id')
  updateAnimalTypes(@Param('id') id: number, @Body() req: AnimalTypeTable) {
    const newAnimal = plainToInstance(AnimalTypeTable, req);
    return this.service.updateAnimalTypes(id, newAnimal);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteAnimalType(id);
  }
}
