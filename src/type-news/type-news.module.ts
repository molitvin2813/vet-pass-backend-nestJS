import { Module } from '@nestjs/common';
import { TypeNewsService } from './type-news.service';
import { TypeNewsController } from './type-news.controller';
import { TypeNews } from 'src/entities/TypeNews';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeNews])],
  providers: [TypeNewsService],
  controllers: [TypeNewsController],
})
export class TypeNewsModule {}
