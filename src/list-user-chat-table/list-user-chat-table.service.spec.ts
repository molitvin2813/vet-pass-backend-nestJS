import { Test, TestingModule } from '@nestjs/testing';
import { ListUserChatTableService } from './list-user-chat-table.service';

describe('ListUserChatTableService', () => {
  let service: ListUserChatTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListUserChatTableService],
    }).compile();

    service = module.get<ListUserChatTableService>(ListUserChatTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
