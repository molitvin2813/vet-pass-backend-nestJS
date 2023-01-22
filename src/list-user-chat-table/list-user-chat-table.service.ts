import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserChatTable } from 'src/entities/ListUserChatTable';
import { Repository } from 'typeorm';

@Injectable()
export class ListUserChatTableService {
  constructor(
    @InjectRepository(ListUserChatTable)
    private repository: Repository<ListUserChatTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('list_user_chat_table')
      .select('list_user_chat_table')
      .leftJoinAndSelect('list_user_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_user_chat_table.idClient2', 'idClient2')
      .getMany();
  }

  async create(newClient: ListUserChatTable) {
    return this.repository.insert(newClient);
  }

  async getSomeByRoom(id: number): Promise<ListUserChatTable[]> {
    return await this.repository
      .createQueryBuilder('list_user_chat_table')
      .select('list_user_chat_table')
      .leftJoinAndSelect('list_user_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_user_chat_table.idClient2', 'idClient2')
      .where('list_user_chat_table.idChatRoom = :idChatRoom', {
        idChatRoom: id,
      })
      .getMany();
  }

  async getCountUnread(id: number): Promise<number> {
    return await this.repository
      .createQueryBuilder('list_user_chat_table')
      .select('list_user_chat_table')
      .leftJoinAndSelect('list_user_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_user_chat_table.idClient2', 'idClient2')
      .where('list_user_chat_table.idClient = :idClient', {
        idClient: id,
      })
      .andWhere(
        'list_user_chat_table.countUnreadMessages =:countUnreadMessages',
        {
          countUnreadMessages: 1,
        },
      )
      .getCount();
  }

  async getSomeByClient(id: number): Promise<ListUserChatTable[]> {
    return await this.repository
      .createQueryBuilder('list_user_chat_table')
      .select('list_user_chat_table')
      .leftJoinAndSelect('list_user_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_user_chat_table.idClient2', 'idClient2')
      .where('list_user_chat_table.idClient = :idClient', {
        idClient: id,
      })
      .getMany();
  }

  async update(id: number, message: ListUserChatTable) {
    const forUpdate = await this.repository.findOneBy({
      idListUserChat: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idListUserChat: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
