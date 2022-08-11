import { Module } from '@nestjs/common';
import { VisitTable } from 'src/entities/VisitTable';
import { VisitTableController } from './visit-table.controller';
import { VisitTableService } from './visit-table.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VisitTable])],
  providers: [VisitTableService],
  controllers: [VisitTableController],
})
export class VisitTableModule {}
