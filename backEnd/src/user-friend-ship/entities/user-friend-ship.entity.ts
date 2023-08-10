import { PrimaryGeneratedColumn } from 'typeorm';
import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Unique
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

////////////////////////////////
export enum StatusName {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  BLOCKED = 'blocked',
}


@Entity('friendship_status')
@Unique(['status_name'])
export class FriendshipStatus {
@PrimaryGeneratedColumn()
status_id: number;

@Column({
  type: 'enum',
  enum: StatusName,
  default: StatusName.PENDING
})
status_name: StatusName;
}


@Entity("friendship")
@Unique(['requester_id', 'requested_id'])
export class UserFriendShip {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  requester_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  requested_id: string;

  @Column({ type: 'int' })
  status_id: number;

  @Column({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  friendship_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requested_id' })
  requested: User;

  @ManyToOne(() => FriendshipStatus)
  @JoinColumn({ name: 'status_id' })
  status: FriendshipStatus;

}

