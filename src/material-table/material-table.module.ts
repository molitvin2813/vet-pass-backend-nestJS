import { Module } from '@nestjs/common';
import { MaterialTableService } from './material-table.service';
import { MaterialTableController } from './material-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialTable } from 'src/entities/MaterialTable';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialTable])],
  providers: [MaterialTableService],
  controllers: [MaterialTableController],
})
export class MaterialTableModule {}
