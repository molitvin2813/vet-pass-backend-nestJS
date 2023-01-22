import { Module } from '@nestjs/common';
import { ListDoctorChatTableService } from './list-doctor-chat-table.service';
import { ListDoctorChatTableController } from './list-doctor-chat-table.controller';
import { ListDoctorChatTable } from 'src/entities/ListDoctorChatTable';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ListDoctorChatTable])],
  providers: [ListDoctorChatTableService],
  controllers: [ListDoctorChatTableController],
})
export class ListDoctorChatTableModule {}
