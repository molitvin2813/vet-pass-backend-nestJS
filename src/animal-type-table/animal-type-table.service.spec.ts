import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTypeTableService } from './animal-type-table.service';

describe('AnimalTypeTableService', () => {
  let service: AnimalTypeTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalTypeTableService],
    }).compile();

    service = module.get<AnimalTypeTableService>(AnimalTypeTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
