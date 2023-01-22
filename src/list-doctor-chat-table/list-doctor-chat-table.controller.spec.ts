import { Test, TestingModule } from '@nestjs/testing';
import { ListDoctorChatTableController } from './list-doctor-chat-table.controller';

describe('ListDoctorChatTableController', () => {
  let controller: ListDoctorChatTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListDoctorChatTableController],
    }).compile();

    controller = module.get<ListDoctorChatTableController>(
      ListDoctorChatTableController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
