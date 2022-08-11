import { Test, TestingModule } from '@nestjs/testing';
import { ClientTableService } from './client-table.service';

describe('ClientTableService', () => {
  let service: ClientTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientTableService],
    }).compile();

    service = module.get<ClientTableService>(ClientTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
