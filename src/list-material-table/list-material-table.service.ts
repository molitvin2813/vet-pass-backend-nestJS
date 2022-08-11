import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListMaterialTable } from 'src/entities/ListMaterialTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ListMaterialTableService {
  constructor(
    @InjectRepository(ListMaterialTable)
    private repository: Repository<ListMaterialTable>,
  ) {}

  async getMaterialList(id: number): Promise<ListMaterialTable[]> {
    return await this.repository
      .createQueryBuilder('list_material_table')
      .leftJoinAndSelect('list_material_table.idMaterial2', 'service')
      .where('list_material_table.idReceipt2 = :idReceipt', {
        idReceipt: id,
      })

      .getMany();
  }

  async createMaterialList(service: ListMaterialTable) {
    return this.repository.save(service);
  }

  async updateMaterialList(id: number, service: ListMaterialTable) {
    const materialForUpdate = await this.repository.findOneBy({
      idListMaterial: id,
    });
    if (materialForUpdate != null) {
      await this.repository.update(id, service);
      return true;
    }
    return false;
  }

  async deleteMaterialList(id: number) {
    const forRemove = await this.repository.findOneBy({
      idListMaterial: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
