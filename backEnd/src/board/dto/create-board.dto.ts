
import { IsString, IsNotEmpty, IsIn, IsUUID, IsArray, ArrayNotEmpty} from 'class-validator';
import {IsCustomUUID} from "../customDecorator/IsCustomUUID"

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn(['public', 'private'])
  type: 'public' | 'private';

  @IsNotEmpty()
  @IsCustomUUID()
  ownerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsCustomUUID({ each: true })
  memberIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsCustomUUID({ each: true }) 
  canWriteMemberId: string[];
}


