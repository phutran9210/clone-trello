
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException,Req } from '@nestjs/common';
import { ExtractJwt, Strategy, } from 'passport-jwt';
import { jwtConstants } from '../constain';
import { UserService } from '../user.service';
import { Response,Request  } from 'express'




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies?.access_jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request,payload: any) { 
    console.log(payload);
    
    const isValid = await this.userService.validateUser(payload);
     if (!isValid) {
      throw new UnauthorizedException();
    }
    
      try {
        const refreshToken = await this.userService.getRefreshToken(payload.sub);
        if (refreshToken) {
        return { userId: payload.sub, username: payload.username };         
        }
      } catch (e) {
        throw new UnauthorizedException();
      }
  }
}
