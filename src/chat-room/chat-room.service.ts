import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entities/ChatRoom';

import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private repository: Repository<ChatRoom>,
  ) {}

  async getAllChatRoom() {
    return await this.repository
      .createQueryBuilder('chat_room')
      .select('chat_room')
      .orderBy('chat_room.lastMessageDate', 'DESC')
      .getMany();
  }

  async getAllByDoctor(id: number) {
    console.log(id);
    return await this.repository
      .createQueryBuilder('chat_room')
      .select('chat_room')
      .where('idDoctor2.iddoctorTable = :iddoctorTable', { iddoctorTable: id })
      .orderBy('chat_room.lastMessageDate', 'DESC')
      .getMany();
  }

  async create(newClient: ChatRoom) {
    return this.repository.insert(newClient);
  }

  async getSome(id: number): Promise<ChatRoom[]> {
    return await this.repository
      .createQueryBuilder('chat_room')
      .select('chat_room')
      .where('idClient2.idClient = :idClient', { idClient: id })
      .getMany();
  }

  async update(id: number, message: ChatRoom) {
    const forUpdate = await this.repository.findOneBy({
      idChatRoom: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idChatRoom: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
