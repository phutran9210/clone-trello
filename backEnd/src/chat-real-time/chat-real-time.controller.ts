import { Controller, Get, Post, Body, Patch, Param, Delete, Req,Query,ValidationPipe } from '@nestjs/common';
import { ChatRealTimeService } from './chat-real-time.service';
import { CreateChatRealTimeDto } from './dto/create-chat-real-time.dto';
import { UpdateChatRealTimeDto } from './dto/update-chat-real-time.dto';

import {GetRoomQuery,GetPreviewDataChat} from "./dto/payload-chat-real-time.dto"

@Controller('chat-real-time')
export class ChatRealTimeController {
  constructor(private readonly chatRealTimeService: ChatRealTimeService) {}

  // @Post()
  // async getChat(@Body() payload : GetChatDto): Promise<any>{
  //   return await this.chatRealTimeService.getChatService(payload)
  // }

  @Get("room/:idroom")
  async getRoom(@Param("idroom") idroom  : string,@Query(new ValidationPipe()) query: GetRoomQuery):Promise<any>{
    return this.chatRealTimeService.getChatService(idroom ,query.page)
  }

  @Get("preview/:userId")
  async getPreviewChat(@Param("userId") userId : string) : Promise<any>{
    return this.chatRealTimeService.getRecentChats(userId)
  }
}
