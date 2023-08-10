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
  import {BoardUser} from "./board_user.entity"
  import {Card} from "./cards.entity"
  import {User} from "../../user/entities/user.entity"
  import {ColumnInBoard} from "./columns_in_board.entity"
   
  @Entity('boards')
  export class Board {
    @PrimaryColumn()
    board_id: string;
  
    @Column({ length: 255 })
    title: string;
  
    @Column('text', { nullable: true })
    description_board: string;

    @Column({length : 255})
    owner_id: string;
  
    @Column('enum', { enum: ['public', 'private'], default: 'public' })
    type_board: string;
  
    @OneToMany(() => BoardUser, boardUser => boardUser.board)
    @JoinColumn({ name: 'board_id' }) 
    boardUsers: BoardUser[];

    @OneToMany(() => Card, card => card.board)
    cards: Card[];

    @OneToOne(() => User, user => user.ownedBoard)              
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToMany(() => ColumnInBoard, column => column.board)
     columns: ColumnInBoard[];
  }