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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { DateDTO } from 'src/DTO/date-dto';
import { DoctorTable } from 'src/entities/DoctorTable';

import { DoctorTableService } from './doctor-table.service';

@Controller('doctor')
export class DoctorTableController {
  constructor(private service: DoctorTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllArticle() {
    return this.service.getDoctor();
  }
  @Get('visit')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getDoctorVisit() {
    return this.service.getDoctorVisit();
  }

  @Post('visit/date')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getDoctorsVisitByDate(@Body() date: DateDTO) {
    return this.service.getDoctorVisitByDate(date.date);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getSomeClient(@Param('id') id: number) {
    return this.service.getSomeDoctor(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  createClient(@Body() req: DoctorTable) {
    return this.service.createDoctor(req);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: DoctorTable) {
    return this.service.updateDoctor(id, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.deleteDoctor(id);
  }
}
