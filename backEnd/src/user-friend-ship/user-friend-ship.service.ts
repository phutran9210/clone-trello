import { Injectable,Inject, HttpStatus,Req } from '@nestjs/common';
import {Request} from "express"
import { Repository,Brackets } from 'typeorm';
import {UserFriendShip} from "./entities/user-friend-ship.entity"
import { CreateUserFriendShipDto } from './dto/create-user-friend-ship.dto';
import { UpdateUserFriendShipDto } from './dto/update-user-friend-ship.dto';
import {inviteInfo} from "./interface/interface"

@Injectable()
export class UserFriendShipService {
  constructor(
    @Inject("USER_FRIENDSHIP_USER_REPOSITORY")
    private userFriendShipRepository : Repository<UserFriendShip>
  ){}


   async create(createUserFriendShipDto: CreateUserFriendShipDto) : Promise<{status : number, message : string}> {
    function getStatusId(status: string) {
      let statusId;
      switch (status) {
        case 'pending':
          statusId = 1;
          break;
        case 'accepted':
          statusId = 2;
          break;
        case 'blocked':
          statusId = 3;
          break;
        default:
          throw new Error('Invalid status');
      }
      return statusId;
    }
    
    const statusId = getStatusId(createUserFriendShipDto.status);
    
    const newFriendShip = this.userFriendShipRepository.create({
      requester_id : createUserFriendShipDto.requesterId,
      requested_id : createUserFriendShipDto.requestedId,
      status_id : statusId
    })
    await this.userFriendShipRepository.save(newFriendShip)
    
    return {status : HttpStatus.OK, message : "Success"}
  }

 async confirmFriendShip(createUserFriendShipDto: CreateUserFriendShipDto):Promise<any> { 
    function getStatusId(status: string) {
      let statusId;
      switch (status) {
        case 'pending':
          statusId = 1;
          break;
        case 'accepted':
          statusId = 2;
          break;
        case 'blocked':
          statusId = 3;
          break;
        default:
          throw new Error('Invalid status');
      }
      return statusId;
    }
    
    const statusId = getStatusId(createUserFriendShipDto.status);
    
    const friendShip = await this.userFriendShipRepository.findOne({ where: { requester_id : createUserFriendShipDto.requestedId, requested_id : createUserFriendShipDto.requesterId }  });

    friendShip.status_id = statusId
    await this.userFriendShipRepository.save(friendShip)
    console.log(friendShip);
    
    return {id : friendShip.id,statusId : statusId,requester_id : createUserFriendShipDto.requesterId, requested_id : createUserFriendShipDto.requestedId }
   
  }

async cancelRequestFriendShip(createUserFriendShipDto: CreateUserFriendShipDto):Promise<any>{
  console.log(createUserFriendShipDto);
  const friendShip = await this.userFriendShipRepository.findOne({ where: { requester_id : createUserFriendShipDto.requestedId, requested_id : createUserFriendShipDto.requesterId }  });

  if (friendShip) {
    await this.userFriendShipRepository.remove(friendShip);
  }

  return {id : createUserFriendShipDto.requestedId ,status_id:0}

}

async blockUser(@Req() req: Request,data:inviteInfo):Promise<{status : number}>{
  console.log(req.user);
  console.log(data);
  const friendship = await this.userFriendShipRepository.createQueryBuilder('friendship')
  // .leftJoinAndSelect('friendship.requester', 'requester')
  // .leftJoinAndSelect('friendship.requested', 'requested')
  // .leftJoinAndSelect('friendship.status', 'status')
  .where(new Brackets(qb => {
    qb.where('friendship.requester_id = :reqUserId AND friendship.requested_id = :userId', { reqUserId: data.requesterId, userId: data.requestedId })
      .orWhere('friendship.requested_id = :reqUserId AND friendship.requester_id = :userId', { reqUserId: data.requesterId, userId: data.requestedId });
  }))
  .getOne();
  console.log(friendship);
  
if (friendship) {
  await this.userFriendShipRepository.remove(friendship)
}
const newFriendship = this.userFriendShipRepository.create({
  requester_id: data.requesterId,
  requested_id: data.requestedId,
  status_id: 3 
});

await this.userFriendShipRepository.save(newFriendship);
  
 return {status : HttpStatus.OK}
}

  findOne(id: number) {
    return `This action returns a #${id} userFriendShip`;
  }

  update(id: number, updateUserFriendShipDto: UpdateUserFriendShipDto) {
    return `This action updates a #${id} userFriendShip`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFriendShip`;
  }
}
