
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
  import {UserRoom} from "./users_room.entity"
  import {Message} from "./messages.entity"

  @Entity("rooms")
  export class Room{
    @PrimaryGeneratedColumn()
    room_id : number;

    @Column({type : "varchar",length : 50})
    room_name : string;

    @OneToMany(()=> UserRoom, (userRoom)=>userRoom.room)
    userRooms : UserRoom[];

    @OneToMany(()=> Message,(message)=> message.room)
    messages : Message[];
  }