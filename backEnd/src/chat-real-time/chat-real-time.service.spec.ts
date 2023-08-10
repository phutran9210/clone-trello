import { Test, TestingModule } from '@nestjs/testing';
import { ChatRealTimeService } from './chat-real-time.service';

describe('ChatRealTimeService', () => {
  let service: ChatRealTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRealTimeService],
    }).compile();

    service = module.get<ChatRealTimeService>(ChatRealTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
