import { Module } from '@nestjs/common';
import { DiagnosTableService } from './diagnos-table.service';
import { DiagnosTableController } from './diagnos-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosTable } from 'src/entities/DiagnosTable';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosTable])],
  providers: [DiagnosTableService],
  controllers: [DiagnosTableController],
})
export class DiagnosTableModule {}
