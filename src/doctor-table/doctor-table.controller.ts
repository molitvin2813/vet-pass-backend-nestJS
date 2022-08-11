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
import { DoctorTable } from 'src/entities/DoctorTable';

import { DoctorTableService } from './doctor-table.service';

@Controller('doctor')
export class DoctorTableController {
  constructor(private service: DoctorTableService) {}

  @Get()
  getAllArticle() {
    return this.service.getDoctor();
  }
  @Get('visit')
  getDoctorVisit() {
    return this.service.getDoctorVisit();
  }

  @Get(':id')
  getSomeClient(@Param('id') id: number) {
    return this.service.getSomeDoctor(id);
  }

  @Post()
  createClient(@Body() req: DoctorTable) {
    return this.service.createDoctor(req);
  }

  @Put(':id')
  updateClient(@Param('id') id: number, @Body() req: DoctorTable) {
    return this.service.updateDoctor(id, req);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: number) {
    return this.service.deleteDoctor(id);
  }
}
