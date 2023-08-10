import { DataSource } from 'typeorm';
import {Board} from "../board/entities/board.entity"
import {BoardUser} from "../board/entities/board_user.entity"
import {CardUser} from "../board/entities/card_user.entity"
import {Card} from "../board/entities/cards.entity"
import {ColumnInBoard} from "../board/entities/columns_in_board.entity"
import {Comment} from "../board/entities/comments.entity"

export const boardProvider = [
    {
        provide: "BOARD_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "BOARD_USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BoardUser),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "CARD_USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CardUser),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "CARD_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Card),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "COLUM_IN_BOARD_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ColumnInBoard),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "COMMENT_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
        inject: ["DATA_SOURCE"],
    },

]