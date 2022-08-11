import { Test, TestingModule } from '@nestjs/testing';
import { ListMaterialTableController } from './list-material-table.controller';

describe('ListMaterialTableController', () => {
  let controller: ListMaterialTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListMaterialTableController],
    }).compile();

    controller = module.get<ListMaterialTableController>(ListMaterialTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
