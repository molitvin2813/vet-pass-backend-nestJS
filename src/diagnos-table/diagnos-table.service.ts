import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosTable } from 'src/entities/DiagnosTable';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosTableService {
  constructor(
    @InjectRepository(DiagnosTable)
    private repository: Repository<DiagnosTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('diagnos_table')
      .select('diagnos_table')
      .orderBy('diagnos_table.idDiagnos', 'DESC')
      .getMany();
  }

  async create(newClient: DiagnosTable) {
    return this.repository.insert(newClient);
  }

  async getSome(id: number): Promise<DiagnosTable> {
    return await this.repository
      .createQueryBuilder('diagnos_table')
      .where('diagnos_table.idDiagnos = :idDiagnos', { idDiagnos: id })
      .select(['diagnos_table.idDiagnos', 'diagnos_table.diagnos'])
      .getOne();
  }

  async update(id: number, client: DiagnosTable) {
    const forUpdate = await this.repository.findOneBy({
      idDiagnos: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, client);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idDiagnos: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
