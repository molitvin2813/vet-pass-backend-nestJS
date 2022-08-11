import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorTable } from 'src/entities/DoctorTable';
import { DoctorTableController } from './doctor-table.controller';
import { DoctorTableService } from './doctor-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorTable])],
  providers: [DoctorTableService],
  controllers: [DoctorTableController],
})
export class DoctorTableModule {}
