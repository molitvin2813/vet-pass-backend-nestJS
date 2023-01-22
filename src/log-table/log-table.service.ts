import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { LogTable } from 'src/entities/LogTable';
import { Repository } from 'typeorm';

@Injectable()
export class LogTableService {
  constructor(
    @InjectRepository(LogTable)
    private repository: Repository<LogTable>,
  ) {}

  async getLog(): Promise<LogTable[]> {
    return await this.repository
      .createQueryBuilder('log_table')
      .leftJoinAndSelect('log_table.idDoctor2', 'idDoctor2')
      .leftJoinAndSelect('log_table.idReceipt2', 'idReceipt2')
      .leftJoinAndSelect('log_table.idMaterial2', 'idMaterial2')
      .getMany();
  }

  async getSomeLogByDate(req: DateBetween) {
    return await this.repository
      .createQueryBuilder('log_table')
      .leftJoinAndSelect('log_table.idDoctor2', 'idDoctor2')
      .leftJoinAndSelect('log_table.idReceipt2', 'idReceipt2')
      .leftJoinAndSelect('log_table.idMaterial2', 'idMaterial2')
      .where('log_table.date > :startDate', { startDate: req.startDate })
      .andWhere('log_table.date < :endDate', { endDate: req.endDate })
      .getMany();
  }

  async getSomeLog(id: number): Promise<LogTable> {
    return await this.repository
      .createQueryBuilder('log_table')
      .leftJoinAndSelect('log_table.idDoctor2', 'idDoctor2')
      .leftJoinAndSelect('log_table.idReceipt2', 'idReceipt2')
      .leftJoinAndSelect('log_table.idMaterial2', 'idMaterial2')
      .where('log_table.idLog = :idLog', { idLog: id })
      .getOne();
  }

  async deleteLog(id: number) {
    const forRemove = await this.repository.findOneBy({
      idLog: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
