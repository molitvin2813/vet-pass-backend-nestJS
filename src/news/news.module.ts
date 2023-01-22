import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsTable } from 'src/entities/NewsTable';

@Module({
  imports: [TypeOrmModule.forFeature([NewsTable])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
