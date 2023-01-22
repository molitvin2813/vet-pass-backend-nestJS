import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { NewsTable } from 'src/entities/NewsTable';
import { DateBetween, DateBetweenVisit } from 'src/DTO/dateBetween-dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsTable)
    private repository: Repository<NewsTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('news_table')
      .select('news_table')
      .leftJoinAndSelect('news_table.idNewsType2', 'type')
      .leftJoinAndSelect('news_table.imageNewsTables', 'image')
      //.take(1)
      //.skip(3)
      .orderBy('news_table.idNews', 'DESC')
      .getMany();
  }

  async getAllByPage(page: number) {
    return await this.repository
      .createQueryBuilder('news_table')
      .select('news_table')
      .leftJoinAndSelect('news_table.idNewsType2', 'type')
      .leftJoinAndSelect('news_table.imageNewsTables', 'image')
      .take(5)
      .skip(page * 5)
      .orderBy('news_table.idNews', 'DESC')
      .getMany();
  }

  async getVisitsByDate(req: DateBetween) {
    return await this.repository
      .createQueryBuilder('news_table')
      .select('news_table')
      .leftJoinAndSelect('news_table.idNewsType2', 'type')
      .leftJoinAndSelect('news_table.imageNewsTables', 'image')
      .where('news_table.dateCreated > :startDate', {
        startDate: req.startDate,
      })
      .andWhere('news_table.dateCreated < :endDate', { endDate: req.endDate })
      .orderBy('news_table.idNews', 'DESC')
      .getMany();
  }

  async getAllByPageAndByCategory(page: number, idType: number) {
    return await this.repository
      .createQueryBuilder('news_table')
      .select('news_table')
      .leftJoinAndSelect('news_table.idNewsType2', 'type')
      .leftJoinAndSelect('news_table.imageNewsTables', 'image')
      .where('news_table.idNewsType = :idNewsType', { idNewsType: idType })
      .take(5)
      .skip(page * 5)
      .orderBy('news_table.idNews', 'DESC')
      .getMany();
  }

  async create(newClient: NewsTable) {
    return this.repository.save(newClient);
  }

  async getSome(id: number): Promise<NewsTable> {
    return await this.repository
      .createQueryBuilder('news_table')
      .select('news_table')
      .leftJoinAndSelect('news_table.idNewsType2', 'type')
      .leftJoinAndSelect('news_table.imageNewsTables', 'image')
      .where('news_table.idNews = :idNews', { idNews: id })
      .getOne();
  }

  async update(id: number, message: NewsTable) {
    const forUpdate = await this.repository.findOneBy({
      idNews: id,
    });
    if (forUpdate != null) {
      console.log(message);
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idNews: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
