import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import {Board} from "./board.entity"
import {User} from "../../user/entities/user.entity"

  @Entity('board_user')
  export class BoardUser {
    @PrimaryColumn()
    board_id: string;
  
    @PrimaryColumn()
    user_id: string;
  
    @Column('enum', { enum: ['read', 'write'], default: 'read' })
    permission: string;
  
    @ManyToOne(() => Board, board => board.boardUsers)
    @JoinColumn({ name: 'board_id' }) 
    board: Board;
  
    @ManyToOne(() => User, user => user.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user: User;
  }