import { Module } from '@nestjs/common';
import { UserFriendShipService } from './user-friend-ship.service';
import { UserFriendShipController } from './user-friend-ship.controller';
import { DatabaseModule } from '../../database/database.module';
import {userFriendshipProviders} from "../providers/user-friendship.provider"

@Module({
  imports : [DatabaseModule],
  controllers: [UserFriendShipController],
  providers: [UserFriendShipService,...userFriendshipProviders]
})
export class UserFriendShipModule {}
