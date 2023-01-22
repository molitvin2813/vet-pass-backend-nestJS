import { Module } from '@nestjs/common';
import { LogTableService } from './log-table.service';
import { LogTableController } from './log-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogTable } from 'src/entities/LogTable';

@Module({
  imports: [TypeOrmModule.forFeature([LogTable])],
  providers: [LogTableService],
  controllers: [LogTableController],
})
export class LogTableModule {}
