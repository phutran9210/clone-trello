import { IsString, IsNotEmpty,IsInt,Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetChatDto {
    @IsNotEmpty()
    @IsString()
    loggedUser : string;

    @IsNotEmpty()
    @IsString()
    requestedId : string
}

export class GetRoomQuery {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;
  }

export class GetPreviewDataChat{
    @IsNotEmpty()
    userId : string
}