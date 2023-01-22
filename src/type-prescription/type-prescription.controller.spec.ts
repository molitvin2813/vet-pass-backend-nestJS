import { Test, TestingModule } from '@nestjs/testing';
import { TypePrescriptionController } from './type-prescription.controller';

describe('TypePrescriptionController', () => {
  let controller: TypePrescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypePrescriptionController],
    }).compile();

    controller = module.get<TypePrescriptionController>(TypePrescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
