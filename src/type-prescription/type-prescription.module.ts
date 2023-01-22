import { Module } from '@nestjs/common';
import { TypePrescriptionService } from './type-prescription.service';
import { TypePrescriptionController } from './type-prescription.controller';
import { TypePrescriptionTable } from 'src/entities/TypePrescriptionTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypePrescriptionTable])],
  providers: [TypePrescriptionService],
  controllers: [TypePrescriptionController],
})
export class TypePrescriptionModule {}
