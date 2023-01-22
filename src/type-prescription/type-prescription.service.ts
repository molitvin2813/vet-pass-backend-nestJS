import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypePrescriptionTable } from 'src/entities/TypePrescriptionTable';

import { Repository } from 'typeorm';

@Injectable()
export class TypePrescriptionService {
  constructor(
    @InjectRepository(TypePrescriptionTable)
    private repository: Repository<TypePrescriptionTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('type_prescription_table')
      .select('type_prescription_table')
      .orderBy('type_prescription_table.idTypePrescription', 'ASC')
      .getMany();
  }

  async create(newClient: TypePrescriptionTable) {
    return this.repository.insert(newClient);
  }

  async getSome(id: number): Promise<TypePrescriptionTable> {
    return await this.repository
      .createQueryBuilder('type_prescription_table')
      .select('type_prescription_table')
      .where(
        'type_prescription_table.idTypePrescription = :idTypePrescription',
        { idTypePrescription: id },
      )
      .getOne();
  }

  async update(id: number, message: TypePrescriptionTable) {
    const forUpdate = await this.repository.findOneBy({
      idTypePrescription: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idTypePrescription: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
