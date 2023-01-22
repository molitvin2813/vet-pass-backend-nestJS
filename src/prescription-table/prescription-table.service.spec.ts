import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionTableService } from './prescription-table.service';

describe('PrescriptionTableService', () => {
  let service: PrescriptionTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionTableService],
    }).compile();

    service = module.get<PrescriptionTableService>(PrescriptionTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
