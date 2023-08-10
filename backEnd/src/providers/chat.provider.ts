import {  SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRealTimeService } from '../chat-real-time/chat-real-time.service';
import { UseGuards,Req } from '@nestjs/common';
import {Request,Response} from "express"
import {JwtAuthGuardCheck} from "../user/guard/checkUser.guard"


@WebSocketGateway ({ cors: { origin: 'http://localhost:5173', credentials: true } }) // Add CORS options here
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private chatService: ChatRealTimeService) {}
    private userSocketIdMap = new Map<string, Socket>();
    private userRoomsMap = new Map<string, Set<string>>();

    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string): void {
      const userId = this.getUserIdFromSocket(client);
      let rooms = this.userRoomsMap.get(userId) || new Set<string>();
      rooms.add(room);
      this.userRoomsMap.set(userId, rooms);

      client.join(room);
      client.emit('message',  room);
    }
  
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string): void {
      const userId = this.getUserIdFromSocket(client);
      let rooms = this.userRoomsMap.get(userId);
      if (rooms) {
          rooms.delete(room);
          if (rooms.size === 0) {
              this.userRoomsMap.delete(userId);
          } else {
              this.userRoomsMap.set(userId, rooms);
          }
      }

      client.leave(room);
      client.emit('message', 'You have left the room: ' + room);
    }
   
    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: any): Promise<void> { 
        const sender = client.id;
        const room = payload.room;
        console.log('Received message from client: ', payload);
        try {
        const messageInDB =  await this.chatService.saveMessage(payload);
  
          if (room) {
              this.server.to(room).emit('message', { room, content: messageInDB });
   
          } else {
            client.emit('error', { message: "no room" });
          }
      } catch (error) {
          client.emit('error', { message: error.message });
      }
    }

    @SubscribeMessage('invite')
    handleInvite(client: Socket, data: { payload: any, recipientId: string }): void {
      const recipientId = data.recipientId;
      // console.log("đây là đứa nhận", recipientId);
      const sender = client.id;
      const recipientSocket = this.userSocketIdMap.get(recipientId);
      // console.log("đây là invite",data.payload);
      
      if (recipientSocket) {
        recipientSocket.emit('invite', data.payload);
      }
    }
    

    afterInit(server: Server) {
        console.log('Initialized!');
      }
    
      handleConnection(client: Socket, ...args: any[]) {
        const userId = Array.isArray(client.handshake.query.userId)
        ? client.handshake.query.userId[0]
        : client.handshake.query.userId;
        this.userSocketIdMap.set(userId, client);
        console.log(`User connected: ${userId}`);

        const rooms = this.userRoomsMap.get(userId);
        if (rooms) {
            rooms.forEach(room => {
                client.join(room);
            });
        }
    }
    
    handleDisconnect(client: Socket) {
        const userId = Array.from(this.userSocketIdMap.keys()).find(key => this.userSocketIdMap.get(key) === client);
        if (userId) {
          this.userSocketIdMap.delete(userId);
          console.log(`User disconnected: ${userId}`);
        }
    }
    private getUserIdFromSocket(client: Socket): string {
      return Array.isArray(client.handshake.query.userId)
          ? client.handshake.query.userId[0]
          : client.handshake.query.userId;
  }
}
