import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosTableController } from './diagnos-table.controller';

describe('DiagnosTableController', () => {
  let controller: DiagnosTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosTableController],
    }).compile();

    controller = module.get<DiagnosTableController>(DiagnosTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
