import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import {CreateBoardDto} from "./dto/create-board.dto"
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createBoardDto: CreateBoardDto) : Promise<any> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get("/:userId/myboard/:boardId")
  async getBoard(@Param("userId") userId : string,@Param("boardId") boardId : string ) : Promise<any>{
    return this.boardService.getBoardData(userId,boardId)
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
