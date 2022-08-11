import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTableService } from './service-table.service';

describe('ServiceTableService', () => {
  let service: ServiceTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTableService],
    }).compile();

    service = module.get<ServiceTableService>(ServiceTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
