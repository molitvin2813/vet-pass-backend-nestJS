import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTypeTableController } from './animal-type-table.controller';

describe('AnimalTypeTableController', () => {
  let controller: AnimalTypeTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalTypeTableController],
    }).compile();

    controller = module.get<AnimalTypeTableController>(AnimalTypeTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
