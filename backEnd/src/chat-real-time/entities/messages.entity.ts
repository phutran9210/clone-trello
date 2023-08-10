
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
import { Room } from './rooms.entity';
import { User } from '../../user/entities/user.entity';

  @Entity("messages")
  export class Message {
    @PrimaryGeneratedColumn()
    message_id : number;

    @Column({type : "varchar",length : 255})
    content : string;

    @CreateDateColumn({type: "timestamp", default : ()=>"CURRENT_TIMESTAMP"})
    create_at : Date;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Room, (room) => room.messages)
    @JoinColumn({ name: 'room_id' })
    room: Room;
  }