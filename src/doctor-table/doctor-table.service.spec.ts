import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTableService } from './doctor-table.service';

describe('DoctorTableService', () => {
  let service: DoctorTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorTableService],
    }).compile();

    service = module.get<DoctorTableService>(DoctorTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
