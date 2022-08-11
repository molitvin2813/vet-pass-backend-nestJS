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
import { VisitTable } from 'src/entities/VisitTable';
import { VisitTableService } from './visit-table.service';

@Controller('visit')
export class VisitTableController {
  constructor(private service: VisitTableService) {}

  @Get()
  getAllVisits() {
    return this.service.getVisits();
  }

  @Post()
  postSomeVisit(@Body() req: VisitTable) {
    const newVar = plainToInstance(VisitTable, req);
    console.log(req);
    return this.service.createVisit(newVar);
  }

  @Post('sum')
  getSumByTime(@Body('date') date: string) {
    return this.service.getSumByTime(date);
  }
  @Get(':id')
  getSomeVisit(@Param('id') id: number) {
    return this.service.getSomeVisit(id);
  }
  @Get('doctor/:id')
  getVisitsByDoctorId(@Param('id') id: number) {
    return this.service.getVisitsByDoctorId(id);
  }
  @Put(':id')
  updateVisit(@Param('id') id: number, @Body() req: VisitTable) {
    const newVar = plainToInstance(VisitTable, req);
    return this.service.updateVisit(id, newVar);
  }

  @Delete(':id')
  deleteVisit(@Param('id') id: number, @Body() req) {
    return this.service.deleteVisit(id);
  }
}
