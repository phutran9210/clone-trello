import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {boardProvider} from "../providers/board.provider"
 import { DatabaseModule } from '../../database/database.module';
@Module({
  imports : [DatabaseModule],
  controllers: [BoardController],
  providers: [BoardService,...boardProvider]
})
export class BoardModule {}
