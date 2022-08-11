import { Module } from '@nestjs/common';
import { ListMaterialTableService } from './list-material-table.service';
import { ListMaterialTableController } from './list-material-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListMaterialTable } from 'src/entities/ListMaterialTable';

@Module({
  imports: [TypeOrmModule.forFeature([ListMaterialTable])],
  providers: [ListMaterialTableService],
  controllers: [ListMaterialTableController],
})
export class ListMaterialTableModule {}
