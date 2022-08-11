import { Test, TestingModule } from '@nestjs/testing';
import { VisitTableController } from './visit-table.controller';

describe('VisitTableController', () => {
  let controller: VisitTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitTableController],
    }).compile();

    controller = module.get<VisitTableController>(VisitTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
