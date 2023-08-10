
import {Entity,Column,PrimaryColumn,ManyToMany,JoinTable, PrimaryGeneratedColumn, OneToMany,JoinColumn,ManyToOne,OneToOne} from "typeorm"
import {UserRoom} from "../../chat-real-time/entities/users_room.entity"
import {Message} from "../../chat-real-time/entities/messages.entity"
import {Exclude} from "class-transformer"
import {CardUser} from "../../board/entities/card_user.entity"
import {BoardUser} from "../../board/entities/board_user.entity"
import {Board} from "../../board/entities/board.entity"

@Entity('users')
export class User{
    @PrimaryColumn ({type : "varchar",length : 255})
    user_id : string

    @Column({type : "varchar",length : 255})
    username : string

    @Column({type : "varchar",length : 255})
    email : string

    @Column({type : "varchar",length : 255})
    @Exclude()
    user_password : string

    @Column({type: "timestamp", default : ()=>"CURRENT_TIMESTAMP"})
    create_at : Date

    @Column({type : "timestamp", onUpdate:"CURRENT_TIMESTAMP",nullable:true})
    update_at : Date

    @Column({type:"tinyint",width:1,default:0})
    banned : number

    @Column({type:"timestamp",nullable:true})
    ban_until : Date

    @Column({type:"char",length : 10})
    verification_code : string

    @Column({type:"timestamp"})
    verification_expires : Date

    @Column({type:"varchar",length:255,default:"pending"})
    active_status : string

    @Column({type:"timestamp"})
    active_time : Date

    @Column({type:"varchar",length : 255,nullable:true})
    refresh_token : string

    @ManyToMany(()=>Role, (role)=> role.users)
    @JoinTable({
        name : "user_role",
        joinColumn : {name : "user_id", referencedColumnName : "user_id"},
        inverseJoinColumn : { name : "role_id",referencedColumnName : "role_id"}
    })
    roles : Role[]

    @OneToMany(() => Friendship, (friendship) => friendship.requester)
    sentFriendships: Friendship[];
  
    @OneToMany(() => Friendship, (friendship) => friendship.requested)
    requestedFriendships: Friendship[];

    @OneToMany(() => UserRoom, userRoom => userRoom.user)
    userRooms: UserRoom[];
 
     @OneToMany(() => Message, (message) => message.user)
    messages: Message[];

    @OneToMany(() => CardUser, cardUser => cardUser.user)
    cardUsers: CardUser[];

    @OneToMany(() => BoardUser, boardUser => boardUser.user)
    boardUsers: BoardUser[];

    @OneToOne(() => Board, board => board.owner)
    ownedBoard: Board;

}

@Entity("roles")
export class Role{
    @PrimaryGeneratedColumn()
    role_id : number;

    @Column({type: "varchar",length : 255})
    role_name : string

    @Column ()
    priority : number
    
    @ManyToMany(()=> User,(user)=>user.roles)
    users : User[];

 
}

@Entity('friendship')
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

  @Column({type : "varchar",length : 50})
  requester_id : string

  @Column({type : "varchar",length : 50})
  requested_id : string

  @ManyToOne(() => User, (user) => user.requestedFriendships)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, (user) => user.sentFriendships)
  @JoinColumn({ name: 'requested_id' })
  requested: User;

  @Column({ type: 'int' })
  status_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  friendship_date: Date;
}

@Entity('friendship_status')
export class FriendshipStatus {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'blocked'] })
  status_name: string;
}