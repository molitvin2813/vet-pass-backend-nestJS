import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ServiceTable } from 'src/entities/ServiceTable';
import { ServiceTableController } from './service-table.controller';
import { ServiceTableService } from './service-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTable]), AuthModule],
  providers: [ServiceTableService],
  controllers: [ServiceTableController],
})
export class ServiceTableModule {}
