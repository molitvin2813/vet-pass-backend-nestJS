import { Test, TestingModule } from '@nestjs/testing';
import { TypePrescriptionService } from './type-prescription.service';

describe('TypePrescriptionService', () => {
  let service: TypePrescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypePrescriptionService],
    }).compile();

    service = module.get<TypePrescriptionService>(TypePrescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
