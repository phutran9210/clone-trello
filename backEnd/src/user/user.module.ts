import {  Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController,StatusController } from './user.controller';
import { DatabaseModule } from '../../database/database.module';
import {usersProvider} from "../providers/user.provider"
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt"
import {jwtConstants} from "./constain"
import * as cookieParser from 'cookie-parser';
import {JwtStrategy} from "./guard/jwt.guard"
import { MailerService } from './mailer/mailer.service';

@Module({
  imports : [
    DatabaseModule,
    JwtModule.register({ 
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360h', }, 
    }),
  ],
  controllers: [UserController,StatusController],
  providers: [UserService,...usersProvider,JwtStrategy,MailerService],
 
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes(UserController, StatusController);
  }
}

