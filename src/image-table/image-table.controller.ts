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
import { ImageTable } from 'src/entities/ImageTable';

import { ImageTableService } from './image-table.service';

@Controller('image')
export class ImageTableController {
  constructor(private service: ImageTableService) {}

  @Get('animal/:id')
  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.USER, Role.ADMIN)
  getAllAnimals(@Param('id') id: number) {
    console.log(this.service.getImages(id)[0]);
    return this.service.getImages(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  postSomeAnimal(@Body() req: ImageTable) {
    const newAnimal = plainToInstance(ImageTable, req);
    console.log(req);
    return this.service.createImage(newAnimal);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeAnimal(@Param('id') id: number) {
    console.log('hui' + id);
    return this.service.getSomeImage(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateAnimal(@Param('id') id: number, @Body() req: ImageTable) {
    const newAnimal = plainToInstance(ImageTable, req);
    return this.service.updateImage(id, newAnimal);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteImage(id);
  }
}
