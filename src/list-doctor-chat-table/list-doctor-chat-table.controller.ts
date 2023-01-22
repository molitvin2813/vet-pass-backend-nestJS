import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { ListDoctorChatTable } from 'src/entities/ListDoctorChatTable';
import { ListDoctorChatTableService } from './list-doctor-chat-table.service';
@Controller('list-doctor-chat-table')
export class ListDoctorChatTableController {
  constructor(private service: ListDoctorChatTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllClient() {
    return this.service.getAll();
  }

  @Get('room/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeByRoom(@Param('id') id: number) {
    return this.service.getSomeByRoom(id);
  }

  @Get('doctor/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeByDoctor(@Param('id') id: number) {
    return this.service.getSomeByDoctor(id);
  }

  @Get('doctor/count/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getCountUnread(@Param('id') id: number) {
    return this.service.getCountUnread(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  createClient(@Body() req: ListDoctorChatTable) {
    const newClient = plainToInstance(ListDoctorChatTable, req);
    return this.service.create(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: ListDoctorChatTable) {
    const newClient = plainToInstance(ListDoctorChatTable, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
