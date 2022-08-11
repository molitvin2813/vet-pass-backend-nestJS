import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTable } from 'src/entities/ServiceTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ServiceTableService {
  constructor(
    @InjectRepository(ServiceTable)
    private ServiceTableRepository: Repository<ServiceTable>,
  ) {}

  async getServices(): Promise<ServiceTable[]> {
    return await this.ServiceTableRepository.createQueryBuilder('service_table')
      .select([
        'service_table.name',
        'service_table.cost',
        'service_table.comment',
        'service_table.idserviceListTable',
      ])
      .getMany();
  }

  async createService(newService: ServiceTable): Promise<InsertResult> {
   
    return  this.ServiceTableRepository.insert(newService);
  }

  async getSomeService(id: number): Promise<ServiceTable> {
    return await this.ServiceTableRepository.createQueryBuilder('service_table')
      .where('service_table.idserviceListTable = :idService', { idService: id })
      .select([
        'service_table.name',
        'service_table.cost',
        'service_table.comment',
        'service_table.idserviceListTable',
      ])
      .getOne();
  }

  async updateService(id: number, Service: ServiceTable) {
    const ServiceForUpdate = await this.ServiceTableRepository.findOneBy({
      idserviceListTable: id,
    });
    if (ServiceForUpdate != null) {
      await this.ServiceTableRepository.update(id, Service);
      return true;
    }
    return false;
  }

  async deleteService(id: number) {
    const ServiceForRemove = await this.ServiceTableRepository.findOneBy({
      idserviceListTable: id,
    });
    if (ServiceForRemove != null) {
      await this.ServiceTableRepository.remove(ServiceForRemove);
      return true;
    }
    return false;
  }
}
