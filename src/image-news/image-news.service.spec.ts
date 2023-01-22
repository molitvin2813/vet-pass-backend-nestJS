import { Test, TestingModule } from '@nestjs/testing';
import { ImageNewsService } from './image-news.service';

describe('ImageNewsService', () => {
  let service: ImageNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageNewsService],
    }).compile();

    service = module.get<ImageNewsService>(ImageNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
