import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFriendShipDto } from './create-user-friend-ship.dto';

export class UpdateUserFriendShipDto extends PartialType(CreateUserFriendShipDto) {}
