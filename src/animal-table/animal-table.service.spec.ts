import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTableService } from './animal-table.service';

describe('AnimalTableService', () => {
  let service: AnimalTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalTableService],
    }).compile();

    service = module.get<AnimalTableService>(AnimalTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
