import { IsString, IsNotEmpty,IsNumber } from 'class-validator';
import {LoggedUser} from "../interface/res.interface"
import {Type} from "class-transformer"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username : string;

    @IsNotEmpty()
    @IsString()
    email : string;

    @Type(()=>String)
    @IsNotEmpty()
    @IsString()
    user_password : string;
}

export class ReqUser{
    @IsString()
    @IsNotEmpty()
    messenger: string;

    @IsNumber()
    @IsNotEmpty()
    code: number;
    
    @IsString()
    @IsNotEmpty()
    user_id : string;

    @IsString()
    @IsNotEmpty()
    confirmCode : string;
}

export class ReConfirmUser{
  constructor(
    public messenger: string,
    public status: number,
    public confirmCode: string,
    public user_id : string 
  ) {}

}

export class UserResponse {
    constructor(
      public status: number,
      public message: string,
   
      public data: LoggedUser,
    ) {}
  }

export class UserProfile{
  constructor(
    public status: number,
    public message: string,
    public data: LoggedUser,
  ){}
}

