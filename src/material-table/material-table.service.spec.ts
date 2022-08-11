import { Test, TestingModule } from '@nestjs/testing';
import { MaterialTableService } from './material-table.service';

describe('MaterialTableService', () => {
  let service: MaterialTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialTableService],
    }).compile();

    service = module.get<MaterialTableService>(MaterialTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
