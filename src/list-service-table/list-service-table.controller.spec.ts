import { Test, TestingModule } from '@nestjs/testing';
import { ListServiceTableController } from './list-service-table.controller';

describe('ListServiceTableController', () => {
  let controller: ListServiceTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListServiceTableController],
    }).compile();

    controller = module.get<ListServiceTableController>(ListServiceTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
