import { Module } from '@nestjs/common';
import { ImageTableService } from './image-table.service';
import { ImageTableController } from './image-table.controller';
import { ImageTable } from 'src/entities/ImageTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImageTable])],
  providers: [ImageTableService],
  controllers: [ImageTableController],
})
export class ImageTableModule {}
