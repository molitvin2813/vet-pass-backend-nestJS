import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTableController } from './doctor-table.controller';

describe('DoctorTableController', () => {
  let controller: DoctorTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorTableController],
    }).compile();

    controller = module.get<DoctorTableController>(DoctorTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
