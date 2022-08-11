import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptTableService } from './receipt-table.service';

describe('ReceiptTableService', () => {
  let service: ReceiptTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptTableService],
    }).compile();

    service = module.get<ReceiptTableService>(ReceiptTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
