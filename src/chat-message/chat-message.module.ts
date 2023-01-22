import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessage } from 'src/entities/ChatMessage';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatMessageService],
  controllers: [ChatMessageController],
})
export class ChatMessageModule {}
