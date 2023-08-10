import { Injectable,Inject, HttpStatus, HttpException,Body,ValidationPipe } from '@nestjs/common';
import {Repository} from "typeorm"
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {Board} from "../board/entities/board.entity"
import {BoardUser} from "../board/entities/board_user.entity"
import {CardUser} from "../board/entities/card_user.entity"
import {Card} from "../board/entities/cards.entity"
import {ColumnInBoard} from "../board/entities/columns_in_board.entity"
import {Comment} from "../board/entities/comments.entity"
import { customAlphabet  } from 'nanoid';
import { v4 as uuidv4 } from 'uuid'

const nanoid = customAlphabet('1234567890abcdef', 10)


@Injectable()
export class BoardService {
  constructor(
    @Inject("BOARD_REPOSITORY")
    private boardRepository : Repository<Board>,
    @Inject("BOARD_USER_REPOSITORY")
    private board_userRepository : Repository<BoardUser>,
    @Inject("CARD_USER_REPOSITORY")
    private card_userRepository : Repository<CardUser>,
    @Inject("CARD_REPOSITORY")
    private cardRepository : Repository<Card>,
    @Inject("COLUM_IN_BOARD_REPOSITORY")
    private column_in_boardRepository : Repository<ColumnInBoard>,
    @Inject("COMMENT_REPOSITORY")
    private commentRepository : Repository<Comment>,
  ){}

  async createBoard( createBoardDto: CreateBoardDto): Promise<Board> {
    console.log(createBoardDto);
    const { title, description, type, ownerId, memberIds, canWriteMemberId } = createBoardDto;
    
    const id = uuidv4();
    const boardId = `board-id-${id}`;
    const newBoard = this.boardRepository.create({
      board_id: boardId, 
      title :title,
      description_board: description,
      owner_id : ownerId
    });

    const savedBoard = await this.boardRepository.save(newBoard);
    console.log(savedBoard);

    // Add owner to the board_user table with 'write' permission
    await this.board_userRepository.save({
      board_id: savedBoard.board_id,
      user_id: ownerId,
      permission: 'write'
    });
    
    if (memberIds && memberIds.length) {
      const memberPromises = memberIds.map(id => {
        return this.board_userRepository.save({
          board_id: savedBoard.board_id,
          user_id: id,
          permission: 'read'
        });
      });
    
      await Promise.all(memberPromises);
    }

    if (canWriteMemberId && canWriteMemberId.length) {
      const canWriteMemberPromises = canWriteMemberId.map(id => {
        return this.board_userRepository.save({
          board_id: savedBoard.board_id,
          user_id: id,
          permission: 'write'
        });
      });
    
      await Promise.all(canWriteMemberPromises);
    }
    
    console.log("!!!!!");

    return savedBoard;
  }

async getBoardData (userId : string, boardId : string) : Promise<any>{
console.log(userId,boardId);

const board = await this.boardRepository
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.boardUsers', 'boardUser')
    .leftJoin('boardUser.user', 'user')
    .addSelect(["user.user_id", "user.username"])
    .where('board.board_id = :boardId', { boardId })
    .leftJoinAndSelect("board.columns","columns")
    .andWhere("columns.board_id = :boardId",{boardId})
    .getOne();

  if (!board) {
    // Xử lý trường hợp không tìm thấy board
    throw new HttpException("Not found",HttpStatus.NOT_FOUND)
  }

  // const ownerIds = board.boardUsers
  //   .filter(boardUser => boardUser.permission === 'write')
  //   .map(boardUser => boardUser.user.user_id);

  // const memberIds = board.boardUsers
  //   .filter(boardUser => boardUser.permission === 'read')
  //   .map(boardUser => boardUser.user.user_id);

  // return {
  //   boardId: board.board_id,
  //   title: board.title,
  //   description_board: board.description_board,
  //   type_board: board.type_board,
  //   ownerIds,
  //   memberIds
  // };
  return board
}

  findAll() {
    return `This action returns all board`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
