import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Card } from './cards.entity';
import { User } from '../../user/entities/user.entity';

@Entity('card_user')
export class CardUser {
  @PrimaryColumn()
  card_id: string;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => Card, card => card.card_id, { onDelete: 'CASCADE' })
  card: Card;

  @OneToMany(() => User, user => user.user_id, { onDelete: 'CASCADE' })
  user: User;
}
