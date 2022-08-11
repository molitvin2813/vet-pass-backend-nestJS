import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTableController } from './service-table.controller';

describe('ServiceTableController', () => {
  let controller: ServiceTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTableController],
    }).compile();

    controller = module.get<ServiceTableController>(ServiceTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
