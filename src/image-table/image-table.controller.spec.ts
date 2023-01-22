import { Test, TestingModule } from '@nestjs/testing';
import { ImageTableController } from './image-table.controller';

describe('ImageTableController', () => {
  let controller: ImageTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageTableController],
    }).compile();

    controller = module.get<ImageTableController>(ImageTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
