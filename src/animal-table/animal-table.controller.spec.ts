import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTableController } from './animal-table.controller';

describe('AnimalTableController', () => {
  let controller: AnimalTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalTableController],
    }).compile();

    controller = module.get<AnimalTableController>(AnimalTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
