import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoom } from 'src/entities/ChatRoom';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatRoomService],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
