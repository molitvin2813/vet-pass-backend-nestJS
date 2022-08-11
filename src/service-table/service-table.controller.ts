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
import { ServiceTable } from 'src/entities/ServiceTable';

import { ServiceTableService } from './service-table.service';

@Controller('service')
export class ServiceTableController {
  constructor(private service: ServiceTableService) {}

  @Get()
  getAllAnimals() {
    return this.service.getServices();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postSomeAnimal(@Body() req: ServiceTable) {
    const newVar = plainToInstance(ServiceTable, req);
    return this.service.createService(newVar);
  }

  @Get(':id')
  getSomeAnimal(@Param('id') id: number) {
    return this.service.getSomeService(id);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: number, @Body() req: ServiceTable) {
    const newVar = plainToInstance(ServiceTable, req);
    return this.service.updateService(id, newVar);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteService(id);
  }
}
