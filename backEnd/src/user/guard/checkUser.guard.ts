import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../constain';
  import { Request } from 'express';

  @Injectable()
  export class JwtAuthGuardCheck implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      const token1 = request.cookies['access_jwt'];
      // console.log("toekn1",token1);
      
      const token = this.extractTokenFromHeader(request);
      // console.log("token",token);

      if (!token1) {
        request['user'] = null
        return true
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token1,
          {
            secret: jwtConstants.secret
          }
        );
        request['user'] = payload;
      } catch {
        request['user'] = null;
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }