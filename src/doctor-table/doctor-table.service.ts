import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorTable } from '../entities/DoctorTable';
import { DeepPartial, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DoctorTableService {
  constructor(
    @InjectRepository(DoctorTable)
    private doctorRepository: Repository<DoctorTable>,
  ) {}

  async getDoctor(): Promise<DoctorTable[]> {
    return await this.doctorRepository
      .createQueryBuilder('doctor_table')
      .select([
        'doctor_table.fio',
        'doctor_table.color',
        'doctor_table.iddoctorTable',
      ])
      .getMany();
  }

  async createDoctor(user: DeepPartial<DoctorTable>) {
    const newUser = plainToInstance(DoctorTable, user);
    await this.doctorRepository.insert(newUser);
  }

  async getSomeDoctor(id: number): Promise<DoctorTable> {
    return await this.doctorRepository
      .createQueryBuilder('doctor_table')
      .where('doctor_table.iddoctorTable = :idDoctor', { idDoctor: id })
      .select([
        'doctor_table.fio',
        'doctor_table.color',
        'doctor_table.login',
        'doctor_table.iddoctorTable',
      ])
      .getOne();
  }

  async getDoctorVisit(): Promise<DoctorTable[]> {
    console.log('sss');
    return await this.doctorRepository
      .createQueryBuilder('doctor_table')
      .select([
        'doctor_table.fio',
        'doctor_table.color',
        'doctor_table.iddoctorTable',
      ])
      .innerJoinAndSelect('doctor_table.visitTables', 'visitTables')
      .getMany();
  }

  async updateDoctor(id: number, Doctor: DoctorTable) {
    const DoctorForUpdate = await this.doctorRepository.findOneBy({
      iddoctorTable: id,
    });
    if (DoctorForUpdate != null) {
      const newUser = plainToInstance(DoctorTable, Doctor);
      await this.doctorRepository.update(id, newUser);
      return true;
    }
    return false;
  }

  async deleteDoctor(id: number) {
    const DoctorForRemove = await this.doctorRepository.findOneBy({
      iddoctorTable: id,
    });
    if (DoctorForRemove != null) {
      await this.doctorRepository.remove(DoctorForRemove);
      return true;
    }
    return false;
  }
}
