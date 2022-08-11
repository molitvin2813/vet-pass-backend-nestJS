import { Module } from '@nestjs/common';
import { AnimalTypeTableService } from './animal-type-table.service';
import { AnimalTypeTableController } from './animal-type-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeTable } from 'src/entities/AnimalTypeTable';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTypeTable])],
  providers: [AnimalTypeTableService],
  controllers: [AnimalTypeTableController],
})
export class AnimalTypeTableModule {}
