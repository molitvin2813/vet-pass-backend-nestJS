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
import { ServiceTable } from 'src/entities/ServiceTable';

import { ServiceTableService } from './service-table.service';

@Controller('service')
export class ServiceTableController {
  constructor(private service: ServiceTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllAnimals() {
    return this.service.getServices();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  postSomeAnimal(@Body() req: ServiceTable) {
    const newVar = plainToInstance(ServiceTable, req);
    return this.service.createService(newVar);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeAnimal(@Param('id') id: number) {
    return this.service.getSomeService(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateAnimal(@Param('id') id: number, @Body() req: ServiceTable) {
    const newVar = plainToInstance(ServiceTable, req);
    return this.service.updateService(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteService(id);
  }
}
