import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionTable } from 'src/entities/PrescriptionTable';

import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionTableService {
  constructor(
    @InjectRepository(PrescriptionTable)
    private repository: Repository<PrescriptionTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('prescription_table')
      .select('prescription_table')
      .leftJoinAndSelect(
        'prescription_table.idTypePrescription2',
        'idTypePrescription2',
      )
      .orderBy('prescription_table.idPrescription', 'DESC')
      .take(10)
      .getMany();
  }

  async create(newClient: PrescriptionTable) {
    console.log(newClient);
    return this.repository.insert(newClient);
  }

  async getSomeByVisit(id: number): Promise<PrescriptionTable[]> {
    console.log(id);
    return await this.repository
      .createQueryBuilder('prescription_table')
      .select('prescription_table')
      .leftJoinAndSelect(
        'prescription_table.idTypePrescription2',
        'idTypePrescription2',
      )
      .where('prescription_table.idVisit = :idVisit', {
        idVisit: id,
      })
      .orderBy('prescription_table.idPrescription', 'DESC')
      .getMany();
  }

  async getSomeByAnimal(id: number): Promise<PrescriptionTable[]> {
    console.log(id);
    return await this.repository
      .createQueryBuilder('prescription_table')
      .select('prescription_table')
      .leftJoinAndSelect(
        'prescription_table.idTypePrescription2',
        'idTypePrescription2',
      )
      .leftJoin('prescription_table.idVisit2', 'idVisit2')
      .where('idVisit2.idAnimal = :idAnimal', {
        idAnimal: id,
      })
      .orderBy('prescription_table.idPrescription', 'DESC')
      .take(10)
      .getMany();
  }

  async update(id: number, message: PrescriptionTable) {
    const forUpdate = await this.repository.findOneBy({
      idPrescription: id,
    });
    console.log(message);
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idPrescription: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
