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
import { AnimalTable } from 'src/entities/AnimalTable';
import { AnimalDto } from '../DTO/animal-dto';

import { AnimalTableService } from './animal-table.service';

@Controller('animal')
export class AnimalTableController {
  constructor(private service: AnimalTableService) {}

  @Get()
  getAllAnimals() {
    return this.service.getAnimals();
  }

  @Post()
  postSomeAnimal(@Body() req: AnimalDto) {
    const newAnimal = plainToInstance(AnimalTable, req);
    console.log(req);
    return this.service.createAnimal(newAnimal);
  }

  @Get(':id')
  getSomeAnimal(@Param('id') id: number) {
    console.log('hui' + id);
    return this.service.getSomeAnimal(id);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: number, @Body() req: AnimalDto) {
    const newAnimal = plainToInstance(AnimalTable, req);
    return this.service.updateAnimal(id, newAnimal);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteAnimal(id);
  }
}
