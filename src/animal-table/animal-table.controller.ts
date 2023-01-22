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
import { AnimalTable } from 'src/entities/AnimalTable';
import { AnimalDto } from '../DTO/animal-dto';

import { AnimalTableService } from './animal-table.service';

@Controller('animal')
export class AnimalTableController {
  constructor(private service: AnimalTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllAnimals() {
    return this.service.getAnimals();
  }

  @Get('client/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllAnimalsByClient(@Param('id') id: number) {
    console.log(id);
    return this.service.getAllAnimalsByClient(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  postSomeAnimal(@Body() req: AnimalDto) {
    const newAnimal = plainToInstance(AnimalTable, req);
    console.log(req);
    return this.service.createAnimal(newAnimal);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeAnimal(@Param('id') id: number) {
    return this.service.getSomeAnimal(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateAnimal(@Param('id') id: number, @Body() req: AnimalDto) {
    const newAnimal = plainToInstance(AnimalTable, req);
    return this.service.updateAnimal(id, newAnimal);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteAnimal(id);
  }
}
