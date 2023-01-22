import { Test, TestingModule } from '@nestjs/testing';
import { ImageTableService } from './image-table.service';

describe('ImageTableService', () => {
  let service: ImageTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageTableService],
    }).compile();

    service = module.get<ImageTableService>(ImageTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
