import { Test, TestingModule } from '@nestjs/testing';
import { MaterialTableController } from './material-table.controller';

describe('MaterialTableController', () => {
  let controller: MaterialTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialTableController],
    }).compile();

    controller = module.get<MaterialTableController>(MaterialTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
