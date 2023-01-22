import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ImageTable } from 'src/entities/ImageTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ImageTableService {
  constructor(
    @InjectRepository(ImageTable)
    private repository: Repository<ImageTable>,
  ) {}

  async getImages(id: number): Promise<ImageTable[]> {
    return await this.repository
      .createQueryBuilder('image_table')
      .select('image_table')
      .where('image_table.idAnimal = :idAnimal', { idAnimal: id })
      .getMany();
  }

  async createImage(newAnimal: ImageTable) {
    return await this.repository.save(newAnimal);
  }

  async getSomeImage(id: number): Promise<ImageTable> {
    return await this.repository
      .createQueryBuilder('image_table')
      .select('image_table')
      .where('image_table.idImage = :idImage', { idImage: id })
      .getOne();
  }

  async updateImage(id: number, animal: ImageTable) {
    const animalForUpdate = await this.repository.findOneBy({
      idImage: id,
    });
    if (animalForUpdate != null) {
      await this.repository.update(id, animal);
      return true;
    }
    return false;
  }

  async deleteImage(id: number) {
    const animalForRemove = await this.repository.findOneBy({
      idImage: id,
    });
    if (animalForRemove != null) {
      await this.repository.remove(animalForRemove);
      return true;
    }
    return false;
  }
}
