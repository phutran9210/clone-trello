import { Controller, Get, Post, Body, Patch, Param, Delete ,Req,UseGuards} from '@nestjs/common';
import { Response,Request} from 'express';
import { UserFriendShipService } from './user-friend-ship.service';
import { CreateUserFriendShipDto } from './dto/create-user-friend-ship.dto';
import { UpdateUserFriendShipDto } from './dto/update-user-friend-ship.dto';
import {inviteInfo} from "./interface/interface"
import {JwtAuthGuardCheck} from "../user/guard/checkUser.guard"

@Controller('user-friend-ship')
export class UserFriendShipController {
  constructor(private readonly userFriendShipService: UserFriendShipService) {}

  @Post()
   async create(@Body() createUserFriendShipDto: CreateUserFriendShipDto) : Promise<{status : number, message : string}> {
    return this.userFriendShipService.create(createUserFriendShipDto);
  }

  @Post('confirm')
   async confirm(@Body() createUserFriendShipDto: CreateUserFriendShipDto):Promise<any> {
    return this.userFriendShipService.confirmFriendShip(createUserFriendShipDto);
  }
  @Post('cancel')
   async cancel(@Body() createUserFriendShipDto: CreateUserFriendShipDto):Promise<any> {
    return this.userFriendShipService.cancelRequestFriendShip(createUserFriendShipDto);
  }
  @UseGuards(JwtAuthGuardCheck)
  @Post("block")
  async block(@Req() req: Request, @Body() data : inviteInfo) : Promise <{status : number}>{
    return this.userFriendShipService.blockUser(req, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFriendShipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFriendShipDto: UpdateUserFriendShipDto) {
    return this.userFriendShipService.update(+id, updateUserFriendShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFriendShipService.remove(+id);
  }
}
