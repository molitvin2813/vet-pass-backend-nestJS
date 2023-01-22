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
import { TypeNews } from 'src/entities/TypeNews';
import { TypeNewsService } from './type-news.service';

@Controller('type-news')
export class TypeNewsController {
  constructor(private service: TypeNewsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllClient() {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeClient(@Param('id') id: number) {
    return this.service.getSome(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  createClient(@Body() req: TypeNews) {
    const newClient = plainToInstance(TypeNews, req);
    return this.service.create(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: TypeNews) {
    const newClient = plainToInstance(TypeNews, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
