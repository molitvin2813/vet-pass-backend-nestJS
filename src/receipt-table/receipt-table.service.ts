import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { MaterialTable } from 'src/entities/MaterialTable';
import { ReceiptTable } from 'src/entities/ReceiptTable';
import { ServiceTable } from 'src/entities/ServiceTable';
import { Repository } from 'typeorm';

@Injectable()
export class ReceiptTableService {
  constructor(
    @InjectRepository(ReceiptTable)
    private repository: Repository<ReceiptTable>,
  ) {}

  async getAllReceipts() {
    return await this.repository
      .createQueryBuilder('receipt_table')
      .leftJoinAndSelect('receipt_table.listServiceTables', 'listServiceTables')
      .leftJoinAndMapMany(
        'receipt_table.serviceTable',
        ServiceTable,
        'service',
        'service.idserviceListTable = listServiceTables.idService',
      )
      .leftJoinAndSelect(
        'receipt_table.listMaterialTables',
        'listMaterialTables',
      )
      .leftJoinAndMapMany(
        'receipt_table.materialTable',
        MaterialTable,
        'material',
        'material.idmaterialListTable = listMaterialTables.idMaterial',
      )
      .getMany();
  }

  async getReceipt(id: number) {
    return await this.repository
      .createQueryBuilder('receipt_table')
      .leftJoinAndSelect('receipt_table.listServiceTables', 'listServiceTables')
      .leftJoinAndMapMany(
        'receipt_table.service_table',
        ServiceTable,
        'service',
        'service.idserviceListTable = listServiceTables.idService',
      )
      .leftJoinAndSelect(
        'receipt_table.listMaterialTables',
        'listMaterialTables',
      )
      .leftJoinAndMapMany(
        'receipt_table.materialTable',
        MaterialTable,
        'material',
        'material.idmaterialListTable = listMaterialTables.idMaterial',
      )
      .where('receipt_table.idReceipt = :idReceipt', { idReceipt: id })

      .getMany();
  }

  async createReceipt(newReceipt: ReceiptTable): Promise<boolean> {
    this.repository.insert(newReceipt);
    return true;
  }

  async updateReceipt(id: number, newVar: ReceiptTable) {
    const forUpdate = await this.repository.findOneBy({
      idReceipt: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, newVar);
      return true;
    }
    return false;
  }

  async deleteReceipt(id: number) {
    const forRemove = await this.repository.findOneBy({
      idReceipt: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
