import { Test, TestingModule } from '@nestjs/testing';
import { ListServiceTableService } from './list-service-table.service';

describe('ListServiceTableService', () => {
  let service: ListServiceTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListServiceTableService],
    }).compile();

    service = module.get<ListServiceTableService>(ListServiceTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
