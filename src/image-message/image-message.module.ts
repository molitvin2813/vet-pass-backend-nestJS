import { Module } from '@nestjs/common';
import { ImageMessageService } from './image-message.service';
import { ImageMessageController } from './image-message.controller';
import { ImageMessageTable } from 'src/entities/ImageMessageTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImageMessageTable])],
  providers: [ImageMessageService],
  controllers: [ImageMessageController],
})
export class ImageMessageModule {}
