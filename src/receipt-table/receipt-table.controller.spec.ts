import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptTableController } from './receipt-table.controller';

describe('ReceiptTableController', () => {
  let controller: ReceiptTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptTableController],
    }).compile();

    controller = module.get<ReceiptTableController>(ReceiptTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
