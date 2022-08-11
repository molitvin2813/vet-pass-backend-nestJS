import { Test, TestingModule } from '@nestjs/testing';
import { ClientTableController } from './client-table.controller';

describe('ClientTableController', () => {
  let controller: ClientTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientTableController],
    }).compile();

    controller = module.get<ClientTableController>(ClientTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
