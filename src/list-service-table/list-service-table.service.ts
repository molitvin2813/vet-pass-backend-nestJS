import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ListServiceTable } from 'src/entities/ListServiceTable';
import { Repository } from 'typeorm';

@Injectable()
export class ListServiceTableService {
  constructor(
    @InjectRepository(ListServiceTable)
    private repository: Repository<ListServiceTable>,
  ) {}

  async getServiceList(id: number): Promise<ListServiceTable[]> {
    return await this.repository
      .createQueryBuilder('list_service_table')
      .leftJoinAndSelect('list_service_table.idService2', 'service')
      .where('list_service_table.idReceipt2 = :idReceipt', { idReceipt: id })

      .getMany();
  }

  async createServiceList(service: ListServiceTable) {

    return await this.repository.save(service);
  }

  async updateServiceList(id: number, service: ListServiceTable) {
    const materialForUpdate = await this.repository.findOneBy({
      idListService: id,
    });
    if (materialForUpdate != null) {
      await this.repository.update(id, service);
      return true;
    }
    return false;
  }

  async deleteServiceList(id: number) {
    const forRemove = await this.repository.findOneBy({
      idListService: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
