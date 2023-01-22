import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { ListMaterialTable } from 'src/entities/ListMaterialTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ListMaterialTableService {
  constructor(
    @InjectRepository(ListMaterialTable)
    private repository: Repository<ListMaterialTable>,
  ) {}

  async getAllMaterial() {
    return await this.repository
      .createQueryBuilder('list_material_table')
      .leftJoinAndSelect('list_material_table.idMaterial2', 'material')
      .leftJoinAndSelect('list_material_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('receipt.visitTable', 'visit')
      .leftJoin('visit.idDoctor2', 'doctor')
      .addSelect('doctor.fio')
      .getMany();
  }

  async getAllMaterialByDate(date: DateBetween) {
    return await this.repository
      .createQueryBuilder('list_material_table')
      .leftJoinAndSelect('list_material_table.idMaterial2', 'material')
      .leftJoinAndSelect('list_material_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('receipt.visitTable', 'visit')
      .leftJoin('visit.idDoctor2', 'doctor')
      .addSelect('doctor.fio')
      .where('receipt.date > :startDate', { startDate: date.startDate })
      .andWhere('receipt.date < :endDate', { endDate: date.endDate })
      .getMany();
  }
  async getMaterialList(id: number): Promise<ListMaterialTable[]> {
    return await this.repository
      .createQueryBuilder('list_material_table')
      .leftJoinAndSelect('list_material_table.idMaterial2', 'material')
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
    console.log('ssdfdsfafdf');
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
