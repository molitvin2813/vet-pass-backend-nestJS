import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { VisitTable } from 'src/entities/VisitTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class VisitTableService {
  constructor(
    @InjectRepository(VisitTable)
    private repository: Repository<VisitTable>,
  ) {}

  async getVisits(): Promise<VisitTable[]> {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')

      .select([
        'visit_table.name',
        'visit_table.anamnesis',
        'visit_table.diagnosis',
        'visit_table.visitTime',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect(['doctor.iddoctorTable', 'doctor.fio'])
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .getMany();
  }

  async createVisit(newVisit: VisitTable): Promise<InsertResult> {
    return this.repository.insert(newVisit);
  }

  async getSomeVisit(id: number): Promise<VisitTable> {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .select([
        'visit_table.name',
        'visit_table.diagnosis',
        'visit_table.anamnesis',
        'visit_table.visitTime',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect(['doctor.iddoctorTable', 'doctor.fio'])
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .where('visit_table.idvisitTable = :idvisitTable', { idvisitTable: id })
      .getOne();
  }

  async getVisitsByDoctorId(id: number) {
    console.log(id + 'ssss');
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .select([
        'visit_table.name',
        'visit_table.idvisitTable',
        'visit_table.anamnesis',
        'visit_table.diagnosis',
        'visit_table.visitTime',
        'visit_table.time',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect(['doctor.iddoctorTable', 'doctor.fio'])
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .where('doctor.iddoctorTable = :iddoctorTable', { iddoctorTable: id })
      .andWhere('visit_table.visitTime = :visitTime', {
        visitTime: '2022-07-30',
      })
      .getMany();
  }

  async getSumByTime(date: string) {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .select(['visit_table.idvisitTable'])
      .addSelect(['receipt.sum'])
      .select('SUM(receipt.sum)', 'sum')
      .where('visit_table.visitTime = :visitTime', {
        visitTime: date,
      })
      .getRawOne();
  }

  async updateVisit(id: number, visit: VisitTable) {
    const VisitForUpdate = await this.repository.findOneBy({
      idvisitTable: id,
    });
    if (VisitForUpdate != null) {
      await this.repository.update(id, visit);
      return await this.repository.update(id, visit);
    }
  }

  async deleteVisit(id: number) {
    const VisitForRemove = await this.repository.findOneBy({
      idvisitTable: id,
    });
    if (VisitForRemove != null) {
      await this.repository.remove(VisitForRemove);
      return true;
    }
    return false;
  }
}
