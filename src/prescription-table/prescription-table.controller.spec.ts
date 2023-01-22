import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionTableController } from './prescription-table.controller';

describe('PrescriptionTableController', () => {
  let controller: PrescriptionTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionTableController],
    }).compile();

    controller = module.get<PrescriptionTableController>(PrescriptionTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
