import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageNewsTable } from 'src/entities/ImageNewsTable';

import { Repository } from 'typeorm';

@Injectable()
export class ImageNewsService {
  constructor(
    @InjectRepository(ImageNewsTable)
    private repository: Repository<ImageNewsTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('image_news_table')
      .select('image_news_table')
      .orderBy('image_news_table.idImageNews', 'ASC')
      .getMany();
  }

  async create(newClient: ImageNewsTable) {
    return this.repository.save(newClient);
  }

  async getSome(id: number): Promise<ImageNewsTable> {
    return await this.repository
      .createQueryBuilder('image_news_table')
      .select('image_news_table')
      .where('image_news_table.idImageNews = :idImageNews', { idImageNews: id })
      .getOne();
  }

  async getSomeImageByNewsID(id: number): Promise<ImageNewsTable[]> {
    return await this.repository
      .createQueryBuilder('image_news_table')
      .select('image_news_table')
      .where('image_news_table.idNews = :idNews', { idNews: id })
      .getMany();
  }

  async update(id: number, message: ImageNewsTable) {
    const forUpdate = await this.repository.findOneBy({
      idImageNews: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idImageNews: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
