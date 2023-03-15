import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ListDoctorChatTable } from 'src/entities/ListDoctorChatTable';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListDoctorChatTableService {
  constructor(
    @InjectRepository(ListDoctorChatTable)
    private repository: Repository<ListDoctorChatTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('list_doctor_chat_table')
      .select('list_doctor_chat_table')
      .leftJoinAndSelect('list_doctor_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_doctor_chat_table.idDoctor2', 'idDoctor2')
      .getMany();
  }

  async create(newClient: ListDoctorChatTable) {
    const count = await this.repository.findAndCount({
      where: { idChatRoom: newClient.idChatRoom, idDoctor: newClient.idDoctor },
    });
    if (count[1] == 0) return this.repository.insert(newClient);
    else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getSomeByRoom(id: number): Promise<ListDoctorChatTable[]> {
    return await this.repository
      .createQueryBuilder('list_doctor_chat_table')
      .select('list_doctor_chat_table')
      .leftJoinAndSelect('list_doctor_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_doctor_chat_table.idDoctor2', 'idDoctor2')
      .where('list_doctor_chat_table.idChatRoom = :idChatRoom', {
        idChatRoom: id,
      })
      .getMany();
  }

  async getSomeByDoctor(id: number): Promise<ListDoctorChatTable[]> {
    return await this.repository
      .createQueryBuilder('list_doctor_chat_table')
      .select('list_doctor_chat_table')
      .leftJoinAndSelect('list_doctor_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_doctor_chat_table.idDoctor2', 'idDoctor2')
      .where('list_doctor_chat_table.idDoctor = :idDoctor', {
        idDoctor: id,
      })
      .getMany();
  }

  async getCountUnread(id: number): Promise<number> {
    return await this.repository
      .createQueryBuilder('list_doctor_chat_table')
      .select('list_doctor_chat_table')
      .leftJoinAndSelect('list_doctor_chat_table.idChatRoom2', 'idChatRoom2')
      .leftJoinAndSelect('list_doctor_chat_table.idDoctor2', 'idDoctor2')
      .where('list_doctor_chat_table.idDoctor = :idDoctor', {
        idDoctor: id,
      })
      .andWhere(
        'list_doctor_chat_table.countUnreadMessages =:countUnreadMessages',
        {
          countUnreadMessages: 1,
        },
      )
      .getCount();
  }

  async update(id: number, message: ListDoctorChatTable) {
    const forUpdate = await this.repository.findOneBy({
      idListDoctorChat: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idListDoctorChat: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
