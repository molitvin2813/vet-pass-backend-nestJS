import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { DateDTO } from 'src/DTO/date-dto';
import { DateBetween, DateBetweenVisit } from 'src/DTO/dateBetween-dto';
import { VisitTable } from 'src/entities/VisitTable';
import { VisitTableService } from './visit-table.service';
import { Request } from 'express';
@Controller('visit')
export class VisitTableController {
  constructor(private service: VisitTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllVisits() {
    return this.service.getVisits();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  postSomeVisit(@Body() req: VisitTable) {
    const newVar = plainToInstance(VisitTable, req);
    console.log(req);
    return this.service.createVisit(newVar);
  }

  @Post('sum')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getSumByTime(@Body('date') date: string) {
    return this.service.getSumReceiptByDate(date);
  }

  @Post('sum/month')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getSumByMonth(@Body('date') date: string) {
    console.log(date);
    return this.service.getSumByMonth(date);
  }

  @Post('sum/receipt')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getSumByDay(@Body('date') date: string) {
    return this.service.getSumByDay(date);
  }

  @Post('date')
  getVisitByDate(@Req() request: Request, @Body() req: DateBetweenVisit) {
    const { is_admin, id_doctor } = request.headers;
    return this.service.getVisitsByDate(req, is_admin, id_doctor);
  }

  @Get('animal/uncompleted/:id_animal')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.CLIENT, Role.USER)
  getVisitByAnimalUncompleted(@Param('id_animal') id_animal: number) {
    return this.service.getVisitsByAnimal(id_animal, 0);
  }

  @Get('animal/completed/:id_animal')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.CLIENT, Role.USER)
  getVisitByAnimalCompleted(@Param('id_animal') id_animal: number) {
    return this.service.getVisitsByAnimal(id_animal, 1);
  }

  @Post('animal/date')
  getVisitByDateAndByAnimal(
    @Req() request: Request,
    @Body() req: DateBetweenVisit,
  ) {
    const { id_animal } = request.headers;
    return this.service.getVisitsByDateAndByAnimal(req, id_animal);
  }

  @Post('client/date')
  getVisitByDateAndByClient(
    @Req() request: Request,
    @Body() req: DateBetweenVisit,
  ) {
    const { id_client } = request.headers;
    return this.service.getVisitsByDateAndByClient(req, id_client);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeVisit(@Param('id') id: number) {
    return this.service.getSomeVisit(id);
  }

  @Post('doctor/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getVisitsByDoctorId(@Param('id') id: number, @Body() date: DateDTO) {
    return this.service.getVisitsByDoctorId(id, date);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateVisit(@Param('id') id: number, @Body() req: VisitTable) {
    console.log(req);
    const newVar = plainToInstance(VisitTable, req);
    return this.service.updateVisit(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteVisit(@Param('id') id: number, @Body() req) {
    return this.service.deleteVisit(id);
  }
}
