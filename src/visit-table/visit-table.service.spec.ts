import { Test, TestingModule } from '@nestjs/testing';
import { VisitTableService } from './visit-table.service';

describe('VisitTableService', () => {
  let service: VisitTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitTableService],
    }).compile();

    service = module.get<VisitTableService>(VisitTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
