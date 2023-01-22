import { Module } from '@nestjs/common';
import { PrescriptionTableService } from './prescription-table.service';
import { PrescriptionTableController } from './prescription-table.controller';
import { PrescriptionTable } from 'src/entities/PrescriptionTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionTable])],
  providers: [PrescriptionTableService],
  controllers: [PrescriptionTableController],
})
export class PrescriptionTableModule {}
