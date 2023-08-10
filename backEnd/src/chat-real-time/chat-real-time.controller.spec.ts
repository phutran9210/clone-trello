import { Test, TestingModule } from '@nestjs/testing';
import { ChatRealTimeController } from './chat-real-time.controller';
import { ChatRealTimeService } from './chat-real-time.service';

describe('ChatRealTimeController', () => {
  let controller: ChatRealTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRealTimeController],
      providers: [ChatRealTimeService],
    }).compile();

    controller = module.get<ChatRealTimeController>(ChatRealTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
