import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosTableService } from './diagnos-table.service';

describe('DiagnosTableService', () => {
  let service: DiagnosTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosTableService],
    }).compile();

    service = module.get<DiagnosTableService>(DiagnosTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
