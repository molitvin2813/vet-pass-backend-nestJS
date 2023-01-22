import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeNews } from 'src/entities/TypeNews';

import { Repository } from 'typeorm';

@Injectable()
export class TypeNewsService {
  constructor(
    @InjectRepository(TypeNews)
    private repository: Repository<TypeNews>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('type_news')
      .select('type_news')
      .orderBy('type_news.idTypeNews', 'ASC')
      .getMany();
  }

  async create(newClient: TypeNews) {
    return this.repository.insert(newClient);
  }

  async getSome(id: number): Promise<TypeNews> {
    return await this.repository
      .createQueryBuilder('type_news')
      .select('type_news')
      .where('type_news.idTypeNews = :idTypeNews', { idTypeNews: id })
      .getOne();
  }

  async update(id: number, message: TypeNews) {
    const forUpdate = await this.repository.findOneBy({
      idTypeNews: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idTypeNews: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
