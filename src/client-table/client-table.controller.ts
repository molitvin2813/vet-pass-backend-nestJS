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
import { ClientDto } from 'src/DTO/client-dto';
import { ClientTable } from 'src/entities/ClientTable';
import { ClientTableService } from './client-table.service';

@Controller('client')
export class ClientTableController {
  constructor(private service: ClientTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllClient() {
    return this.service.getAllClients();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeClient(@Param('id') id: number) {
    return this.service.getSomeClient(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  createClient(@Body() req: ClientDto) {
    const newClient = plainToInstance(ClientTable, req);
    return this.service.createClient(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  updateClient(@Param('id') id: number, @Body() req: ClientDto) {

    const newClient = plainToInstance(ClientTable, req);
    console.log(newClient);
    return this.service.updateClient(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteClient(@Param('id') id: number) {
    return this.service.deleteClient(id);
  }
}
