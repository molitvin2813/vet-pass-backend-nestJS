import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AnimalTable } from '../entities/AnimalTable';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class AnimalTableService {
  constructor(
    @InjectRepository(AnimalTable)
    private animalRepository: Repository<AnimalTable>,
  ) {}

  async getAnimals(): Promise<AnimalTable[]> {
    return await this.animalRepository
      .createQueryBuilder('animal_table')
      .leftJoinAndSelect('animal_table.idClient2', 'client')
      .leftJoinAndSelect('animal_table.idType2', 'type')
      .select([
        'animal_table.idAnimal',
        'animal_table.name',
        'animal_table.weight',
        'animal_table.isCastrated',
        'animal_table.gender',
        'animal_table.age',
        'animal_table.idClient',
      ])
      .addSelect(['client.fio', 'client.phone', 'type.type', 'client.idClient'])
      .getMany();
  }

  async createAnimal(newAnimal: AnimalTable): Promise<InsertResult> {
    return await this.animalRepository.insert(newAnimal);
  }

  async getSomeAnimal(id: number): Promise<AnimalTable> {
    return await this.animalRepository
      .createQueryBuilder('animal_table')
      .leftJoinAndSelect('animal_table.idClient2', 'client')
      .leftJoinAndSelect('animal_table.idType2', 'type')
      .where('animal_table.idAnimal = :idAnimal', { idAnimal: id })
      .select([
        'animal_table.idAnimal',
        'animal_table.name',
        'animal_table.weight',
        'animal_table.isCastrated',
        'animal_table.gender',
        'animal_table.age',
        'animal_table.idClient',
      ])
      .addSelect(['client.fio', 'client.phone', 'type.type', 'client.idClient'])
      .getOne();
  }

  async updateAnimal(id: number, animal: AnimalTable) {
    const animalForUpdate = await this.animalRepository.findOneBy({
      idAnimal: id,
    });
    if (animalForUpdate != null) {
      await this.animalRepository.update(id, animal);
      return true;
    }
    return false;
  }

  async deleteAnimal(id: number) {
    const animalForRemove = await this.animalRepository.findOneBy({
      idAnimal: id,
    });
    if (animalForRemove != null) {
      await this.animalRepository.remove(animalForRemove);
      return true;
    }
    return false;
  }
}
