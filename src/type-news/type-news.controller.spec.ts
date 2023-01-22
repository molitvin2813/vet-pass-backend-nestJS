import { Test, TestingModule } from '@nestjs/testing';
import { TypeNewsController } from './type-news.controller';

describe('TypeNewsController', () => {
  let controller: TypeNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeNewsController],
    }).compile();

    controller = module.get<TypeNewsController>(TypeNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
