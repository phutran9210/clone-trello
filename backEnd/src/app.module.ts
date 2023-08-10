import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserFriendShipModule } from './user-friend-ship/user-friend-ship.module';
import { BoardModule } from './board/board.module';

import { ChatRealTimeModule } from './chat-real-time/chat-real-time.module';

@Module({
  imports: [UserModule, UserFriendShipModule, BoardModule, ChatRealTimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
