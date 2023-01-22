import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ImageMessageTable } from 'src/entities/ImageMessageTable';

@Injectable()
export class ImageMessageService {
  constructor(
    @InjectRepository(ImageMessageTable)
    private repository: Repository<ImageMessageTable>,
  ) {}

  async getAll() {
    return await this.repository
      .createQueryBuilder('image_news_table')
      .select('image_news_table')
      .orderBy('image_news_table.idImageNews', 'ASC')
      .getMany();
  }

  async create(newClient: ImageMessageTable) {
    return this.repository.save(newClient);
  }

  async getSome(id: number): Promise<ImageMessageTable> {
    return await this.repository
      .createQueryBuilder('image_news_table')
      .select('image_news_table')
      .where('image_news_table.idImageMessage = :idImageMessage', {
        idImageMessage: id,
      })
      .getOne();
  }

  async update(id: number, message: ImageMessageTable) {
    const forUpdate = await this.repository.findOneBy({
      idImageMessage: id,
    });
    if (forUpdate != null) {
      await this.repository.update(id, message);
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const forRemove = await this.repository.findOneBy({
      idImageMessage: id,
    });
    if (forRemove != null) {
      await this.repository.remove(forRemove);
      return true;
    }
    return false;
  }
}
