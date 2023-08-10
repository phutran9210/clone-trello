import { Test, TestingModule } from '@nestjs/testing';
import { UserFriendShipController } from './user-friend-ship.controller';
import { UserFriendShipService } from './user-friend-ship.service';

describe('UserFriendShipController', () => {
  let controller: UserFriendShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFriendShipController],
      providers: [UserFriendShipService],
    }).compile();

    controller = module.get<UserFriendShipController>(UserFriendShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
