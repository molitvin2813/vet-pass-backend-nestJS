import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { StorageTable } from 'src/entities/StorageTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class StorageTableService {
  constructor(
    @InjectRepository(StorageTable)
    private repository: Repository<StorageTable>,
  ) {}

  async getStorage(): Promise<StorageTable[]> {
    return await this.repository
      .createQueryBuilder('storage_table')
      .leftJoinAndSelect('storage_table.idMaterial2', 'material')
      .getMany();
  }

  async getAllStorageByDate(date: DateBetween) {
    return await this.repository
      .createQueryBuilder('storage_table')
      .leftJoinAndSelect('storage_table.idMaterial2', 'material')
      .where('storage_table.date > :startDate', { startDate: date.startDate })
      .andWhere('storage_table.date < :endDate', { endDate: date.endDate })
      .getMany();
  }
  async getSomeStorage(id: number): Promise<StorageTable> {
    return await this.repository
      .createQueryBuilder('storage_table')
      .leftJoinAndSelect('storage_table.idMaterial2', 'material')
      .where('storage_table.idStorageTable = :idStorageTable', {
        idStorageTable: id,
      })
      .getOne();
  }

  async createStorage(storage: StorageTable): Promise<InsertResult> {
    return this.repository.insert(storage);
  }

  async updateStorage(id: number, storage: StorageTable) {
    const storageForUpdate = await this.repository.findOneBy({
      idStorageTable: id,
    });
    if (storageForUpdate != null) {
      await this.repository.update(id, storage);
      return true;
    }
    return false;
  }

  async deleteStorage(id: number) {
    const storageForRemove = await this.repository.findOneBy({
      idStorageTable: id,
    });
    if (storageForRemove != null) {
      await this.repository.remove(storageForRemove);
      return true;
    }
    return false;
  }
}
