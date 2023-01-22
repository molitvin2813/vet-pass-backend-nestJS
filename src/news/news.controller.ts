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
import { DateBetween, DateBetweenVisit } from 'src/DTO/dateBetween-dto';
import { NewsTable } from 'src/entities/NewsTable';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private service: NewsService) {}

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
  createClient(@Body() req: NewsTable) {
    const newClient = plainToInstance(NewsTable, req);
    return this.service.create(newClient);
  }

  @Post('date')
  getVisitByDate(@Body() req: DateBetween) {
    return this.service.getVisitsByDate(req);
  }

  @Post('page/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllByPage(@Param('id') id: number) {
    return this.service.getAllByPage(id);
  }

  @Post('page/type/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllByPageAndByCategory(
    @Param('id') id: number,
    @Body('idType') idType: number,
  ) {
    return this.service.getAllByPageAndByCategory(id, idType);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: NewsTable) {
    console.log(id);
    const newClient = plainToInstance(NewsTable, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
