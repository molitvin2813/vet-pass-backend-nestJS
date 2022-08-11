import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientTable } from 'src/entities/ClientTable';
import { ClientTableController } from './client-table.controller';
import { ClientTableService } from './client-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientTable])],
  providers: [ClientTableService],
  controllers: [ClientTableController],
})
export class ClientTableModule {}
