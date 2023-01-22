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
import { ReceiptTable } from 'src/entities/ReceiptTable';

import { ReceiptTableService } from './receipt-table.service';

@Controller('receipt')
export class ReceiptTableController {
  constructor(private service: ReceiptTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllReceipts() {
    return this.service.getAllReceipts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeReceipt(@Param('id') id: number) {
    return this.service.getReceipt(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  postSomeReceipt(@Body() req: ReceiptTable) {
    const newVar = plainToInstance(ReceiptTable, req);
    return this.service.createReceipt(newVar);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateReceipt(@Param('id') id: number, @Body() req: ReceiptTable) {
    const newVar = plainToInstance(ReceiptTable, req);
    return this.service.updateReceipt(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  deleteReceipt(@Param('id') id: number) {
    return this.service.deleteReceipt(id);
  }
}
