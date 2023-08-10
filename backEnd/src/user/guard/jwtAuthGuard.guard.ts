import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {JwtStrategy} from "../guard/jwt.guard"
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
