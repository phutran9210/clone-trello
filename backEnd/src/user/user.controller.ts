import { Controller, Get, Post, Body, Patch, Param, Delete,UsePipes,HttpException,HttpStatus,Res,UseGuards,Req,UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { Response,Request} from 'express';
import {ParseRegistrationPipe} from "../pipes/register.pipe"
import { UserService } from './user.service';
import { CreateUserDto, UserResponse,ReConfirmUser,UserProfile } from './dto/create-user.dto';
import {JwtAuthGuardCheck} from "./guard/checkUser.guard"
import {JwtAuthGuard} from "./guard/jwtAuthGuard.guard"
import {SearchDto} from "./dto/search.dto"
import {tokenUser} from "../user/interface/res.interface"





@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtAuthGuardCheck)
  @Get(":userId")
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Req() req: Request,@Param("userId") userId : string) : Promise<any>{   
    console.log("????",req.user);
    
 return this.userService.getOneUser(req,userId)

  }


  @Post()
  @UsePipes(ParseRegistrationPipe)
 async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  
  @Post('validate-code')
  async validateCode(@Body('user_id') user_id: string, @Body('code') code: string) {
    const isValid = await this.userService.validateCode(user_id, code);

    if (!isValid) {
      return {
        message: 'Mã không hợp lệ hoặc hết hạn',
        status: 400,
      };
    }
    return {
      message: 'Verification code is valid',
      status: 200,
    };
  }

  @Post("login")
  async login(@Body() userData: { password: string, username: string },@Res({ passthrough: true }) res: Response): Promise<UserResponse> {
    return this.userService.userLogin(userData,res)
  }

  @UseGuards(JwtAuthGuardCheck)
  @Post("logout")
  async logout(@Req() request: Request, @Res({ passthrough: true }) res: Response) : Promise<any>{
   return this.userService.userLogout(request, res);
  
  }

  @Post("reconfirm")
  async reconfirm (@Body() userData : { password: string, username: string }) : Promise <ReConfirmUser>{
    return this.userService.createCode(userData)
  }
  
  @Post("searchUser")
  async searchSomething(@Body() searchDto: SearchDto) : Promise <any>{
    return this.userService.searchUsers(searchDto);
  }

  @Post("createchatsearch")
  async search4chat(@Body("data") search : string) : Promise<any>{
    console.log(search);
    
    return await this.userService.search4ChatService(search)
  }

  @UseGuards(JwtAuthGuardCheck)
  @Post("get-token")
  async getToken (@Req() req : Request) : Promise<{username : string, userId : string}>{
    console.log("controler",req.user);
    const userId = (req.user as tokenUser).sub
    const username = (req.user as tokenUser).username
    return {username : username, userId : userId}
  }
  
  @Get("infor-in-room/:roomId")
  async getInfoInRoom(@Param("roomId") roomId : string) : Promise<any>{
  console.log(roomId);
  return await this.userService.findUserInRoom(roomId)
}


}


@Controller("auth/status")
export class StatusController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken =  req.cookies.refresh_jwt;
    // console.log("đây là refresh",refreshToken);
    res.status(200).json("thành công")
    
  }
}