import { Module } from '@nestjs/common';
import { ReceiptTableService } from './receipt-table.service';
import { ReceiptTableController } from './receipt-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptTable } from 'src/entities/ReceiptTable';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptTable])],
  providers: [ReceiptTableService],
  controllers: [ReceiptTableController],
})
export class ReceiptTableModule {}
