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
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { LogTable } from 'src/entities/LogTable';

import { LogTableService } from './log-table.service';
@Controller('log-table')
export class LogTableController {
  constructor(private service: LogTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getLog() {
    return this.service.getLog();
  }

  @Post('/date')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getSomeLogByDate(@Body() req: DateBetween) {
    return this.service.getSomeLogByDate(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getServiceList(@Param('id') id: number) {
    return this.service.getSomeLog(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteServiceList(@Param('id') id: number) {
    return this.service.deleteLog(id);
  }
}
