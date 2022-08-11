import { Test, TestingModule } from '@nestjs/testing';
import { StorageTableController } from './storage-table.controller';

describe('StorageTableController', () => {
  let controller: StorageTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageTableController],
    }).compile();

    controller = module.get<StorageTableController>(StorageTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
