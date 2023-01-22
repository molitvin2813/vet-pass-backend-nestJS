import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ChatMessage } from 'src/entities/ChatMessage';
import { ClientTable } from 'src/entities/ClientTable';
import { DoctorTable } from 'src/entities/DoctorTable';
import { ImageMessageTable } from 'src/entities/ImageMessageTable';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private repository: Repository<ChatMessage>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect('chat_message.idClient2', 'idClient2')
      .leftJoinAndSelect('chat_message.idDoctor2', 'idDoctor2')
      .select('chat_message')
      .leftJoinAndSelect(
        'chat_message.imageMessageTables',
        'imageMessageTables',
      )
      .addSelect([
        'idClient2.fio',
        'idClient2.idClient',
        'idDoctor2.fio',
        'idDoctor2.iddoctorTable',
      ])
      .orderBy('chat_message.id_message', 'DESC')
      .getMany();
  }

  async getAllByPage(page: number, roomID: number): Promise<any> {
    return await this.repository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect('chat_message.idClient2', 'idClient2')
      .leftJoinAndSelect('chat_message.idDoctor2', 'idDoctor2')
      .select('chat_message')
      .leftJoinAndSelect(
        'chat_message.imageMessageTables',
        'imageMessageTables',
      )
      .addSelect([
        'idClient2.fio',
        'idClient2.idClient',
        'idDoctor2.fio',
        'idDoctor2.iddoctorTable',
      ])
      .limit(10)
      .offset(page * 10)
      .where('chat_message.idChatRoom = :idChatRoom', { idChatRoom: roomID })
      .orderBy('chat_message.dateCreated', 'DESC')
      .getMany();
  }

  async create(newClient: ChatMessage) {
    return this.repository.save(newClient);
  }

  async getLast() {
    return await this.repository
      .createQueryBuilder('chat_message')
      .select(['chat_message.dateCreated', 'chat_message.idChatRoom'])
      .orderBy('chat_message.dateCreated', 'DESC')
      .groupBy('chat_message.idChatRoom')
      .getMany();
  }

  async getSome(id: number): Promise<ChatMessage> {
    return await this.repository
      .createQueryBuilder('chat_message')
      .leftJoinAndSelect(
        'chat_message.imageMessageTables',
        'imageMessageTables',
      )
      .where('chat_message.idMessage = :idMessage', { idMessage: id })
      .getOne();
  }

  async update(id: number, message: ChatMessage) {
    const forUpdate = await this.repository.findOneBy({
      idMessage: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idMessage: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
