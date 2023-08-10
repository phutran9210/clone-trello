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
  import {User} from "../../user/entities/user.entity"
  import {Room} from "./rooms.entity"

  @Entity('users_room')
  export class UserRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRooms)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Room, (room) => room.userRooms)
    @JoinColumn({ name: 'room_id' })
    room: Room;
  }