import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Board } from './board.entity';

@Entity('column_in_board')
export class ColumnInBoard {
  @PrimaryColumn()
  column_id: string;

  @Column()
  board_id: string;

  @Column({ length: 255 })
  title: string;

  @Column('int', { nullable: true })
  order_id: number;

  @ManyToOne(() => Board, board => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
