import { Test, TestingModule } from '@nestjs/testing';
import { LogTableController } from './log-table.controller';

describe('LogTableController', () => {
  let controller: LogTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogTableController],
    }).compile();

    controller = module.get<LogTableController>(LogTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
