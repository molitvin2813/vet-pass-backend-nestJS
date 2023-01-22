import { Test, TestingModule } from '@nestjs/testing';
import { TypeNewsService } from './type-news.service';

describe('TypeNewsService', () => {
  let service: TypeNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeNewsService],
    }).compile();

    service = module.get<TypeNewsService>(TypeNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
