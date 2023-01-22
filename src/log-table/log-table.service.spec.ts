import { Test, TestingModule } from '@nestjs/testing';
import { LogTableService } from './log-table.service';

describe('LogTableService', () => {
  let service: LogTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogTableService],
    }).compile();

    service = module.get<LogTableService>(LogTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
