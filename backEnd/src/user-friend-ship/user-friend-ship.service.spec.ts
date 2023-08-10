import { Test, TestingModule } from '@nestjs/testing';
import { UserFriendShipService } from './user-friend-ship.service';

describe('UserFriendShipService', () => {
  let service: UserFriendShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFriendShipService],
    }).compile();

    service = module.get<UserFriendShipService>(UserFriendShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
