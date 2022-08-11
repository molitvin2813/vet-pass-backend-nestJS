import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageTable } from 'src/entities/StorageTable';
import { StorageTableController } from './storage-table.controller';
import { StorageTableService } from './storage-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([StorageTable])],
  providers: [StorageTableService],
  controllers: [StorageTableController],
})
export class StorageTableModule {}
