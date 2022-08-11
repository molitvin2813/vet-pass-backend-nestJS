import { Test, TestingModule } from '@nestjs/testing';
import { StorageTableService } from './storage-table.service';

describe('StorageTableService', () => {
  let service: StorageTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageTableService],
    }).compile();

    service = module.get<StorageTableService>(StorageTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
