import { PartialType } from '@nestjs/mapped-types';
import { CreateChatRealTimeDto } from './create-chat-real-time.dto';

export class UpdateChatRealTimeDto extends PartialType(CreateChatRealTimeDto) {}
