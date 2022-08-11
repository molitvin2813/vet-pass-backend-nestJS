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
import { ClientDto } from 'src/DTO/client-dto';
import { ClientTable } from 'src/entities/ClientTable';
import { ClientTableService } from './client-table.service';

@Controller('client')
export class ClientTableController {
  constructor(private service: ClientTableService) {}

  @Get()
  getAllClient() {
    return this.service.getAllClients();
  }

  @Get(':id')
  getSomeClient(@Param('id') id: number) {
    return this.service.getSomeClient(id);
  }

  @Post()
  createClient(@Body() req: ClientDto) {
    const newClient = plainToInstance(ClientTable, req);
    return this.service.createClient(newClient);
  }

  @Put(':id')
  updateClient(@Param('id') id: number, @Body() req: ClientDto) {
    const newClient = plainToInstance(ClientTable, req);
    return this.service.updateClient(id, newClient);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: number) {
    return this.service.deleteClient(id);
  }
}
