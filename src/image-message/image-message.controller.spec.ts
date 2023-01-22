import { Test, TestingModule } from '@nestjs/testing';
import { ImageMessageController } from './image-message.controller';

describe('ImageMessageController', () => {
  let controller: ImageMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageMessageController],
    }).compile();

    controller = module.get<ImageMessageController>(ImageMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
