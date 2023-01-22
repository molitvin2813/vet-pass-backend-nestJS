import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AnimalTypeTable } from 'src/entities/AnimalTypeTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class AnimalTypeTableService {
  constructor(
    @InjectRepository(AnimalTypeTable)
    private typeRepository: Repository<AnimalTypeTable>,
  ) {}

  async getAllAnimalsTypes(): Promise<AnimalTypeTable[]> {
    return await this.typeRepository
      .createQueryBuilder('animal_type_table')
      .getMany();
  }

  async createSomeAnimalType(
    newAnimal: AnimalTypeTable,
  ): Promise<InsertResult> {
    return this.typeRepository.insert(newAnimal);
  }

  async getSomeAnimalType(id: number): Promise<AnimalTypeTable> {
    return await this.typeRepository
      .createQueryBuilder('animal_type_table')
      .where('animal_type_table.idType = :idType', { idType: id })
      .getOne();
  }

  async updateAnimalTypes(id: number, animal: AnimalTypeTable) {
    const animalForUpdate = await this.typeRepository.findOneBy({
      idType: id,
    });
    if (animalForUpdate != null) {
      await this.typeRepository.update(id, animal);
      return true;
    }
    return false;
  }

  async deleteAnimalType(id: number) {
    const animalForRemove = await this.typeRepository.findOneBy({
      idType: id,
    });
    if (animalForRemove != null) {
      await this.typeRepository.remove(animalForRemove);
      return true;
    }
    return false;
  }
}
