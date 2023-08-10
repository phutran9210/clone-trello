import { Module } from '@nestjs/common';
import { ChatRealTimeService } from './chat-real-time.service';
import { ChatRealTimeController } from './chat-real-time.controller';
import {chatRealTimeProvider} from "../providers/chat-real-time.provider"
import {DatabaseModule} from "../../database/database.module"
import {ChatGateway} from "../providers/chat.provider"
import {usersProvider} from "../providers/user.provider"

@Module({
  imports : [DatabaseModule],
  controllers: [ChatRealTimeController],
  providers: [ChatRealTimeService,ChatGateway,...chatRealTimeProvider,...usersProvider]
})
export class ChatRealTimeModule {}
