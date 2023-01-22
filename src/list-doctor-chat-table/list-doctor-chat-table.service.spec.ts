import { Test, TestingModule } from '@nestjs/testing';
import { ListDoctorChatTableService } from './list-doctor-chat-table.service';

describe('ListDoctorChatTableService', () => {
  let service: ListDoctorChatTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListDoctorChatTableService],
    }).compile();

    service = module.get<ListDoctorChatTableService>(ListDoctorChatTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
