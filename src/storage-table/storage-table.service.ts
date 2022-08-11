import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { StorageTable } from 'src/entities/StorageTable';
import { Repository } from 'typeorm';

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
      .select([
        'storage_table.count',
        'storage_table.receipt_date',
        'storage_table.idMaterial',
        'storage_table.receiptDate',
      ])
      .addSelect(['material.name', 'material.cost', 'material.expirationDate'])
      .getMany();
  }

  async getSomeStorage(id: number): Promise<StorageTable> {
    return await this.repository
      .createQueryBuilder('storage_table')
      .leftJoinAndSelect('storage_table.idMaterial2', 'material')
      .select([
        'storage_table.count',
        'storage_table.receipt_date',
        'storage_table.idMaterial',
        'storage_table.receiptDate',
      ])
      .where('storage_table.idStorageTable = :idStorageTable', {
        idStorageTable: id,
      })
      .addSelect(['material.name', 'material.cost', 'material.expirationDate'])
      .getOne();
  }

  async createStorage(storage: StorageTable): Promise<boolean> {
    this.repository.insert(storage);
    return true;
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
