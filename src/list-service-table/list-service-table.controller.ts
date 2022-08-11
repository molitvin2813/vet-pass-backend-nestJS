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
import { ListServiceTable } from 'src/entities/ListServiceTable';

import { ListServiceTableService } from './list-service-table.service';

@Controller('list-service')
export class ListServiceTableController {
  constructor(private service: ListServiceTableService) {}

  @Get(':id')
  getServiceList(@Param('id') id: number) {
    return this.service.getServiceList(id);
  }

  @Post()
  postSomeServiceList(@Body() req: ListServiceTable) {
    const newVar = plainToInstance(ListServiceTable, req);
    return this.service.createServiceList(newVar);
  }

  @Put(':id')
  updateServiceList(@Param('id') id: number, @Body() req: ListServiceTable) {
    const newVar = plainToInstance(ListServiceTable, req);
    return this.service.updateServiceList(id, newVar);
  }

  @Delete(':id')
  deleteServiceList(@Param('id') id: number) {
    return this.service.deleteServiceList(id);
  }
}
