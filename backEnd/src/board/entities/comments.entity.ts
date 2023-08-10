import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Card } from './cards.entity';
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;
  
    @Column()
    card_id: string;
  
    @Column('text')
    content: string;
  
    @ManyToOne(() => Card, card => card.card_id, { onDelete: 'CASCADE' })
    card: Card;
  }
  