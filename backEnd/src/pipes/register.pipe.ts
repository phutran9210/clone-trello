import { PipeTransform, Injectable, ArgumentMetadata,BadRequestException } from '@nestjs/common';


@Injectable()
export class ParseRegistrationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) { 
    const email = value.email ?? undefined;
    const user_password = value.password ?? undefined;
    const username = value.username ?? undefined;
    
    if (email === undefined || user_password === undefined || username === undefined) {
      throw new BadRequestException('Invalid input data, please provide all fields');
    }
    return { 
      email,
      user_password,
      username,
    };
  }
}
