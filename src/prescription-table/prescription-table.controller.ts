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
import { PrescriptionTable } from 'src/entities/PrescriptionTable';
import { PrescriptionTableService } from './prescription-table.service';

@Controller('prescription')
export class PrescriptionTableController {
  constructor(private service: PrescriptionTableService) {}

  @Get('animal/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeByAnimal(@Param('id') id: number) {
    return this.service.getSomeByAnimal(id);
  }

  @Get('visit/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeByVisit(@Param('id') id: number) {
    return this.service.getSomeByVisit(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  createClient(@Body() req: PrescriptionTable) {
    const newClient = plainToInstance(PrescriptionTable, req);
    return this.service.create(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: PrescriptionTable) {
    const newClient = plainToInstance(PrescriptionTable, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
