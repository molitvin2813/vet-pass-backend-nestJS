import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { MaterialTable } from 'src/entities/MaterialTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class MaterialTableService {
  constructor(
    @InjectRepository(MaterialTable)
    private repository: Repository<MaterialTable>,
  ) {}

  async getMaterial(): Promise<MaterialTable[]> {
    return await this.repository
      .createQueryBuilder('material_table')
      .select([
        'material_table.name',
        'material_table.cost',
        'material_table.dosage',
        'material_table.expirationDate',
        'material_table.idmaterialListTable',
      ])
      .getMany();
  }

  async getSomeMaterial(id: number): Promise<MaterialTable> {
    return await this.repository
      .createQueryBuilder('material_table')
      .select([
        'material_table.name',
        'material_table.cost',
        'material_table.dosage',
        'material_table.expirationDate',
        'material_table.idmaterialListTable',
      ])
      .where('material_table.idmaterialListTable = :idMaterialTable', {
        idMaterialTable: id,
      })
      .getOne();
  }

  async createStorage(material: MaterialTable): Promise<InsertResult> {
      return this.repository.insert(material);
  }

  async updateStorage(id: number, material: MaterialTable) {
    const materialForUpdate = await this.repository.findOneBy({
      idmaterialListTable: id,
    });
    if (materialForUpdate != null) {
      await this.repository.update(id, material);
      return true;
    }
    return false;
  }

  async deleteStorage(id: number) {
    const materialForRemove = await this.repository.findOneBy({
      idmaterialListTable: id,
    });
    if (materialForRemove != null) {
      await this.repository.remove(materialForRemove);
      return true;
    }
    return false;
  }
}
