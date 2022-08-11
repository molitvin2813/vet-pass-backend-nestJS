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
import { ReceiptTable } from 'src/entities/ReceiptTable';

import { ReceiptTableService } from './receipt-table.service';

@Controller('receipt')
export class ReceiptTableController {
  constructor(private service: ReceiptTableService) {}

  @Get()
  getAllReceipts() {
    return this.service.getAllReceipts();
  }

  @Get(':id')
  getSomeReceipt(@Param('id') id: number) {
    return this.service.getReceipt(id);
  }

  @Post()
  postSomeReceipt(@Body() req: ReceiptTable) {
    const newVar = plainToInstance(ReceiptTable, req);
    return this.service.createReceipt(newVar);
  }

  @Put(':id')
  updateReceipt(@Param('id') id: number, @Body() req: ReceiptTable) {
    const newVar = plainToInstance(ReceiptTable, req);
    return this.service.updateReceipt(id, newVar);
  }

  @Delete(':id')
  deleteReceipt(@Param('id') id: number) {
    return this.service.deleteReceipt(id);
  }
}
