import { Test, TestingModule } from '@nestjs/testing';
import { ImageNewsController } from './image-news.controller';

describe('ImageNewsController', () => {
  let controller: ImageNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageNewsController],
    }).compile();

    controller = module.get<ImageNewsController>(ImageNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
