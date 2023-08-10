import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ValidationPipe,BadRequestException } from '@nestjs/common';
import helmet from 'helmet'
import * as compresstion from "compression"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compresstion())
  app.use(cookieParser());
  app.enableCors(
    {
    origin: 'http://localhost:5173',
    credentials: true,
  }
  );
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalPipes(new ValidationPipe({
    // exceptionFactory: (errors) => {
    //   const messages = errors.map(
    //     error => `Property ${error.property} has wrong value ${error.value}, 
    //       ${Object.values(error.constraints).join(', ')}`
    //   )
    //   return new BadRequestException(messages)
    // },
    errorHttpStatusCode : 422
  }));
  await app.listen(3000);
}
bootstrap();
