import { Module } from '@nestjs/common';
import { ListServiceTableService } from './list-service-table.service';
import { ListServiceTableController } from './list-service-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListServiceTable } from 'src/entities/ListServiceTable';

@Module({
  imports: [TypeOrmModule.forFeature([ListServiceTable])],
  providers: [ListServiceTableService],
  controllers: [ListServiceTableController],
})
export class ListServiceTableModule {}
