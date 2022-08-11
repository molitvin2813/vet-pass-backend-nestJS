import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTable } from 'src/entities/AnimalTable';
import { AnimalTableService } from './animal-table.service';
import { AnimalTableController } from './animal-table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTable])],
  providers: [AnimalTableService],
  controllers: [AnimalTableController],
})
export class AnimalTableModule {}
