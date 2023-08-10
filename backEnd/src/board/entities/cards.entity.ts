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
import {ColumnInBoard} from "./columns_in_board.entity"

  @Entity('cards')
  export class Card {
    @PrimaryColumn()
    card_id: string;
  
    @Column()
    board_id: string;
  
    @Column()
    column_id: string;
  
    @Column({ length: 255 })
    title: string;
  
    @Column('text', { nullable: true })
    description: string;
  
    @Column({ length: 512, nullable: true })
    cover: string;
  
    @ManyToOne(() => Board, board => board.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_id' })
    board: Board;
  
    @ManyToOne(() => ColumnInBoard, column => column.column_id, { onDelete: 'CASCADE' })
    column: ColumnInBoard;
  }