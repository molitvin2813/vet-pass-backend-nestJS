import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ClientTable } from 'src/entities/ClientTable';
import { Repository } from 'typeorm';

@Injectable()
export class ClientTableService {
  constructor(
    @InjectRepository(ClientTable)
    private ClientRepository: Repository<ClientTable>,
  ) {}

  async getAllClients() {
    return await this.ClientRepository.createQueryBuilder('client_table')
      .select([
        'client_table.idClient',
        'client_table.fio',
        'client_table.email',
        'client_table.phone',
        'client_table.comment',
        'client_table.login',
      ])
      .getMany();
  }

  async createClient(newClient: ClientTable): Promise<boolean> {
    this.ClientRepository.insert(newClient);
    return true;
  }

  async getSomeClient(id: number): Promise<ClientTable> {
    return await this.ClientRepository.createQueryBuilder('client_table')
      .where('client_table.idClient = :idClient', { idClient: id })
      .select([
        'client_table.idClient',
        'client_table.fio',
        'client_table.email',
        'client_table.phone',
        'client_table.comment',
        'client_table.login',
      ])
      .getOne();
  }

  async updateClient(id: number, client: ClientTable) {
    const ClientForUpdate = await this.ClientRepository.findOneBy({
      idClient: id,
    });
    if (ClientForUpdate != null) {
      await this.ClientRepository.update(id, client);
      return true;
    }
    return false;
  }

  async deleteClient(id: number) {
    const ClientForRemove = await this.ClientRepository.findOneBy({
      idClient: id,
    });
    if (ClientForRemove != null) {
      await this.ClientRepository.remove(ClientForRemove);
      return true;
    }
    return false;
  }
}
