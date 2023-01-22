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
import { ChatMessage } from 'src/entities/ChatMessage';
import { ChatMessageService } from './chat-message.service';
import * as fs from 'fs';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private service: ChatMessageService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllClient() {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getSomeClient(@Param('id') id: number) {
    return this.service.getSome(id);
  }

  @Get('last')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getLastClient() {
    return this.service.getLast();
  }

  @Post('page/:pageID')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllByPage(
    @Param('pageID') pageID: number,
    @Body('room') room: number,
  ): Promise<any> {
    console.log(pageID);
    console.log(room);
    return this.service.getAllByPage(pageID, room);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  createClient(@Body() req: ChatMessage) {
    const newClient = plainToInstance(ChatMessage, req);
    return this.service.create(newClient);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  updateClient(@Param('id') id: number, @Body() req: ChatMessage) {
    const newClient = plainToInstance(ChatMessage, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  @Roles(Role.USER, Role.ADMIN)
  async deleteClient(@Param('id') id: number) {
    const images = await this.service.getSome(id);
    images.imageMessageTables.forEach(async (element) => {
      await fs.unlink(
        process.cwd() + '/files/message/' + element?.path,
        (err) => {
          if (err) {
            console.error(err);
            return err;
          }
        },
      );
    });
    return this.service.delete(id);
  }
}
