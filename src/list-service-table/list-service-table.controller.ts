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
import { ListServiceTable } from 'src/entities/ListServiceTable';

import { ListServiceTableService } from './list-service-table.service';

@Controller('list-service')
export class ListServiceTableController {
  constructor(private service: ListServiceTableService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getServiceList(@Param('id') id: number) {
    return this.service.getServiceList(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  postSomeServiceList(@Body() req: ListServiceTable) {
    const newVar = plainToInstance(ListServiceTable, req);
    return this.service.createServiceList(newVar);
  }

  @Post('date')
  getAllServiceListDate(@Body() date: DateBetween) {
    return this.service.getAllMaterialByDate(date);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateServiceList(@Param('id') id: number, @Body() req: ListServiceTable) {
    const newVar = plainToInstance(ListServiceTable, req);
    return this.service.updateServiceList(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteServiceList(@Param('id') id: number) {
    return this.service.deleteServiceList(id);
  }
}
