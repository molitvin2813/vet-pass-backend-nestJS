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
import { ListUserChatTable } from 'src/entities/ListUserChatTable';
import { ListUserChatTableService } from './list-user-chat-table.service';

@Controller('list-user-chat-table')
export class ListUserChatTableController {
  constructor(private service: ListUserChatTableService) {}

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

  @Get('client/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeByClient(@Param('id') id: number) {
    return this.service.getSomeByClient(id);
  }

  @Get('count/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getCountUnread(@Param('id') id: number) {
    return this.service.getCountUnread(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  createClient(@Body() req: ListUserChatTable) {
    const newClient = plainToInstance(ListUserChatTable, req);
    return this.service.create(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  updateClient(@Param('id') id: number, @Body() req: ListUserChatTable) {
    const newClient = plainToInstance(ListUserChatTable, req);
    console.log(req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
