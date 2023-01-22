import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DateDTO } from 'src/DTO/date-dto';
import { DateBetween, DateBetweenVisit } from 'src/DTO/dateBetween-dto';
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
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('animal.idClient2', 'client')
      .select([
        'visit_table.anamnesis',
        'visit_table.id_diagnosis',
        'visit_table.visitTime',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])

      .addSelect([
        'doctor.iddoctorTable',
        'doctor.fio',
        'animal.idAnimal',
        'animal.name',
        'animal.gender',
        'animal.isCastrated',
        'animal.weight',
        'animal.age',
        'animal.idType',
        'animal.idClient',
        'client.fio',
        'client.phone',
        'client.email',
      ])
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
      .getMany();
  }

  async getVisitsByDate(
    req: DateBetweenVisit,
    is_admin: string | string[],
    id_doctor: string | string[],
  ): Promise<VisitTable[]> {
    console.log(is_admin);
    if (is_admin === '1')
      return await this.repository
        .createQueryBuilder('visit_table')
        .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
        .leftJoinAndSelect('visit_table.idAnimal2', 'animal')

        .leftJoinAndSelect('animal.idClient2', 'client')
        .select([
          'visit_table.idvisitTable',
          'visit_table.anamnesis',
          'visit_table.id_diagnosis',
          'visit_table.visitTime',
          'visit_table.time',
          'visit_table.idReceipt',
          'visit_table.idAnimal',
          'visit_table.idDoctor',
          'visit_table.isCompleted',
        ])
        .addSelect([
          'doctor.iddoctorTable',
          'doctor.fio',
          'animal.idAnimal',
          'animal.name',
          'animal.gender',
          'animal.isCastrated',
          'animal.weight',
          'animal.age',
          'animal.idType',
          'animal.idClient',
          'client.fio',
          'client.phone',
          'client.email',
        ])
        .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
        .leftJoinAndSelect('animal.idType2', 'type')
        .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
        .where('visit_table.visitTime > :startDate', {
          startDate: req.startDate,
        })
        .andWhere('visit_table.visitTime < :endDate', { endDate: req.endDate })
        .andWhere('visit_table.isCompleted = :isCompleted', {
          isCompleted: req.isCompleted,
        })
        .orderBy('visit_table.visitTime', 'ASC')
        .addOrderBy('visit_table.time', 'ASC')
        .getMany();
    else if (is_admin === '0')
      return await this.repository
        .createQueryBuilder('visit_table')
        .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
        .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
        .leftJoinAndSelect('animal.idClient2', 'client')
        .select([
          'visit_table.idvisitTable',
          'visit_table.anamnesis',
          'visit_table.id_diagnosis',
          'visit_table.visitTime',
          'visit_table.time',
          'visit_table.idReceipt',
          'visit_table.idAnimal',
          'visit_table.idDoctor',
          'visit_table.isCompleted',
        ])
        .addSelect([
          'doctor.iddoctorTable',
          'doctor.fio',
          'animal.idAnimal',
          'animal.name',
          'animal.gender',
          'animal.isCastrated',
          'animal.weight',
          'animal.age',
          'animal.idType',
          'animal.idClient',
          'client.fio',
          'client.phone',
          'client.email',
        ])
        .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
        .leftJoinAndSelect('animal.idType2', 'type')
        .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
        .where('visit_table.visitTime > :startDate', {
          startDate: req.startDate,
        })
        .andWhere('visit_table.visitTime < :endDate', { endDate: req.endDate })
        .andWhere('visit_table.isCompleted = :isCompleted', {
          isCompleted: req.isCompleted,
        })
        .andWhere('visit_table.idDoctor = :idDoctor', {
          idDoctor: id_doctor,
        })
        .orderBy('visit_table.visitTime', 'ASC')
        .addOrderBy('visit_table.time', 'ASC')
        .getMany();
  }

  async getVisitsByDateAndByAnimal(
    req: DateBetweenVisit,
    id_animal: string | string[],
  ): Promise<VisitTable[]> {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')

      .leftJoinAndSelect('animal.idClient2', 'client')
      .select([
        'visit_table.idvisitTable',
        'visit_table.anamnesis',
        'visit_table.id_diagnosis',
        'visit_table.visitTime',
        'visit_table.time',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect([
        'doctor.iddoctorTable',
        'doctor.fio',
        'animal.idAnimal',
        'animal.name',
        'animal.gender',
        'animal.isCastrated',
        'animal.weight',
        'animal.age',
        'animal.idType',
        'animal.idClient',
        'client.fio',
        'client.phone',
        'client.email',
      ])
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('animal.idType2', 'type')
      .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
      .where('visit_table.visitTime > :startDate', {
        startDate: req.startDate,
      })
      .andWhere('visit_table.visitTime < :endDate', { endDate: req.endDate })
      .andWhere('visit_table.isCompleted = :isCompleted', {
        isCompleted: req.isCompleted,
      })
      .andWhere('visit_table.idAnimal = :idAnimal', { idAnimal: id_animal })
      .orderBy('visit_table.visitTime', 'ASC')
      .addOrderBy('visit_table.time', 'ASC')
      .getMany();
  }

  async getVisitsByAnimal(
    id_animal: number,
    isCompleted: number,
  ): Promise<VisitTable[]> {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('animal.idClient2', 'client')
      .select([
        'visit_table.idvisitTable',
        'visit_table.anamnesis',
        'visit_table.id_diagnosis',
        'visit_table.visitTime',
        'visit_table.time',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect([
        'doctor.iddoctorTable',
        'doctor.fio',
        'animal.idAnimal',
        'animal.name',
        'animal.gender',
        'animal.isCastrated',
        'animal.weight',
        'animal.age',
        'animal.idType',
        'animal.idClient',
        'client.fio',
        'client.phone',
        'client.email',
      ])
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('animal.idType2', 'type')
      .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
      .where('visit_table.isCompleted = :isCompleted', {
        isCompleted: isCompleted,
      })
      .andWhere('visit_table.idAnimal = :idAnimal', { idAnimal: id_animal })
      .orderBy('visit_table.visitTime', 'ASC')
      .addOrderBy('visit_table.time', 'ASC')
      .getMany();
  }

  async getVisitsByDateAndByClient(
    req: DateBetweenVisit,
    id_client: string | string[],
  ): Promise<VisitTable[]> {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')

      .leftJoinAndSelect('animal.idClient2', 'client')
      .select([
        'visit_table.idvisitTable',
        'visit_table.anamnesis',
        'visit_table.id_diagnosis',
        'visit_table.visitTime',
        'visit_table.time',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect([
        'doctor.iddoctorTable',
        'doctor.fio',
        'animal.idAnimal',
        'animal.name',
        'animal.gender',
        'animal.isCastrated',
        'animal.weight',
        'animal.age',
        'animal.idType',
        'animal.idClient',
        'client.fio',
        'client.phone',
        'client.email',
      ])
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('animal.idType2', 'type')
      .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
      .where('visit_table.visitTime > :startDate', {
        startDate: req.startDate,
      })
      .andWhere('visit_table.visitTime < :endDate', { endDate: req.endDate })
      .andWhere('visit_table.isCompleted = :isCompleted', {
        isCompleted: req.isCompleted,
      })
      .andWhere('animal.idClient = :idClient', { idClient: id_client })
      .orderBy('visit_table.visitTime', 'ASC')
      .addOrderBy('visit_table.time', 'ASC')
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
        'visit_table.id_diagnosis',
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

  async getVisitsByDoctorId(id: number, date: DateDTO) {
    console.log(date.date + 'ssss');
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idDoctor2', 'doctor')
      .leftJoinAndSelect('visit_table.idAnimal2', 'animal')
      .leftJoinAndSelect('animal.idClient2', 'client')
      .select([
        'visit_table.idvisitTable',
        'visit_table.anamnesis',
        'visit_table.id_diagnosis',
        'visit_table.visitTime',
        'visit_table.time',
        'visit_table.idReceipt',
        'visit_table.idAnimal',
        'visit_table.idDoctor',
        'visit_table.isCompleted',
      ])
      .addSelect(['doctor.iddoctorTable', 'doctor.fio', 'client.fio'])
      .addSelect('animal')
      .leftJoinAndSelect('animal.idType2', 'type')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .leftJoinAndSelect('visit_table.idDiagnosis2', 'diagnosis')
      .where('visit_table.idDoctor = :idDoctor', { idDoctor: id })
      .andWhere('visit_table.visitTime = :visitTime', {
        visitTime: date.date,
      })
      .orderBy('visit_table.time', 'ASC')
      .getMany();
  }

  /**
   * Метод возвращает сумму всех чеков за определенный период
   * @param date Дата
   * @returns Количество средств, поступивших за день
   */
  async getSumReceiptByDate(date: string) {
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

  async getSumByMonth(date: string) {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .select(['visit_table.idvisitTable'])
      .addSelect(['receipt.sum'])
      .select('SUM(receipt.sum)', 'sum')
      .where('visit_table.visitTime LIKE :visitTime', {
        visitTime: '%' + date + '%',
      })
      .getRawOne();
  }

  /**
   * Получаем суммы чеков за день
   * @param date Дата
   * @returns Суммы чеков за весь день
   */
  async getSumByDay(date: string) {
    return await this.repository
      .createQueryBuilder('visit_table')
      .leftJoinAndSelect('visit_table.idReceipt2', 'receipt')
      .select(['visit_table.idvisitTable', 'visit_table.time'])
      .addSelect(['receipt.sum'])
      .where('visit_table.visitTime = :visitTime', {
        visitTime: date,
      })
      .orderBy('visit_table.time', 'ASC')
      .getMany();
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
