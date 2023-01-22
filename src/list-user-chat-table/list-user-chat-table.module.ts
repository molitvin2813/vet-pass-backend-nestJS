import { Module } from '@nestjs/common';
import { ListUserChatTableService } from './list-user-chat-table.service';
import { ListUserChatTableController } from './list-user-chat-table.controller';
import { ListUserChatTable } from 'src/entities/ListUserChatTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ListUserChatTable])],
  providers: [ListUserChatTableService],
  controllers: [ListUserChatTableController],
})
export class ListUserChatTableModule {}
