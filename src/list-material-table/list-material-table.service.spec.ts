import { Test, TestingModule } from '@nestjs/testing';
import { ListMaterialTableService } from './list-material-table.service';

describe('ListMaterialTableService', () => {
  let service: ListMaterialTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListMaterialTableService],
    }).compile();

    service = module.get<ListMaterialTableService>(ListMaterialTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
