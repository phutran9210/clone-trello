import { Inject, Injectable } from '@nestjs/common';
import {Repository,Not, } from "typeorm"
import { CreateChatRealTimeDto } from './dto/create-chat-real-time.dto';
import { UpdateChatRealTimeDto } from './dto/update-chat-real-time.dto';
import {GetChatDto} from "./dto/payload-chat-real-time.dto"
import {Message} from "../chat-real-time/entities/messages.entity"
import {Room} from "../chat-real-time/entities/rooms.entity"
import {User} from "../user/entities/user.entity"
import {GetPreviewDataChat} from "./dto/payload-chat-real-time.dto"




@Injectable()
export class ChatRealTimeService {
constructor(
  @Inject ("MESSAGE_REPOSITORY")
  private messageRepository : Repository<Message>,
  @Inject ("USER_REPOSITORY")
  private userRepository : Repository<User>,
  @Inject ("ROOM_REPOSITORY")
  private roomRepository : Repository<Room>,
  
   ) {}

   private mapToConversation(recentRooms) {
    return recentRooms.map(room => {
      const participants = [];
      let messages = [];

      room.messages.forEach(message => {
        const participant = {
          user_id: message.user.user_id,
          username: message.user.username,
    
        };

     
        if (!participants.some(p => p.user_id === participant.user_id)) {
          participants.push(participant);
        }

        const messageObj = {
          sender_id: message.user.user_id,
          sender_name: message.user.username,
          content: message.content,
          create_at: message.create_at
        };

        messages.push(messageObj);
      });
      messages = messages.sort((a, b) => new Date(a.create_at).getTime() - new Date(b.create_at).getTime());

      return {
        room_name: room.room_name,
        participants: participants,
        messages: messages
      }
    });
  }

  

  async getRecentChats(userId : string) : Promise<any> {
    console.log(userId);
    
    const recentRooms = await this.roomRepository
  .createQueryBuilder('room')
  .leftJoinAndSelect('room.messages', 'message','message.content IS NOT NULL')
  .where('room.room_name LIKE :userId1', { userId1: `%-${userId}` })
  .orWhere('room.room_name LIKE :userId2', { userId2: `${userId}-%` })
  .orderBy('message.create_at', 'DESC')
  .getMany();
  
  let filteredRooms = [];
  for (const room of recentRooms) {
      const recentMessages = await this.messageRepository
          .createQueryBuilder('message')
          .leftJoinAndSelect('message.user', 'user')
          .where('message.room = :roomId', { roomId: room.room_id })
          .andWhere('message.content IS NOT NULL') 
          .orderBy('message.create_at', 'DESC')
          .take(15)
          .getMany();

      if (recentMessages && recentMessages.length > 0) {
          room.messages = recentMessages;
          filteredRooms.push(room);
      }
  }
  
    const result =  this.mapToConversation(filteredRooms);
    console.log(result.length);
    
    return result;
  }
  

async saveMessage(messageData: { content: string, sender_id: string, room: string }) {

  let room = await this.roomRepository.findOne({ where : { room_name : messageData.room}});

  if (!room) {
    room = this.roomRepository.create( {room_name: messageData.room });
    await this.roomRepository.save(room);
  }

  const user = await this.userRepository.findOne({ where : { user_id : messageData.sender_id}});

  const newMessage = this.messageRepository.create({
    content: messageData.content,
    user: user,
    room: room
  });

  const savedMessage = await this.messageRepository.save(newMessage);

  const newMessagePayload = {
    content : messageData.content,
    sender_id : user.user_id,
    sender_name : user.username,
    create_at : savedMessage.create_at
  }

  
  return newMessagePayload
}

async getChatService ( payload : string, page : number) : Promise<any>{
console.log("đây là payload",payload);

const PAGE_SIZE = 20;
  const findRoomName = await this.roomRepository.findOne({where:{room_name : payload }})
  if (!findRoomName) {
    const newRoom = this.roomRepository.create({room_name: payload});
    await this.roomRepository.save(newRoom);
    return newRoom.room_name;
  } else 
  if (findRoomName) {

    const dataRoom = await this.messageRepository
    .createQueryBuilder("message")
    .select([
      "message.message_id",
      "message.create_at",
      "message.content"
    ])
    .innerJoin("message.user", "user")
    .addSelect(["user.user_id", "user.username"])
    .innerJoin("message.room", "room")
    .addSelect("room.room_name")
    .where("room.room_id = :roomId", { roomId: findRoomName.room_id })
    .orderBy("message.create_at", "DESC")
    .skip((page - 1) * PAGE_SIZE) 
    .take(PAGE_SIZE) 
    .getMany();
    

    const processedConversations = dataRoom.reduce((conversations, message) => {
      const existingConversation = conversations.find(
        conversation => conversation.room_name === message.room.room_name
      );
    
      if (existingConversation) {
        existingConversation.messages.push({
          sender_id: message.user.user_id,
          sender_name : message.user.username,
          content: message.content,
          create_at: message.create_at
        });
    
        if (!existingConversation.participants.find(participant => participant.user_id === message.user.user_id)) {
          existingConversation.participants.push({
            user_id: message.user.user_id,
            username: message.user.username
          });
        }
        
        existingConversation.messages.sort((a, b) => a.create_at - b.create_at);
    
      } else {
        conversations.push({
          room_name: message.room.room_name,
          participants: [{
            user_id: message.user.user_id,
            username: message.user.username
          }],
          messages: [{
            sender_id: message.user.user_id,
           sender_name : message.user.username,
            content: message.content,
            create_at: message.create_at
          }]
        });
      }
      return conversations;
    }, []);
console.log("đây là prose",processedConversations.length);


    if (processedConversations.length === 0) {
      return payload
    }

  return {
    conversations: processedConversations,
    hasMore: dataRoom.length === PAGE_SIZE
  };
  
}
  
  
}

}
