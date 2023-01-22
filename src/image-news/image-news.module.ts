import { Module } from '@nestjs/common';
import { ImageNewsService } from './image-news.service';
import { ImageNewsController } from './image-news.controller';
import { ImageNewsTable } from 'src/entities/ImageNewsTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImageNewsTable])],
  providers: [ImageNewsService],
  controllers: [ImageNewsController],
})
export class ImageNewsModule {}
