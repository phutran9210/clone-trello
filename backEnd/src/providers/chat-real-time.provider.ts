import { DataSource } from 'typeorm';
import {Message} from "../chat-real-time/entities/messages.entity"
import {Room} from "../chat-real-time/entities/rooms.entity"
import {UserRoom} from "../chat-real-time/entities/users_room.entity"

export const chatRealTimeProvider = [
    {
        provide: "MESSAGE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "ROOM_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "USER_ROOM_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRoom),
        inject: ["DATA_SOURCE"],
    },

]
