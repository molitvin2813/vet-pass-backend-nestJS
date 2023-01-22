import { Test, TestingModule } from '@nestjs/testing';
import { ListUserChatTableController } from './list-user-chat-table.controller';

describe('ListUserChatTableController', () => {
  let controller: ListUserChatTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUserChatTableController],
    }).compile();

    controller = module.get<ListUserChatTableController>(ListUserChatTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
