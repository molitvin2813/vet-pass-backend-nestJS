import { Test, TestingModule } from '@nestjs/testing';
import { ImageMessageService } from './image-message.service';

describe('ImageMessageService', () => {
  let service: ImageMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageMessageService],
    }).compile();

    service = module.get<ImageMessageService>(ImageMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
